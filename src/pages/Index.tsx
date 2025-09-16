import { LotteryHero } from "@/components/LotteryHero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <LotteryHero />

      {/* How It Works */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gold-gradient text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                description: "Link your crypto wallet to participate"
              },
              {
                step: "2", 
                title: "Purchase Ticket",
                description: "Buy encrypted lottery tickets with ETH"
              },
              {
                step: "3",
                title: "Numbers Encrypted", 
                description: "Your numbers are hidden on the blockchain"
              },
              {
                step: "4",
                title: "Draw & Reveal",
                description: "Numbers revealed after the official draw"
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
      </section>
    </div>
  );
};

export default Index;