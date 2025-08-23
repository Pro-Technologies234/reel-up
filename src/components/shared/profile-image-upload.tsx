"use client";

import { LucideUser, Trash2, Upload } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProfileUploader({
  image,
  setImage,
}: {
  image: string | null;
  setImage: (image: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string); // store Base64 for preview
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // clear input
  };

  return (
    <div className="flex items-center gap-3">
      {/* Profile Avatar */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer relative"
      >
        <Avatar className="w-28 h-28 bg-zinc-100 dark:bg-zinc-900">
          {image ? (
            <AvatarImage src={image} alt="profile" className="object-cover" />
          ) : (
            <AvatarFallback>
              <LucideUser className="w-10 h-10 text-zinc-500" />
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-1 cursor-pointer"
        >
          <Upload size={16} />
          {image ? "Change" : "Upload"}
        </Button>

        {image && (
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRemove}
            className="gap-1"
          >
            <Trash2 size={16} />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
