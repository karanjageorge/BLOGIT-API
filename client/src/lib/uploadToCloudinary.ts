// src/lib/uploadToCloudinary.ts
export async function uploadToCloudinary(file: File) {
  if (!file) return "";

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "dda1tfvdg";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "blog_uploads";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Cloudinary upload failed: ${txt}`);
  }

  const json = await res.json();
  return json.secure_url as string;
}
