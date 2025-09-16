import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Eye, EyeOff, Loader2 } from "lucide-react";
import { BlockchainService, LotteryTicket } from "@/services/blockchain";
import { TicketEncryption } from "@/services/encryption";
import { useAccount } from 'wagmi';
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

export default function MyTickets() {
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedTickets, setRevealedTickets] = useState<Set<string>>(new Set());
  const [isRevealing, setIsRevealing] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const blockchainService = new BlockchainService();

  useEffect(() => {
    if (isConnected && address) {
      loadUserTickets();
    }
  }, [isConnected, address]);

  const loadUserTickets = async () => {
    try {
      setIsLoading(true);
      const userTickets = await blockchainService.getUserTickets();
      setTickets(userTickets);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevealTicket = async (ticketId: string) => {
    try {
      setIsRevealing(ticketId);
      const numbers = await blockchainService.revealTicket(ticketId);
      setRevealedTickets(prev => new Set([...prev, ticketId]));
      console.log('Revealed numbers:', numbers);
    } catch (error) {
      console.error('Failed to reveal ticket:', error);
    } finally {
      setIsRevealing(null);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Logo size="md" />
              </Link>
              <Link to="/purchase">
                <Button variant="outline">Buy Tickets</Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">My Tickets</h1>
          <p className="text-muted-foreground mb-8">Please connect your wallet to view your tickets</p>
          <Link to="/purchase">
            <Button>Connect Wallet & Buy Tickets</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/purchase">
                <Button variant="outline">Buy More Tickets</Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">My Tickets</h1>
          <p className="text-muted-foreground">
            View your encrypted lottery tickets and reveal numbers after the draw
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tickets found</p>
            <Link to="/purchase">
              <Button>Buy Your First Ticket</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => {
              const isRevealed = revealedTickets.has(ticket.id);
              const isRevealingThis = isRevealing === ticket.id;

              return (
                <Card key={ticket.id} className="bg-card border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{ticket.id}</CardTitle>
                      <Badge variant={isRevealed ? "default" : "secondary"}>
                        {isRevealed ? (
                          <>
                            <Unlock className="w-3 h-3 mr-1" />
                            Revealed
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Encrypted
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-lg font-bold text-foreground">{ticket.price} ETH</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm text-muted-foreground mb-2">Numbers</p>
                      <div className="grid grid-cols-3 gap-2">
                        {isRevealed ? (
                          ticket.numbers.map((num, i) => (
                            <div 
                              key={i}
                              className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center"
                            >
                              <span className="text-sm font-bold">{num}</span>
                            </div>
                          ))
                        ) : (
                          [1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div 
                              key={i}
                              className="w-8 h-8 bg-background rounded flex items-center justify-center border"
                            >
                              <span className="text-sm font-bold text-muted-foreground">?</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Purchase Date: {new Date(ticket.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Hash: {ticket.hash.slice(0, 10)}...
                      </p>
                    </div>

                    {!isRevealed && (
                      <Button 
                        onClick={() => handleRevealTicket(ticket.id)}
                        disabled={isRevealingThis}
                        className="w-full"
                        variant="outline"
                      >
                        {isRevealingThis ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Revealing...
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Reveal Numbers
                          </>
                        )}
                      </Button>
                    )}

                    {isRevealed && (
                      <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-600 font-semibold">✓ Numbers Revealed</p>
                        <p className="text-sm text-muted-foreground">
                          Your lottery numbers are now visible
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
