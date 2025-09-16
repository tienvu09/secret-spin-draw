import { SpinningWheel } from "./SpinningWheel";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const LotteryHero = () => {
  return (
    <section className="min-h-screen bg-casino flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-destructive/10 rounded-full animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>

        <div className="text-center mb-16">
          {/* Main Header */}
          <h1 className="text-6xl md:text-8xl font-bold text-gold-gradient mb-6 tracking-tight">
            PRIVATE
            <br />
            LOTTERY
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-foreground/80 mb-4 font-light">
            Lottery Tickets, Hidden Until Draw.
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience the thrill of a truly fair lottery. Your ticket numbers are encrypted 
            on the blockchain, preventing any manipulation until the moment of revelation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/purchase">
              <Button size="lg" className="text-xl px-8 py-6 glow-gold">
                Purchase Tickets
              </Button>
            </Link>
            <Link to="/results">
              <Button size="lg" variant="outline" className="text-xl px-8 py-6">
                View My Tickets
              </Button>
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              {
                title: "🔒 Encrypted Tickets",
                description: "Numbers hidden until draw time"
              },
              {
                title: "⛓️ Blockchain Secured", 
                description: "Immutable and transparent"
              },
              {
                title: "🎰 Provably Fair",
                description: "Cryptographically verifiable"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/50 transition-colors casino-card"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spinning Wheel */}
        <div className="flex justify-center">
          <SpinningWheel />
        </div>

        {/* Current Jackpot */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-2">Current Jackpot</p>
          <div className="text-5xl md:text-7xl font-bold text-gold-gradient glow-gold animate-glow">
            $2,500,000
          </div>
          <p className="text-muted-foreground mt-2">Next draw in 2 days, 14 hours</p>
        </div>
      </div>
    </section>
  );
};