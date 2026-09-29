import type { Metadata } from "next";
import { WinGame } from "@/components/win/win-game";

export const metadata: Metadata = {
  title: "Raise a Glass & Win",
  description:
    "Fill your glass and win one of three offers at Hal's The Steakhouse Nashville — a free drink, a free dessert, or a free appetizer. Offer value up to $20.",
  openGraph: {
    title: "Raise a Glass & Win · Hal's The Steakhouse",
    description:
      "Every pour wins. Fill your glass for a free drink, dessert, or appetizer.",
  },
};

export default function WinPage() {
  return <WinGame />;
}
