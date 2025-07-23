import { AppWindowMac, ChevronLeft, ChevronRight, Ellipsis, Minus,
    Plus, Send, ShieldHalf, Smile, SquareStack, Upload } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import img from '@/assets/images/Poppy & Ludivine I - Louise Carrasco.jpeg'

export function Hero() {
    return(
        <main className="max-w-6xl flex flex-col items-center pt-20  w-full m-auto">
          <span className="p-1.5 px-2.5 rounded-full border border-black text-xs text-center">
            PRODUCTS / LIVE STREAM SHOPPING
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
            Sell Live Products Globally <br />
            Everywhere At One
          </h1>
          <p className="text-center md:w-md lg:w-lg not-md:text-xs not-lg:text-sm mt-2">
            Enhance your shopping event by going live, boosting conversations,{" "}
            and fostering vibrant communities.
          </p>
          <div className="space-x-5 mt-5">
            <Button className="rounded-full cursor-pointer">
              Get Started For Free!
            </Button>
            <Button variant={"outline"} className="rounded-full cursor-pointer">
              Book a Demo
            </Button>
          </div>
          <div className="w-220 not-md:scale-30 mt-15 space-y-2  rounded-2xl bg-black p-2 pb-0 relative">
            <div className="w-full flex justify-between">
              <div className="space-x-2">
                <Button size={"icon"}>
                  <Ellipsis />
                </Button>
                <Button size={"icon"}>
                  <AppWindowMac />
                </Button>
                <Button size={"icon"}>
                  <ChevronLeft />
                </Button>
                <Button size={"icon"}>
                  <ChevronRight />
                </Button>
              </div>
              <div className="space-x-2 flex">
                <Button size={"icon"}>
                  <ShieldHalf />
                </Button>
                <div className="w-80 bg-neutral-900 py-1 rounded-sm"></div>
              </div>
              <div className="space-x-2">
                <Button size={"icon"}>
                  <Upload />
                </Button>
                <Button size={"icon"}>
                  <Plus />
                </Button>
                <Button size={"icon"}>
                  <SquareStack />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-9 gap-2 h-120">
              <div className="bg-blue-200 relative rounded-2xl overflow-hidden col-span-7 h-full ">
                <div className="w-full z-1 flex justify-between absolute left-0 right-0 p-4">
                  <span className="font-semibold text-lg">ReelUp</span>
                  <div className="flex items-center text-sm font-semibold rounded-full overflow-hidden">
                    <span className="bg-red-500 p-1 px-2 text-white">LIVE</span>
                    <span className="bg-white p-1 px-2 ">3.5K</span>
                  </div>
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={img}
                    alt="img.png"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="grid grid-rows-9 gap-2 col-span-2 h-full ">
                <div className="row-span-5 bg-neutral-900 rounded-2xl px-3">
                  <div className="text-white flex justify-between items-center">
                    <span className="text-xs ">PRODUCTS</span>
                    <Button size={"icon"}>
                      <Minus />
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-3 justify-between">
                    <div className="grid grid-cols-5 h-15 ">
                      <div className="bg-blue-200 rounded-sm col-span-2 "></div>
                      <div className="flex flex-col gap-2 justify-center col-span-3 p-2">
                        <div className="bg-neutral-800 p-1.5 rounded-full"></div>
                        <div className="bg-neutral-800 p-1.5 rounded-full w-[60%]"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 h-15 ">
                      <div className="bg-blue-200 rounded-sm col-span-2 "></div>
                      <div className="flex flex-col gap-2 justify-center col-span-3 p-2">
                        <div className="bg-neutral-800 p-1.5 rounded-full"></div>
                        <div className="bg-neutral-800 p-1.5 rounded-full w-[60%]"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 h-15 ">
                      <div className="bg-blue-200 rounded-sm col-span-2 "></div>
                      <div className="flex flex-col gap-2 justify-center col-span-3 p-2">
                        <div className="bg-neutral-800 p-1.5 rounded-full"></div>
                        <div className="bg-neutral-800 p-1.5 rounded-full w-[60%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-span-4 relative bg-neutral-900 rounded-2xl px-3">
                  <div className="text-white flex justify-between items-center">
                    <span className="text-xs ">LIVE CHAT</span>
                    <Button size={"icon"}>
                      <Minus />
                    </Button>
                  </div>
                  <div className=" space-y-2">
                    {[1, 1, 1, 1].map((i, k) => (
                      <div key={k} className="grid grid-cols-8 h-8 ">
                        <div className="bg-blue-200 rounded-full col-span-2 "></div>
                        <div className="flex flex-col gap-1 justify-center col-span-6 p-2">
                          <div className="bg-neutral-800 p-1 rounded-full"></div>
                          <div className="bg-neutral-800 p-1 rounded-full w-[40%]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between p-1.5 bg-white rounded-full">
                    <div className="flex items-center gap-2">
                      <Smile size={"20"} />
                      <span className="text-xs font-semibold">
                        Send Message
                      </span>
                    </div>
                    <div>
                      <Send size={"20"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-40 flex flex-col justify-between -left-20 w-40 bg-yellow-200 p-3 px-4 rounded-3xl h-30">
              <span>-UP TO</span>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold">32%</span>
                <span className="text-xs font-medium">
                  Uplift Conversations
                </span>
              </div>
            </div>
          </div>
        </main>
    )
}