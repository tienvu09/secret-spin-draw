# 🎰 Secret Spin Draw

<div align="center">

![Secret Spin Draw](https://img.shields.io/badge/Secret%20Spin%20Draw-FHE%20Lottery-00ff88?style=for-the-badge&logo=ethereum&logoColor=white)

**The Future of Fair Gaming is Here**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tienvu09/secret-spin-draw)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)

</div>

---

## 🚀 What Makes Us Different?

Secret Spin Draw revolutionizes the lottery industry by combining **Fully Homomorphic Encryption (FHE)** with blockchain technology to create the world's most secure and transparent lottery system.

### 🔐 **Privacy-First Design**
- Your ticket numbers are encrypted using FHE before being stored on-chain
- No one can see your numbers until the official draw
- Complete privacy protection with mathematical guarantees

### ⛓️ **Blockchain Transparency**
- All transactions are recorded on Ethereum Sepolia testnet
- Immutable and verifiable lottery results
- Smart contracts ensure fair play

### 🎯 **Provably Fair**
- Cryptographically verifiable randomness
- No manipulation possible
- Mathematical proof of fairness

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="33%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50"/>
<br><b>React 18</b>
</td>
<td align="center" width="33%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" height="50"/>
<br><b>TypeScript</b>
</td>
<td align="center" width="33%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="50" height="50"/>
<br><b>Tailwind CSS</b>
</td>
</tr>
<tr>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/rainbow-me/rainbowkit/main/packages/rainbowkit/src/assets/rainbow.svg" width="50" height="50"/>
<br><b>Rainbow Kit</b>
</td>
<td align="center" width="33%">
<img src="https://wagmi.sh/logo.svg" width="50" height="50"/>
<br><b>Wagmi</b>
</td>
<td align="center" width="33%">
<img src="https://viem.sh/logo.svg" width="50" height="50"/>
<br><b>Viem</b>
</td>
</tr>
</table>

---

## 🎮 How It Works

```mermaid
graph TD
    A[Connect Wallet] --> B[Purchase Encrypted Ticket]
    B --> C[FHE Encryption on Blockchain]
    C --> D[Official Draw]
    D --> E[Simultaneous Number Reveal]
    E --> F[Prize Distribution]
    
    style A fill:#00ff88
    style B fill:#00ff88
    style C fill:#ff6b6b
    style D fill:#4ecdc4
    style E fill:#45b7d1
    style F fill:#96ceb4
```

### 1. **Connect Your Wallet** 🔗
- Support for MetaMask, Rainbow, WalletConnect, and more
- Secure connection to Sepolia testnet

### 2. **Purchase Encrypted Tickets** 🎫
- Choose your ticket price and jackpot
- Numbers are encrypted using FHE before storage

### 3. **Wait for the Draw** ⏰
- Your numbers remain completely hidden
- No one can access them until the official draw

### 4. **Reveal and Win** 🏆
- All numbers revealed simultaneously
- Instant prize distribution to winners

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/tienvu09/secret-spin-draw.git
cd secret-spin-draw

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura (Optional)
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

---

## 🏗️ Smart Contract

Our FHE smart contract ensures:

- **Encrypted Storage**: Ticket numbers encrypted with FHE
- **Fair Selection**: Cryptographically secure random number generation
- **Transparent Results**: All operations verifiable on-chain
- **Secure Distribution**: Automated prize distribution

```solidity
// Example: Purchase encrypted ticket
function purchaseTicket(
    uint256 roundId,
    externalEuint32 ticketNumber,
    bytes calldata inputProof
) public payable returns (uint256)
```

---

## 🎨 Features

### 🔒 **Security Features**
- [x] FHE encryption for ticket numbers
- [x] Blockchain-based transparency
- [x] Smart contract automation
- [x] Multi-signature verification

### 🎮 **User Experience**
- [x] Intuitive wallet connection
- [x] Real-time balance display
- [x] Responsive design
- [x] Mobile-friendly interface

### 🚀 **Performance**
- [x] Fast transaction processing
- [x] Optimized smart contracts
- [x] Efficient FHE operations
- [x] Minimal gas consumption

---

## 📱 Screenshots

<div align="center">

| Homepage | Purchase | Results |
|:--------:|:--------:|:-------:|
| ![Homepage](https://via.placeholder.com/300x200/1a1a1a/00ff88?text=Homepage) | ![Purchase](https://via.placeholder.com/300x200/1a1a1a/00ff88?text=Purchase) | ![Results](https://via.placeholder.com/300x200/1a1a1a/00ff88?text=Results) |

</div>

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tienvu09/secret-spin-draw)

1. Click the deploy button above
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run preview
```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/secret-spin-draw.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request
```

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/tienvu09/secret-spin-draw?style=social)
![GitHub forks](https://img.shields.io/github/forks/tienvu09/secret-spin-draw?style=social)
![GitHub issues](https://img.shields.io/github/issues/tienvu09/secret-spin-draw)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tienvu09/secret-spin-draw)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [FHEVM](https://github.com/fhenixprotocol/fhevm) for FHE implementation
- [Rainbow Kit](https://rainbowkit.com) for wallet integration
- [Wagmi](https://wagmi.sh) for React hooks
- [Viem](https://viem.sh) for TypeScript interface

---

## 📞 Support

- 📧 Email: support@secretspindraw.com
- 🐛 Issues: [GitHub Issues](https://github.com/tienvu09/secret-spin-draw/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/tienvu09/secret-spin-draw/discussions)

---

<div align="center">

**Made with ❤️ by [tienvu09](https://github.com/tienvu09)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tienvu09)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/secretspindraw)

</div>