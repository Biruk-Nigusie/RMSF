import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: "https://rmsb-2wjb.onrender.com/api/uploadthing",
});

export const UploadDropzone = generateUploadDropzone({
  url: "https://rmsb-2wjb.onrender.com/api/uploadthing",
});