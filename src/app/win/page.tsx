import type { Metadata } from "next";
import { WinGame } from "@/components/win/win-game";

export const metadata: Metadata = {
  title: "Raise a Glass & Win",
  description:
    "Fill your glass and win one of four offers at Hal's The Steakhouse Nashville — a free drink, a free dessert, a free appetizer, or $20 off $100. Offer value up to $20.",
  openGraph: {
    title: "Raise a Glass & Win · Hal's The Steakhouse",
    description:
      "Every pour wins. Fill your glass for a free drink, dessert, appetizer, or $20 off $100.",
  },
};

export default function WinPage() {
  return <WinGame />;
}
