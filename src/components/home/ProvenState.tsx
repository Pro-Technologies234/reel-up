import { Button } from "../ui/button";
import { ArrowUpRight, Box, ChartAreaIcon, Play } from "lucide-react";

export function ProvenState() {
    return(
        <section className="max-w-6xl flex flex-col items-center pt-20  w-full m-auto not-md:px-4">
          <span className="p-1.5 px-2.5 rounded-full border border-black text-xs text-center">
            PROVEN STATE
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
            Get Achieving Superior <br />
            Industry Marks
          </h2>
          <span className="mt-5 p-2 px-4 rounded-full border bg-black text-white text-xs md:text-sm text-center">
            ReelUp ranks No.1 app on the{" "}
            <em>
              {" "}
              <u> Shopify</u>{" "}
            </em>{" "}
            app store.
          </span>
          <div className="mt-10 md:w-180 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-2xl p-8 flex items-center gap-4">
              <div>
                <Button
                  size={"icon"}
                  className="p-6 rounded-full text-black bg-fuchsia-400"
                >
                  <ChartAreaIcon />
                </Button>
              </div>
              <div>
                <span className="text-4xl">392%</span>
                <p>Increased user Engagement</p>
              </div>
            </div>
            <div className="border rounded-2xl p-8 flex items-center gap-4">
              <div>
                <Button
                  size={"icon"}
                  className="p-6 rounded-full text-black bg-yellow-200"
                >
                  <Play fill="black" />
                </Button>
              </div>
              <div>
                <span className="text-4xl">11.17 mins</span>
                <p>Videos watch time by user</p>
              </div>
            </div>
            <div className="border rounded-2xl p-8 flex items-center gap-4">
              <div>
                <Button
                  size={"icon"}
                  className="p-6 rounded-full text-black bg-violet-400"
                >
                  <Box />
                </Button>
              </div>
              <div>
                <span className="text-4xl">20X</span>
                <p>Jump In product discovery</p>
              </div>
            </div>
            <div className="border rounded-2xl p-8 flex items-center gap-4">
              <div>
                <Button
                  size={"icon"}
                  className="p-6 rounded-full text-black bg-emerald-500"
                >
                  <ArrowUpRight fill="black" />
                </Button>
              </div>
              <div>
                <span className="text-4xl">288%</span>
                <p>Uplift Conversions</p>
              </div>
            </div>
          </div>
        </section>
    )
}