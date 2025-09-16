import { WalletConnect } from "@/components/WalletConnect";
import { TicketCard } from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Purchase = () => {
  const availableTickets = [
    {
      id: "001",
      price: "0.1 ETH",
      jackpot: "$2.5M",
      isEncrypted: true,
      numbers: [7, 13, 21, 35, 42, 88]
    },
    {
      id: "002", 
      price: "0.05 ETH",
      jackpot: "$500K",
      isEncrypted: true,
      numbers: [3, 17, 29, 44, 55, 77]
    },
    {
      id: "003",
      price: "0.2 ETH", 
      jackpot: "$10M",
      isEncrypted: false,
      numbers: [11, 24, 33, 46, 59, 66]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gold-gradient">Purchase Tickets</h1>
            <Link to="/results">
              <Button variant="outline" size="sm">
                My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Purchase Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Wallet Connect */}
          <div className="max-w-md mx-auto mb-8">
            <WalletConnect />
          </div>

          {/* Available Tickets */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Available Tickets
            </h2>
            <p className="text-muted-foreground">
              Purchase encrypted lottery tickets. Your numbers are hidden with FHE until the draw.
            </p>
          </div>

          {/* Ticket Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableTickets.map((ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Purchase;