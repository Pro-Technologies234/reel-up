import { Navbar } from "../components/shared/navbar";
import { Hero } from "@/components/home/Hero";
import { SellLikePro } from "@/components/home/SellLikePro";
import { ProvenState } from "@/components/home/ProvenState";
import { DriveHigher } from "@/components/home/DriveHigher";
import { OurBlogs } from "@/components/home/OurBlogs";
import { BookADemo } from "@/components/home/BookADemo";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <>
      <div className="w-full h-dvh bg-gradient-to-b font-clashdisplay from-blue-100  to-white">
        <Navbar />
        <Hero/>
        <SellLikePro/>
        <ProvenState/>
        <DriveHigher/>
        <OurBlogs/>
        <BookADemo/>
        <Footer/>
      </div>
    </>
  );
}
