import Image from "next/image";

/** Brand logo lockup for the header/footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.avif"
      alt="Hal's The Steakhouse"
      width={227}
      height={176}
      priority
      className={`h-10 w-auto sm:h-11 ${className}`}
    />
  );
}
