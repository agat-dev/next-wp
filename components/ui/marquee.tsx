import { cn } from "@/lib/utils";
import Image from "next/image";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex items-center overflow-hidden p-2 [--duration:200s] [--gap:.5rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex items-center shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

 

const ReviewCardReferences = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative justify-center flex items-center w-full h-24 cursor-pointer overflow-hidden rounded-xl border p-1 m-1",
        // light styles
        "border-white-950/[.1] bg-white-950/[.01] hover:bg-white-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-col items-center">
        <Image className="m-1 object-contain" width={80} height={80} alt="" src={img} />
      </div>
    </figure>
  );
};
 
export { ReviewCardReferences };