"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type Props = {
  onChange: (value: string) => void;
  value: string;
};

function ImageUpload({ onChange, value }: Props) {
  const handleCallback = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    console.error('Cloudinary upload preset is not configured');
    return null;
  }

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        sources: ["local", "url", "camera"],
        resourceType: "image"
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
