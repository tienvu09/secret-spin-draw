import { SpinningWheel } from "./SpinningWheel";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const LotteryHero = () => {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div className="text-center">
          {/* Main Header */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Secret Spin Draw
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8">
            FHE Encrypted Lottery on Blockchain
          </p>
          
          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Purchase encrypted lottery tickets with your wallet. Your numbers are hidden using 
            Fully Homomorphic Encryption until the official draw.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/purchase">
              <Button size="lg" className="px-8 py-3">
                Buy Tickets
              </Button>
            </Link>
            <Link to="/my-tickets">
              <Button size="lg" variant="outline" className="px-8 py-3">
                My Tickets
              </Button>
            </Link>
          </div>

          {/* Simple Features */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-semibold text-foreground mb-1">Encrypted</h3>
              <p className="text-sm text-muted-foreground">Numbers hidden with FHE</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-semibold text-foreground mb-1">Transparent</h3>
              <p className="text-sm text-muted-foreground">All on blockchain</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-semibold text-foreground mb-1">Fair</h3>
              <p className="text-sm text-muted-foreground">Provably random</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};