import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Loader2 } from "lucide-react";
import { BlockchainService } from "@/services/blockchain";
import { TicketEncryption } from "@/services/encryption";
import { useAccount } from 'wagmi';

interface TicketCardProps {
  id: string;
  price: string;
  jackpot: string;
  isEncrypted: boolean;
  numbers?: number[];
}

export const TicketCard = ({ id, price, jackpot, isEncrypted, numbers }: TicketCardProps) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  // Debug logging
  console.log(`TicketCard ${id} - isConnected:`, isConnected, 'address:', address);

  // Clear error when wallet connects
  useEffect(() => {
    if (isConnected && purchaseError) {
      setPurchaseError(null);
    }
  }, [isConnected, purchaseError]);

  const handlePurchase = async () => {
    if (!isConnected) {
      setPurchaseError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setPurchaseError(null);

    try {
      // Create blockchain service instance
      const blockchainService = new BlockchainService();
      
      // Generate random lottery numbers
      const lotteryNumbers = TicketEncryption.generateLotteryNumbers();
      
      // Purchase ticket with encrypted numbers
      const ticket = await blockchainService.purchaseTicket(price, lotteryNumbers);
      
      console.log('Ticket purchased successfully:', ticket);
      setIsPurchased(true);
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchaseError(error instanceof Error ? error.message : 'Purchase failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border hover:border-primary transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Ticket #{id}</CardTitle>
          <Badge variant={isEncrypted ? "secondary" : "default"}>
            {isEncrypted ? (
              <>
                <Lock className="w-3 h-3 mr-1" />
                Encrypted
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3 mr-1" />
                Revealed
              </>
            )}
          </Badge>
        </div>
        
        <div className="bg-muted rounded-lg p-3 mt-3">
          <p className="text-sm text-muted-foreground">Jackpot</p>
          <p className="text-xl font-bold text-foreground">{jackpot}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-2">Numbers</p>
          <div className="grid grid-cols-3 gap-2">
            {isEncrypted ? (
              [1, 2, 3, 4, 5, 6].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 bg-background rounded flex items-center justify-center border"
                >
                  <span className="text-sm font-bold text-muted-foreground">?</span>
                </div>
              ))
            ) : (
              numbers?.map((num, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center"
                >
                  <span className="text-sm font-bold">{num}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {!isPurchased ? (
          <div className="space-y-2">
            <Button 
              onClick={handlePurchase}
              disabled={isLoading || !isConnected}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Encrypting & Purchasing...
                </>
              ) : (
                `Buy for ${price}`
              )}
            </Button>
            {purchaseError && (
              <p className="text-sm text-red-600 text-center">{purchaseError}</p>
            )}
            {!isConnected && (
              <p className="text-sm text-muted-foreground text-center">
                Connect wallet to purchase
              </p>
            )}
            {isConnected && (
              <p className="text-sm text-green-600 text-center">
                ✓ Wallet connected - Ready to purchase
              </p>
            )}
          </div>
        ) : (
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 font-semibold">✓ Purchased</p>
            <p className="text-sm text-muted-foreground">Numbers encrypted on blockchain</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};