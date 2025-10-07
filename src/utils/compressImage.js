// utils/compressImage.js
export async function compressImage(
  file,
  { maxSize = 1600, quality = 0.78, minQuality = 0.5 } = {}
) {
  const img = await new Promise((res, rej) => {
    const el = new Image();
    el.onload = () => res(el);
    el.onerror = rej;
    el.src = URL.createObjectURL(file);
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  let q = quality, blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', q));
  // baja calidad si sigue muy pesado (> 900 KB)
  while (blob && blob.size > 900_000 && q > minQuality) {
    q -= 0.08;
    blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', q));
  }

  const out = new File([blob], (file.name.replace(/\.[^.]+$/, '') || 'img') + '.jpg', { type: 'image/jpeg' });
  URL.revokeObjectURL(img.src);
  return out;
}
