import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { MicOff, Minimize, MonitorOff, VideoOff, X } from "lucide-react";

export default function About() {
    return (
        <div className="bg-white text-black" >
            <Navbar/>
            <section className="text-center py-20 bg-gradient-to-b from-blue-50 to-white">
                <h1 className="text-5xl font-medium uppercase text-zinc-800">About ReelUp</h1>
                <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
                    ReelUp is the ultimate platform for creators to showcase their work, grow their audience, and turn passion into opportunity.
                </p>
                <div className="w-220 bg-black p-4 rounded-2xl h-120 m-auto mt-10" >
                    <div className="w-full h-full overflow-hidden relative rounded-md"  >
                        <div className="w-full z-1 flex justify-between absolute left-0 right-0 p-4">
                            <span className="font-semibold text-white text-shadow-2xs text-shadow-black text-lg">ReelUp</span>
                            <div className="flex items-center text-sm font-semibold rounded-full overflow-hidden">
                                <span className="bg-red-500 p-1 px-3 text-white">LIVE</span>
                                <span className="bg-white p-1 px-3 ">3.5K</span>
                            </div>
                        </div>
                        <div className="w-full z-1 flex justify-center gap-4 items-center absolute bottom-0 left-0 right-0 p-4">
                            <div className="p-3.5 bg-zinc-900/10 backdrop-blur-lg text-white rounded-full" >
                                <MonitorOff size={'20'} />
                            </div>
                            <div className="p-3.5 bg-zinc-900/10 backdrop-blur-lg text-white rounded-full" >
                                <MicOff size={'20'} />
                            </div>
                            <div className="p-4 bg-red-500 text-white rounded-full" >
                                <X/>
                            </div>
                            <div className="p-3.5 bg-zinc-900/10 backdrop-blur-lg text-white rounded-full" >
                                <VideoOff size={'20'} />
                            </div>
                            <div className="p-3.5 bg-zinc-900/10 backdrop-blur-lg text-white rounded-full" >
                                <Minimize size={'20'} />
                            </div>
                        </div>
                        <video src="/videos/woman-live.mp4" playsInline autoPlay loop className="object-cover w-full h-full " >
                        </video>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-black text-center text-white">
                <h2 className="text-4xl font-semibold mb-4 uppercase">Join the Creator Movement</h2>
                <p className="text-lg mb-6">Start building your digital presence with ReelUp today.</p>
                <button className="bg-white text-black cursor-pointer px-6 py-3 rounded-full hover:bg-zinc-100">
                    Get Started For Free
                </button>
            </section>
            <Footer/>
        </div>

    )
}