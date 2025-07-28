import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  planName: string;
  subtitle: string;
  priceLabel: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  subtitle,
  priceLabel,
  isPopular = false,
  features,
  ctaText,
}) => {
  return (
    <div className="rounded-4xl h-120  flex flex-col gap-2 bg-zinc-50/50 shadow-xl shadow-blue-200 p-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl text-black">ReelUp</h2>
        {isPopular && (
          <span className="px-2.5 py-2 rounded-full border bg-blue-50 border-blue-500 text-xs">
            MOST POPULAR
          </span>
        )}
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-black">
          {planName} <span className="text-lg text-zinc-700 font-medium">{priceLabel}</span>
        </h2>
        <span className="text-sm text-zinc-900">{subtitle}</span>
      </div>
      <div className="rounded-3xl bg-white shadow p-2 pt-4 flex flex-col justify-between h-full w-full">
        <div className="flex flex-col gap-4 justify-between px-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Check className="text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <Button className="w-full p-6 rounded-full bg-blue-800 hover:bg-blue-700 cursor-pointer mt-6">
          {ctaText}
        </Button>
      </div>
    </div>
  );
};
