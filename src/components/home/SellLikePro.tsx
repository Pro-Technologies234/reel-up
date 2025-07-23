import Image from "next/image";
import sell_img from '@/assets/images/home/Glove Photoshoot.jpeg'
import sell_img2 from '@/assets/images/home/download (6).jpeg'
import sell_img3 from '@/assets/images/home/_DEEPBROW Love Deep Sparkle Necklace_.jpeg'
import sell_img4 from '@/assets/images/home/40019.jpg'
import { ArrowRight, Minus, Heart, Plus, Send, Smile, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export function SellLikePro() {
    return(
        <section className="max-w-6xl flex flex-col items-center pt-20  w-full m-auto not-md:px-4">
          <span className="p-1.5 px-2.5 rounded-full border border-black text-xs text-center">
            SELL LIKE A PRO
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
            Take Your Live Shopping <br />
            To The Next Level
          </h2>
          <div className="w-full md:h-150 rounded-4xl justify-center items-center not-md:space-y-5 md:grid  md:grid-cols-2 bg-emerald-600/80 mt-20 p-8 not-md:gap-8 md:p-10 lg:p-20">
            <div>
              <div className="md:w-90 w-auto  rounded-3xl bg-white p-3 relative">
                <div className="flex space-x-2 pb-4 p-2 ">
                  <div className="bg-neutral-400 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 h-50 gap-2">
                  <div className="bg-neutral-400 rounded-xl overflow-hidden">
                    <Image
                      src={sell_img}
                      alt="sell.png"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="bg-neutral-400 rounded-xl overflow-hidden relative">
                    <Image
                      src={sell_img2}
                      alt="sell.png"
                      className="object-cover w-full h-full"
                    />
                    <div className="flex absolute top-2 right-2 items-center text-xs font-medium rounded-full overflow-hidden">
                      <span className="bg-red-500 p-0.5 px-2 text-white">
                        LIVE
                      </span>
                      <span className="bg-white p-0.5 px-2 ">3.5K</span>
                    </div>
                  </div>
                </div>
                <div className="absolute w-45  space-y-2 not-md:hidden not-lg:-bottom-20 lg:-bottom-10 bg-white -right-10 md:-right-20 p-4 rounded-3xl">
                  <span className="font-semibold text-xl">Add Host</span>
                  <p className="text-xs font-medium">
                    Add multiple host from around the world
                  </p>
                  <Button
                    size={"sm"}
                    className="bg-yellow-200 text-xs hover:bg-yellow-200 text-black w-full  rounded-full"
                  >
                    <Plus size={"15"} /> ADD HOST
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div>
                <span className="p-1.5 px-3.5 not-md:text-sm tracking-widest rounded-full border border-black text-xs text-center">
                  STEP 2
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl w-sm mt-4">
                Invite Multiple <br /> Host
              </h3>
              <p className="md:w-sm  text-xs md:text-sm">
                Go Live with Multiple Host from around the world,
                Instagram-style Stories, pop-ups, video grids, and <br /> more.
              </p>
            </div>
          </div>
          <div className="w-full md:h-150 h-auto rounded-4xl justify-center items-center not-md:space-y-10 md:grid not-md:grid-row-2 md:grid-cols-2 bg-yellow-300/60 mt-20 p-8 not-md:gap-8 md:p-20">
            <div className="flex flex-col justify-end">
              <div>
                <span className="p-1.5 px-3.5 not-md:text-sm tracking-widest rounded-full border border-black text-xs text-center">
                  STEP 2
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl w-sm mt-4">
                AI Driven <br /> Livestream Chat
              </h3>
              <p className="md:w-sm w-auto text-xs md:text-sm">
                Loaded with an array of captivating widgets designed to showcase
                interactive shopping videos on your store, includind video
                carousel
                <br />
              </p>
            </div>
            <div>
              <div className="w-full rounded-3xl bg-white p-3 relative">
                <div className="flex space-x-2 pb-4 p-2 ">
                  <div className="bg-neutral-400 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                </div>
                <div className="md:grid flex flex-col md:grid-cols-2  md:h-80 gap-2">
                  <div className="bg-neutral-400 rounded-xl overflow-hidden relative">
                    <Image
                      src={sell_img3}
                      alt="sell.png"
                      className="object-cover w-full h-full"
                    />
                    <div className="flex absolute top-2 right-2 items-center text-xs font-medium rounded-full overflow-hidden">
                      <span className="bg-red-500 p-0.5 px-2 text-white">
                        LIVE
                      </span>
                      <span className="bg-white p-0.5 px-2 ">3.5K</span>
                    </div>
                    <div className="absolute bottom-2 text-white left-2 right-2 flex items-center gap-2 justify-between ">
                      <div className="p-1.5 px-4 rounded-full w-full bg-black/40 backdrop-blur-xs ">
                        <span className="text-sm tracking-widest font-light">
                          Chat
                        </span>
                      </div>
                      <div>
                        <Heart strokeWidth={"1"} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>SHOP</span>
                    <div className="grid not-md:grid-cols-2 md:grid-rows-2 not-md:gap-2 h-full ">
                      <div className="space-y-2">
                        <div className="h-45 md:h-25 rounded-xl overflow-hidden">
                          <Image
                            src={sell_img4}
                            alt="sell.png"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex not-md:flex-col not-md:gap-2 justify-between">
                          <div className="text-xs">
                            <span>Heart Breaker Tee</span>
                            <p className="font-semibold">$39.99</p>
                          </div>
                          <Button
                            size={"sm"}
                            className="text-green-500 rounded-full bg-green-200 hover:bg-green-200 px-5"
                          >
                            Shop Now
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-45 md:h-25 rounded-xl overflow-hidden">
                          <Image
                            src={sell_img}
                            alt="sell.png"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex not-md:flex-col not-md:gap-2 justify-between">
                          <div className="text-xs">
                            <span>Raise Hell Pullover</span>
                            <p className="font-semibold">$64.99</p>
                          </div>
                          <Button
                            size={"sm"}
                            className="text-green-500 rounded-full bg-green-200 hover:bg-green-200 px-5"
                          >
                            Shop Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute w-45  space-y-2 not-md:hidden md:-bottom-10 bg-gradient-to-b from-black/50 via-black/30 bg-black/50 -left-5 md:-left-20 p-2 text-white rounded-xl">
                  <div className="text-white flex justify-between items-center">
                    <span className="text-xs ">PRODUCTS</span>
                    <Minus size={"20"} />
                  </div>
                  <div className=" space-y-1.5">
                    {[1, 1, 1, 1].map((i, k) => (
                      <div key={k} className="flex gap-1 h-8 ">
                        <div className="bg-blue-200 rounded-full w-8 h-8 "></div>
                        <div className="flex flex-col gap-1 w-[80%] justify-center col-span-6 p-2">
                          <div className="bg-neutral-400/20 p-1 w-full rounded-full"></div>
                          <div className="bg-neutral-400/20 p-1  rounded-full w-[40%]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between p-1.5 bg-white text-black rounded-full">
                    <div className="flex items-center gap-2">
                      <Smile strokeWidth={"1"} size={"18"} />
                      <span className="text-xs font-medium">Send Message</span>
                    </div>
                    <div>
                      <Send strokeWidth={"1"} size={"18"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:h-150 rounded-4xl justify-center items-center not-md:space-y-10 md:grid not-md:grid-row-2 md:grid-cols-2 bg-violet-500/60 mt-20 p-8 not-md:gap-8 md:p-20">
            <div>
              <div className="md:w-100  rounded-3xl bg-white p-3 relative">
                <div className="flex space-x-2 pb-4 p-2 ">
                  <div className="bg-neutral-400 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                  <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                </div>
                <div className=" h-auto gap-2 p-4 border-2 not-md:space-y-3 rounded-2xl">
                  <h3 className="font-semibold">Live Streaming</h3>
                  <p>Select a platform for Live Streaming.</p>
                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-neutral-200 flex p-0.5 justify-between rounded-md ">
                      <Button variant={"ghost"} className='text-xs p-1' >
                        Tiktok
                      </Button>
                      <Button size={"icon"} variant={"ghost"}>
                        <CheckCircle2 />
                      </Button>
                    </div>
                    <div className="bg-neutral-200 flex p-0.5 justify-between rounded-md ">
                      <Button variant={"ghost"} className='text-xs p-1' >
                        Youtube
                      </Button>
                      <Button size={"icon"} variant={"ghost"}>
                        <CheckCircle2 />
                      </Button>
                    </div>
                    <div className="bg-neutral-200 flex p-0.5 justify-between rounded-md ">
                      <Button variant={"ghost"} className='text-xs p-1' >
                        Instagram
                      </Button>
                      <Button size={"icon"} variant={"ghost"}>
                        <CheckCircle2 />
                      </Button>
                    </div>
                    <div className="bg-neutral-200 flex p-0.5 justify-between rounded-md ">
                      <Button variant={"ghost"} className='text-xs p-1' >
                        Your App/Website
                      </Button>
                      <Button size={"icon"} variant={"ghost"}>
                        <CheckCircle2 />
                      </Button>
                    </div>
                    <div className="bg-neutral-200 flex p-0.5 justify-between rounded-md ">
                      <Button variant={"ghost"} className='text-xs p-1' >
                        Facebook
                      </Button>
                      <Button size={"icon"} variant={"ghost"}>
                        <CheckCircle2 />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div>
                      <Button
                        size={"sm"}
                        className="bg-yellow-200 text-xs hover:bg-yellow-200 text-black w-full  rounded-full"
                      >
                        GO LIVE <ArrowRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div>
                <span className="p-1.5 px-3.5 not-md:text-sm tracking-widest rounded-full border border-black text-xs text-center">
                  STEP 3
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl w-sm mt-4">
                Go Live Every <br /> Where
              </h3>
              <p className="md:w-sm text-xs md:text-sm">
                Loaded with an array of captivating widgets designed to showcase
                interactive shopping videos on your store, includind video
                carousel, instagram-style stories, pop-ups, video grids and more
                <br />
              </p>
            </div>
          </div>
        </section>
    )
}