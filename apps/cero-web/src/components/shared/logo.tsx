import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({
  className,
  showText = true,
  showIcon = true,
}: {
  className?: string;
  showText?: boolean;
  showIcon?: boolean;
}) => {
  return (
    <div className="flex items-center space-x-2">
      {showIcon && (
        <div
          className={cn(
            "relative aspect-square h-8 w-8 rounded-md overflow-hidden",
            className
          )}
        >
          <Image src="/logo.png" alt="Logo" fill className="object-cover" />
        </div>
      )}
      {showText && (
        <span className="text-xl font-bold">
          <span className="text-muted-foreground">cero</span>
          <span className="text-[#FF6B6B]">code</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
