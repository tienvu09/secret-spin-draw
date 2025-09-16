# Secret Spin Draw

A decentralized lottery application built with React, TypeScript, and FHE (Fully Homomorphic Encryption) smart contracts.

## Features

- **Secure Lottery System**: Uses FHE to encrypt sensitive lottery data
- **Wallet Integration**: Connect with popular wallets like MetaMask, Rainbow, and more
- **Transparent Results**: All lottery results are verifiable on-chain
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Wallet**: Rainbow Kit, Wagmi, Viem
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: FHE (Fully Homomorphic Encryption)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tienvu09/secret-spin-draw.git
cd secret-spin-draw
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contract

The lottery system uses FHE smart contracts to ensure:
- Encrypted ticket numbers
- Private winner selection
- Transparent result verification
- Secure prize distribution

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.