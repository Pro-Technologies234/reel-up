'use client';

import { useEffect, useState } from 'react';
import { MicOff, Minimize, MonitorOff, X, Camera, CameraOff } from 'lucide-react';


import { Src } from '@livepeer/react';
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";

import * as Player from "@livepeer/react/player";
import { Button } from '../ui/button';
import { CreateLiveStreamBtn } from './live-streamer';

export default function LivePlayer() {
  const [useCamera, setUseCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [playbackId, setPlaybackId] = useState<string>("");

  useEffect(() => {
    if (!useCamera) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = mediaStream;
          videoElement.play().catch(console.error);
        }
      })
      .catch((err) => {
        console.error('Error accessing camera/mic:', err);
      });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [useCamera]);

  
  const src: Src[] | null = playbackId
    ? [
        {
          src: `https://cdn.livepeer.studio/hls/${playbackId}/index.m3u8`,
          type: "hls",
          mime: "application/vnd.apple.mpegurl",
          width: 1920,
          height: 1080,
        },
      ]
    : null;


  return (
    <div className="dark:bg-zinc-950 bg-zinc-200 border aspect-video h-130 z-10 p-4 rounded-4xl fixed m-auto">
      <div className="w-full h-full overflow-hidden relative rounded-3xl">

        {useCamera ? (
          <video
            id="camera-preview"
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          playbackId && (
            <Player.Root src={src}>
              <Player.Container>
                <Player.Video title="Live stream" />
                <Player.Controls className="flex items-center justify-center">
                  <Player.PlayPauseTrigger className="w-10 h-10">
                    <Player.PlayingIndicator asChild matcher={false}>
                      <PlayIcon />
                    </Player.PlayingIndicator>
                    <Player.PlayingIndicator asChild>
                      <PauseIcon />
                    </Player.PlayingIndicator>
                  </Player.PlayPauseTrigger>
                </Player.Controls>
              </Player.Container>
            </Player.Root>
          )
        )}

        {/* Header bar */}
        <div className="w-full z-1 flex justify-between absolute left-0 right-0 p-4">
          <span className="font-semibold dark:text-white text-black text-lg">ReelUp</span>
          <div className="flex items-center text-sm font-semibold rounded-lg overflow-hidden">
            <span className="bg-red-500 p-1 px-3 text-white">{useCamera ? 'CAMERA' : 'LIVE'}</span>
            <span className="bg-white text-black p-1 px-3">3.5K</span>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="w-full z-10 flex justify-center gap-4 items-center absolute bottom-0 p-4">
          <Button
            size={'icon'}
            onClick={() => setUseCamera((prev) => !prev)}
            className="p-5 dark:bg-black text-black dark:text-white cursor-pointer bg-white rounded-full"
          >
            {useCamera ? <Camera size={20} /> : <CameraOff className='text-red-500' />}
          </Button>

          <Button size={'icon'} className="p-5 dark:bg-black text-black dark:text-white cursor-pointer bg-white rounded-full">
            <MonitorOff size={20} className='text-red-500' />
          </Button>

          {playbackId ? (
            <Button size={'icon'} className="p-7 bg-red-500 text-white rounded-full">
              <X />
            </Button>
          ) : (
            <CreateLiveStreamBtn onLiveStreamCreated={(id: string) => setPlaybackId(id)} />
          )}

          <Button size={'icon'} className="p-5 dark:bg-black text-black dark:text-white cursor-pointer bg-white rounded-full">
            <MicOff size={20} className='text-red-500' />
          </Button>

          <Button size={'icon'} className="p-5 dark:bg-black text-black dark:text-white cursor-pointer bg-white rounded-full">
            <Minimize size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
