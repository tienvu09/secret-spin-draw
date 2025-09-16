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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Wallet Connect */}
          <div className="max-w-md mx-auto mb-12">
            <WalletConnect />
          </div>

          {/* Available Tickets */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gold-gradient mb-4">
              Available Tickets
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Purchase encrypted lottery tickets. Your numbers remain hidden on the blockchain 
              until the draw, ensuring complete fairness and preventing manipulation.
            </p>
          </div>

          {/* Ticket Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {availableTickets.map((ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ))}
          </div>

          {/* Purchase Process */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gold-gradient text-center mb-8">
              Purchase Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Connect Wallet",
                  description: "Link your crypto wallet to participate in the lottery"
                },
                {
                  step: "2", 
                  title: "Select Ticket",
                  description: "Choose your preferred ticket with desired price and jackpot"
                },
                {
                  step: "3",
                  title: "Confirm Purchase", 
                  description: "Complete the transaction with your wallet"
                },
                {
                  step: "4",
                  title: "Numbers Encrypted",
                  description: "Your numbers are securely encrypted on the blockchain"
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
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gold-gradient text-center mb-8">
              Security Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "🔒 End-to-End Encryption",
                  description: "Your ticket numbers are encrypted using advanced cryptography before being stored on the blockchain"
                },
                {
                  title: "⛓️ Blockchain Verification", 
                  description: "All transactions are recorded on the blockchain, providing transparent and immutable proof of purchase"
                },
                {
                  title: "🎯 Fair Draw System",
                  description: "Numbers are revealed simultaneously after the draw, ensuring no manipulation is possible"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/50 transition-colors casino-card"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Purchase;