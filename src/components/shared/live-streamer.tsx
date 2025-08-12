'use client';

import { startLiveStream } from '@/action/live';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  onLiveStreamCreated: (playbackId: string) => void;
}

export function CreateLiveStreamBtn({ onLiveStreamCreated }: Props) {
  const [loading, setLoading] = useState(false);

  async function CreateStream() {
    setLoading(true)
    const { liveStream, error } = await startLiveStream()
    if (error || !liveStream) {
        toast.error('Something went wrong.')
        setLoading(false)
    } else {
        setLoading(false)
        toast.success('Your Live stream has started successfully')
        onLiveStreamCreated(liveStream?.playbackId)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center z-10 gap-4">
      <Button
        onClick={CreateStream}
        disabled={loading}
        size={loading ? 'icon' :'lg'}
        className={`bg-rose-600 hover:bg-rose-500 active:bg-rose-500 text-white cursor-pointer uppercase tracking-wider disabled:opacity-50 transition-all duration-700 ease-in-out ${ loading ? 'p-10 rounded-full' : 'rounded-full ' }`}
      >
        {loading ? (<Loader2 className='animate-spin' />) : 'Go Live'}
      </Button>
      {/* <span className='text-sm w-xs text-center ' >click to start a live stream, sell your product, chat with customers, or just have fun!</span> */}
    </div>
  );
}
