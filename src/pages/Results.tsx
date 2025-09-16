import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const Results = () => {
  const myTickets = [
    {
      id: "001",
      price: "0.1 ETH",
      jackpot: "$2.5M",
      isRevealed: true,
      numbers: [7, 13, 21, 35, 42, 88],
      winningNumbers: [7, 13, 21, 35, 42, 88],
      status: "won",
      prize: "$2,500,000"
    },
    {
      id: "002", 
      price: "0.05 ETH",
      jackpot: "$500K",
      isRevealed: true,
      numbers: [3, 17, 29, 44, 55, 77],
      winningNumbers: [7, 13, 21, 35, 42, 88],
      status: "lost",
      prize: "$0"
    },
    {
      id: "003",
      price: "0.2 ETH", 
      jackpot: "$10M",
      isRevealed: false,
      numbers: [11, 24, 33, 46, 59, 66],
      status: "pending"
    }
  ];

  const upcomingDraw = {
    jackpot: "$5,000,000",
    timeLeft: "2 days, 14 hours"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Logo size="sm" />
            <Link to="/purchase">
              <Button size="sm">
                Buy More Tickets
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Next Draw Info */}
        <Card className="mb-12 casino-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gold-gradient mb-4">Next Draw</CardTitle>
            <div className="text-5xl font-bold text-gold-gradient glow-gold">
              {upcomingDraw.jackpot}
            </div>
            <p className="text-muted-foreground mt-2">
              Draw in {upcomingDraw.timeLeft}
            </p>
          </CardHeader>
        </Card>

        {/* My Tickets */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gold-gradient mb-8 text-center">
            My Tickets
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTickets.map((ticket) => (
              <Card key={ticket.id} className="casino-card border-border">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-foreground">Ticket #{ticket.id}</CardTitle>
                      <p className="text-muted-foreground">{ticket.price}</p>
                    </div>
                    <Badge 
                      variant={ticket.status === 'won' ? 'default' : ticket.status === 'lost' ? 'destructive' : 'secondary'}
                      className="capitalize"
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Ticket Numbers */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">Your Numbers:</span>
                        {ticket.isRevealed ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {ticket.isRevealed ? (
                          ticket.numbers.map((num, idx) => (
                            <div
                              key={idx}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${ticket.status === 'won' && ticket.winningNumbers?.includes(num) 
                                  ? 'bg-primary text-primary-foreground glow-gold' 
                                  : 'bg-muted text-muted-foreground'
                                }`}
                            >
                              {num}
                            </div>
                          ))
                        ) : (
                          Array.from({length: 6}).map((_, idx) => (
                            <div key={idx} className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Winning Numbers */}
                    {ticket.isRevealed && ticket.winningNumbers && (
                      <div>
                        <span className="text-sm text-muted-foreground mb-2 block">Winning Numbers:</span>
                        <div className="flex gap-2 flex-wrap">
                          {ticket.winningNumbers.map((num, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold glow-gold"
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prize */}
                    {ticket.status === 'won' && (
                      <div className="text-center pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">Prize Won</p>
                        <p className="text-2xl font-bold text-gold-gradient">{ticket.prize}</p>
                      </div>
                    )}

                    {/* Pending Status */}
                    {ticket.status === 'pending' && (
                      <div className="text-center pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Numbers will be revealed after the draw
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How Numbers Are Revealed */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-gradient text-center mb-8">
            Number Revelation Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Encrypted Storage",
                description: "Your numbers are encrypted and stored on the blockchain immediately after purchase"
              },
              {
                step: "2", 
                title: "Official Draw",
                description: "Winning numbers are drawn using a verifiable random process"
              },
              {
                step: "3",
                title: "Simultaneous Reveal", 
                description: "All ticket numbers are decrypted and revealed at the same time"
              }
            ].map((item) => (
              <div 
                key={item.step}
                className="text-center casino-card bg-card rounded-xl p-6 border border-border"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 glow-gold">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;