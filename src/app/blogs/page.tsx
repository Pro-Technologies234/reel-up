import { ArrowRight, Dot } from "lucide-react";
import Image from "next/image";
import img from '@/assets/images/Poppy & Ludivine I - Louise Carrasco.jpeg'
import sell_img1 from '@/assets/images/home/download (6).jpeg'
import sell_img2 from '@/assets/images/home/Glove Photoshoot.jpeg'
import sell_img3 from '@/assets/images/home/40019.jpg'
import sell_img4 from '@/assets/images/home/_DEEPBROW Love Deep Sparkle Necklace_.jpeg'
import sell_img5 from '@/assets/images/home/Search Result.jpeg'
import { Navbar } from "@/components/shared/navbar";

export default function Blogs() {
    const blogs = [
    {
        image: sell_img5,
        date: 'SEP, 24 2024',
        readTime: '7 MIN READ',
        title: 'Why we love Webflow (And You Should, Too!)',
    },
    {
        image: sell_img2,
        date: 'SEP, 24 2024',
        readTime: '7 MIN READ',
        title: 'Designing for Conversion: Tips & Tricks',
    },
    {
        image: img,
        date: 'SEP, 24 2024',
        readTime: '7 MIN READ',
        title: 'The Future of No-Code Platforms in 2025',
    },
    {
        image: sell_img1,
        date: 'SEP, 25 2024',
        readTime: '5 MIN READ',
        title: 'Building Scalable Design Systems with Tailwind',
    },
    {
        image: sell_img3,
        date: 'SEP, 26 2024',
        readTime: '8 MIN READ',
        title: 'Mastering UI/UX Principles for Modern Apps',
    },
    {
        image: sell_img4,
        date: 'SEP, 27 2024',
        readTime: '6 MIN READ',
        title: 'Top 10 Tools Every Developer Should Know',
    },
    ];

    return(
        <>
            <Navbar/>
            <section className="max-w-6xl flex flex-col items-center p-4 md:p-10 lg:p-20  w-full m-auto">
            <span className="p-1.5 px-2.5 rounded-full border border-black text-xs text-center">
                OUR BLOGS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
                The Latest Story From <br />
                Our Blog
            </h2>

            <div className="mt-10 max-w-6xl w-full grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
                <div key={index} className="space-y-2">
                <div className="overflow-hidden h-50 rounded-2xl">
                    <Image src={blog.image} alt="blog-image" />
                </div>
                <div className="flex items-center text-xs">
                    <span>{blog.date}</span>
                    <Dot />
                    <span>{blog.readTime}</span>
                </div>
                <div className="font-medium">
                    <h3>{blog.title}</h3>
                </div>
                <div className="w-full border" />
                <div className="flex items-center justify-between">
                    <span>Read More</span>
                    <ArrowRight size={'20'} />
                </div>
                </div>
            ))}
            </div>
            </section>
        </>


    )
}