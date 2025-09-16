import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  if (isConnected && address) {
    return (
      <Card className="bg-card border-accent glow-neon">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">Wallet Connected</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-accent text-accent-foreground">
                ACTIVE
              </Badge>
              <ConnectButton />
            </div>
          </div>

          {/* Balance Display */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">ETH Balance</p>
              <p className="text-lg font-bold text-primary">
                {balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000'}
              </p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Tickets Owned</p>
              <p className="text-lg font-bold text-accent">0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border hover:border-primary transition-colors">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-6">
          Connect your wallet to purchase encrypted lottery tickets
        </p>

        {/* Supported Wallets */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {["MetaMask", "WalletConnect", "Coinbase", "Rainbow"].map((wallet) => (
            <div key={wallet} className="bg-secondary/50 rounded-lg p-3 border border-border">
              <p className="text-sm font-medium text-foreground">{wallet}</p>
            </div>
          ))}
        </div>

        <div className="w-full">
          <ConnectButton />
        </div>

        <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center">
          <ExternalLink className="w-3 h-3 mr-1" />
          By connecting, you agree to our Terms of Service
        </p>
      </CardContent>
    </Card>
  );
};