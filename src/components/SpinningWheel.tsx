import { useState } from "react";
import { Button } from "@/components/ui/button";

const WHEEL_NUMBERS = [
  { number: 7, color: "text-primary" },
  { number: 13, color: "text-accent" },
  { number: 21, color: "text-destructive" },
  { number: 35, color: "text-primary" },
  { number: 42, color: "text-accent" },
  { number: 88, color: "text-destructive" },
  { number: 99, color: "text-primary" },
  { number: 777, color: "text-accent" }
];

export const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedNumber(null);
    
    setTimeout(() => {
      const randomNumber = WHEEL_NUMBERS[Math.floor(Math.random() * WHEEL_NUMBERS.length)];
      setSelectedNumber(randomNumber.number);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Spinning Wheel Container */}
      <div className="relative">
        {/* Outer Ring with Glow */}
        <div className="w-80 h-80 rounded-full bg-casino border-4 border-primary glow-gold relative">
          {/* Inner Wheel */}
          <div 
            className={`w-full h-full rounded-full bg-purple relative overflow-hidden ${
              isSpinning ? "animate-spin-slow" : ""
            }`}
          >
            {/* Wheel Numbers */}
            {WHEEL_NUMBERS.map((item, index) => {
              const angle = (index * 360) / WHEEL_NUMBERS.length;
              return (
                <div
                  key={item.number}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "50% 50%"
                  }}
                >
                  <div 
                    className={`text-2xl font-bold ${item.color} absolute`}
                    style={{ top: "20px" }}
                  >
                    {item.number}
                  </div>
                </div>
              );
            })}
            
            {/* Center Gold Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold rounded-full flex items-center justify-center">
              {selectedNumber && (
                <span className="text-xl font-bold text-primary-foreground">
                  {selectedNumber}
                </span>
              )}
            </div>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary glow-gold"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button 
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-gold text-primary-foreground hover:bg-primary/90 text-xl px-8 py-4 rounded-xl glow-gold font-bold tracking-wider"
      >
        {isSpinning ? "SPINNING..." : "SPIN THE WHEEL"}
      </Button>

      {/* Result Display */}
      {selectedNumber && !isSpinning && (
        <div className="text-center animate-pulse-glow">
          <h3 className="text-2xl font-bold text-gold-gradient mb-2">Winning Number!</h3>
          <div className="text-6xl font-bold text-primary glow-gold">
            {selectedNumber}
          </div>
        </div>
      )}
    </div>
  );
};