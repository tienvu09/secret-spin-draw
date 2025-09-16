import logoImage from "@/assets/lottery-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoImage} 
        alt="Secret Spin Draw Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      <div className="flex flex-col">
        <span className="text-gold-gradient font-bold text-lg leading-tight">
          SECRET
        </span>
        <span className="text-gold-gradient font-bold text-lg leading-tight">
          SPIN DRAW
        </span>
      </div>
    </div>
  );
};