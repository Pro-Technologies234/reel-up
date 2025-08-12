import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface VideoInputProps {
  width?: number | string;
  height?: number | string;
  setVideo: (source: string | undefined) => void;
}

export default function VideoInput({ width, height, setVideo }: VideoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    setVideo(source);
  }, [source, setVideo]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // this is base64 data URL
        setSource(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="bg-zinc-900 relative overflow-hidden flex justify-center items-center rounded-lg"
      style={{ width, height }}
    >
      <Input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        style={{ display: "none" }}
      />
      {!source && (
        <Button className="absolute bottom-2 right-2 cursor-pointer" onClick={handleChoose}>
          Choose
        </Button>
      )}
      {source && (
        <video className="w-full object-cover h-full" controls src={source} />
      )}
      {!source && <div className="VideoInput_footer">Nothing selected</div>}
    </div>
  );
}
