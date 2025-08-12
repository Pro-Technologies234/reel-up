import { LucideImageOff, LucideImages, Trash2 } from "lucide-react";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "../ui/button";

export function ImageUploader({ images, setImages }: { images: string[]; setImages: (images: string[]) => void; }) {
  const maxNumber = 4;

  const onChange = (imageList: ImageListType) => {
    // Extract only dataURLs and update parent state
    const dataURLs = imageList.map((img) => img.dataURL!) as string[];
    setImages(dataURLs);
  };

  return (
    <div className="h-full w-full">
      <ImageUploading
        multiple
        value={images.map((url) => ({ dataURL: url })) as never[]}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="dataURL"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="flex flex-col gap-2 h-full w-full">
            <div onClick={onImageUpload} className={`border-1 dark:text-zinc-500 text-zinc-700 rounded-2xl flex flex-col gap-5 items-center justify-center h-full w-full cursor-pointer ${isDragging ? "text-emerald-500 dark:bg-zinc-800 bg-zinc-100" : ''}border-black/50  dark:border-white/50 border-dashed`} {...dragProps}>
              {!isDragging && <LucideImages size={40} strokeWidth={1} />}
              {!isDragging && <span className="text-sm uppercase ">Click or drop images here</span>}
            </div>
            <div className="grid grid-cols-4 gap-2 h-20">
              {imageList.map((image, index) => (
                <div key={index} className="relative h-15 cursor-pointer rounded-lg overflow-hidden">
                  <img src={image.dataURL} alt="" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 flex justify-center items-center cursor-pointer hover:opacity-100 opacity-0 bg-black/60 transition-all">
                    <Button size="icon" onClick={() => onImageRemove(index)} className="p-0.5 bg-transparent cursor-pointer text-white hover:bg-transparent">
                      <Trash2/>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button size="sm" onClick={onImageRemoveAll} disabled={images.length < 1} className="cursor-pointer disabled:opacity-50 bg-red-600 hover:bg-red-500 text-white">
                <LucideImageOff />
                Clear all images
            </Button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
