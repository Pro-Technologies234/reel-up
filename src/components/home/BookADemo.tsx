import { Button } from "../ui/button";

export function BookADemo() {
    return (
        <section className="max-w-6xl bg-black h-50 mt-20 relative md:rounded-2xl overflow-hidden w-full m-auto" >
          {/* <Image src={img} alt='img.png' className='object-cover w-full h-full' /> */}
          <div className="absolute flex not-md:flex-col items-center justify-between inset-0 p-4 md:p-20" >
              <div className="text-2xl text-white" >
                <h2 className='font-medium text-2xl md:text-3xl not-md:text-center lg:text-4xl' >
                  Ready to improve your <br /> sales and conversions
                </h2>
              </div>
              <div className='flex gap-4' >
                  <Button variant={'ghost'} size={'lg'}  className="bg-white rounded-full" >
                    Book Demo
                  </Button>
                  <Button variant={'ghost'} size={'lg'}  className="bg-green-300 rounded-full" >
                    Try Reelup -- For Free!
                  </Button>
              </div>
          </div>
        </section>
    )
}