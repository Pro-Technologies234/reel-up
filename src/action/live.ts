'use server';
import { Livepeer } from "livepeer";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-user";

// export async function startLiveStream() {
//   console.log('Started');
//   try {
//     const { user } = await validateRequest();

//     if (!user) {
//       return { error: 'Unauthorized' };
//     }

//     const apiKey = process.env.LIVEPEER_API_KEY;
//     if (!apiKey) {
//       console.error("LIVEPEER_API_KEY is not set");
//       return { error: 'Server misconfiguration: API key missing' };
//     }

//     console.log('[DEBUG]', apiKey);
//     const res = await fetch("https://livepeer.studio/api/stream", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: `${user.username}-${user.id}-${Date.now()}`,
//         record: true
//       }),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("Livepeer API error:", errText);
//       return { error: `Livepeer API Error: ${errText}` };
//     }

//     const data = await res.json();
//     console.log("Stream created at livepeer:", data);

//     const liveStream = await prisma.liveStream.create({
//       data: {
//         createdById: user.id,
//         isLive: true,
//         playbackId: data.playbackId,
//         streamKey: data.stream?.rtmp?.streamKey || "",
//         rtmpUrl: data.stream?.rtmp?.url || "rtmp://rtmp.livepeer.com/live",
//       }
//     });

//     return { liveStream };
//   } catch (error: any) {
//     console.log("Unexpected error:", error);
//     return { error: error.message || 'Unable to create live stream.' };
//   }
// }


export async function startLiveStream() {
  const { user } = await validateRequest();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const apiKey = process.env.LIVEPEER_API_KEY;
  if (!apiKey) {
    console.error("LIVEPEER_API_KEY is not set");
    return { error: 'Server misconfiguration: API key missing' };
  }

  const livepeer = new Livepeer({ apiKey });

  const streamData = { name: "test_stream" };

  try {
    const response = await livepeer.stream.create(streamData);

    const liveStream = await prisma.liveStream.create({
      data: {
        createdById: user.id,
        isLive: true,
        playbackId: response.stream?.playbackId || '',
        streamKey: response.stream?.streamKey || "",
      }
    });

    console.log("Stream created:", response);
    return { liveStream };

  } catch (error) {
    console.error("Error creating stream:", error);
    return { error: 'Unable to create live stream.' };
  }
}
