import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PricingCard } from "@/components/shared/cards";
const pricingPlans = [
  {
    planName: "Starter",
    subtitle: "Best for Startups and small teams",
    priceLabel: "(Free Plan)",
    isPopular: false,
    features: [
      "Create your ReelUp profile",
      "Upload up to 10 Reels",
      "Basic Analytics",
      "Discoverable in search results",
      "Community access"
    ],
    ctaText: "Start for Free"
  },
  {
    planName: "Pro",
    subtitle: "For growing creators & freelancers",
    priceLabel: "($9/mo)",
    isPopular: true,
    features: [
      "Unlimited Reels Upload",
      "Advanced Analytics",
      "Discover Priority Listing",
      "Profile Customization",
      "Monetization Tools"
    ],
    ctaText: "Upgrade to Pro"
  },
  {
    planName: "Business",
    subtitle: "For brands & creative teams",
    priceLabel: "($29/mo)",
    isPopular: false,
    features: [
      "Team Collaboration",
      "Access to Creator Marketplace",
      "Direct Hiring Tools",
      "Brand Showcase Page",
      "Dedicated Account Manager"
    ],
    ctaText: "Contact Sales"
  }
];
export default function Pricing() {
  
  return (
    <>
      <div className="w-full h-dvh bg-gradient-to-b font-clashdisplay from-blue-100  to-white">
        <Navbar />
        <main className="max-w-6xl flex flex-col items-center pt-20  w-full m-auto">
          <span className="p-1.5 px-2.5 rounded-full uppercase border border-black text-xs text-center">
            Pricing Tiers
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center mt-4">
            Simple Plans for Every Creator<br />
            Everywhere At One
          </h1>
          <p className="text-center md:w-md lg:w-lg not-md:text-xs not-lg:text-sm mt-2">
            Whether you&lsquo;re just starting or scaling your creative business, ReelUp has a plan for you.
          </p>
            <div className="w-full  max-w-6xl grid md:grid-cols-3 mt-20 gap-5">
                {pricingPlans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                ))}
            </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}
