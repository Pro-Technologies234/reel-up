"use client";

import { useRef, useEffect } from "react";
import Hls from "hls.js";

export const HlsPlayer = ({ playbackUrl }: { playbackUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playbackUrl) return;

    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = `https://cdn.livepeer.studio/hls/${playbackUrl}/index.m3u8`;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support (Safari)
      video.src = hlsUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error", event, data);
      });

      return () => {
        hls.destroy();
      };
    } else {
      console.error("HLS not supported on this browser");
    }
  }, [playbackUrl]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      style={{ width: "100%", maxWidth: "800px", borderRadius: "8px" }}
      playsInline
    />
  );
};
