import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock } from "lucide-react";

interface TicketCardProps {
  id: string;
  price: string;
  jackpot: string;
  isEncrypted: boolean;
  numbers?: number[];
}

export const TicketCard = ({ id, price, jackpot, isEncrypted, numbers }: TicketCardProps) => {
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    setIsPurchased(true);
    // In a real app, this would connect to the blockchain
  };

  return (
    <Card className="casino-card bg-card border-border hover:border-primary group">
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gold-gradient text-xl">
            Ticket #{id}
          </CardTitle>
          <Badge variant={isEncrypted ? "secondary" : "default"} className="glow-neon">
            {isEncrypted ? (
              <>
                <Lock className="w-3 h-3 mr-1" />
                ENCRYPTED
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3 mr-1" />
                REVEALED
              </>
            )}
          </Badge>
        </div>
        
        {/* Jackpot Amount */}
        <div className="bg-purple rounded-lg p-4 mt-4">
          <p className="text-sm text-muted-foreground">Jackpot</p>
          <p className="text-3xl font-bold text-primary glow-gold">{jackpot}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Numbers Display */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Your Numbers</p>
          <div className="grid grid-cols-3 gap-2">
            {isEncrypted ? (
              // Encrypted numbers - show question marks
              [1, 2, 3, 4, 5, 6].map((_, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border"
                >
                  <span className="text-xl font-bold text-muted-foreground">?</span>
                </div>
              ))
            ) : (
              // Revealed numbers
              numbers?.map((num, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-accent rounded-full flex items-center justify-center border-2 border-accent glow-neon"
                >
                  <span className="text-lg font-bold text-accent-foreground">{num}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Purchase Button */}
        {!isPurchased ? (
          <Button 
            onClick={handlePurchase}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 glow-gold"
          >
            Buy for {price}
          </Button>
        ) : (
          <div className="text-center p-3 bg-accent/20 rounded-lg border border-accent">
            <p className="text-accent font-bold">✓ PURCHASED</p>
            <p className="text-sm text-muted-foreground">Numbers will be revealed after draw</p>
          </div>
        )}

        {/* Ticket Status */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className={isPurchased ? "text-accent font-bold" : "text-muted-foreground"}>
            {isPurchased ? "ACTIVE" : "AVAILABLE"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};