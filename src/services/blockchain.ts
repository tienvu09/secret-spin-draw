// Blockchain service for lottery operations
import { ethers } from 'ethers';
import { TicketEncryption, EncryptedTicket } from './encryption';

export interface LotteryTicket {
  id: string;
  numbers: number[];
  encryptedData: EncryptedTicket;
  hash: string;
  owner: string;
  price: string;
  timestamp: number;
  isRevealed: boolean;
}

export interface LotteryRound {
  id: string;
  ticketPrice: string;
  jackpot: string;
  endTime: number;
  isActive: boolean;
  winningNumbers?: number[];
}

export class BlockchainService {
  private provider: ethers.providers.Provider;
  private signer?: ethers.Signer;
  private contract?: ethers.Contract;

  constructor() {
    // Initialize with Sepolia testnet
    this.provider = new ethers.providers.JsonRpcProvider(
      import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY'
    );
  }

  /**
   * Connect wallet and get signer
   */
  async connectWallet(): Promise<string> {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      this.signer = provider.getSigner();
      const address = await this.signer.getAddress();
      return address;
    }
    throw new Error('MetaMask not found');
  }

  /**
   * Get current account address
   */
  async getCurrentAddress(): Promise<string> {
    if (this.signer) {
      return await this.signer.getAddress();
    }
    throw new Error('Wallet not connected');
  }

  /**
   * Get account balance
   */
  async getBalance(address?: string): Promise<string> {
    const targetAddress = address || await this.getCurrentAddress();
    const balance = await this.provider.getBalance(targetAddress);
    return ethers.utils.formatEther(balance);
  }

  /**
   * Purchase a lottery ticket with encrypted numbers
   */
  async purchaseTicket(
    ticketPrice: string,
    numbers: number[]
  ): Promise<LotteryTicket> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      // Generate encryption key
      const encryptionKey = TicketEncryption.generateKey();
      
      // Encrypt the numbers
      const encryptedData = await TicketEncryption.encryptNumbers(numbers, encryptionKey);
      
      // Create hash for blockchain storage
      const hash = TicketEncryption.createHash(encryptedData);
      
      // Create ticket object
      const ticket: LotteryTicket = {
        id: encryptedData.ticketId,
        numbers,
        encryptedData,
        hash,
        owner: await this.getCurrentAddress(),
        price: ticketPrice,
        timestamp: Date.now(),
        isRevealed: false
      };

      // Store encrypted data on blockchain (simplified - in real app would use smart contract)
      await this.storeTicketOnChain(ticket);

      // Store encryption key locally (in real app, this would be handled securely)
      this.storeEncryptionKey(ticket.id, encryptionKey);

      return ticket;
    } catch (error) {
      console.error('Failed to purchase ticket:', error);
      throw new Error('Failed to purchase ticket');
    }
  }

  /**
   * Store ticket data on blockchain
   */
  private async storeTicketOnChain(ticket: LotteryTicket): Promise<void> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      // In a real implementation, this would call a smart contract
      // For now, we'll simulate the transaction
      const tx = {
        to: '0x0000000000000000000000000000000000000000', // Contract address
        value: ethers.utils.parseEther(ticket.price),
        data: ethers.utils.defaultAbiCoder.encode(
          ['string', 'string', 'uint256'],
          [ticket.id, ticket.hash, ticket.timestamp]
        )
      };

      // Send transaction
      const transaction = await this.signer.sendTransaction(tx);
      await transaction.wait();

      console.log('Ticket stored on blockchain:', transaction.hash);
    } catch (error) {
      console.error('Failed to store ticket on blockchain:', error);
      throw error;
    }
  }

  /**
   * Store encryption key locally (in production, use secure storage)
   */
  private storeEncryptionKey(ticketId: string, key: string): void {
    const keys = this.getStoredKeys();
    keys[ticketId] = key;
    localStorage.setItem('lottery_encryption_keys', JSON.stringify(keys));
  }

  /**
   * Get stored encryption keys
   */
  private getStoredKeys(): Record<string, string> {
    const stored = localStorage.getItem('lottery_encryption_keys');
    return stored ? JSON.parse(stored) : {};
  }

  /**
   * Get encryption key for a ticket
   */
  private getEncryptionKey(ticketId: string): string | null {
    const keys = this.getStoredKeys();
    return keys[ticketId] || null;
  }

  /**
   * Reveal ticket numbers (after draw)
   */
  async revealTicket(ticketId: string): Promise<number[]> {
    try {
      // Get stored ticket data
      const ticket = await this.getTicketFromStorage(ticketId);
      if (!ticket) {
        throw new Error('Ticket not found');
      }

      // Get encryption key
      const key = this.getEncryptionKey(ticketId);
      if (!key) {
        throw new Error('Encryption key not found');
      }

      // Decrypt numbers
      const numbers = await TicketEncryption.decryptNumbers(ticket.encryptedData, key);
      
      // Update ticket as revealed
      ticket.isRevealed = true;
      await this.updateTicketInStorage(ticket);

      return numbers;
    } catch (error) {
      console.error('Failed to reveal ticket:', error);
      throw new Error('Failed to reveal ticket numbers');
    }
  }

  /**
   * Get ticket from local storage (in real app, this would be from blockchain)
   */
  private async getTicketFromStorage(ticketId: string): Promise<LotteryTicket | null> {
    const stored = localStorage.getItem('lottery_tickets');
    const tickets: LotteryTicket[] = stored ? JSON.parse(stored) : [];
    return tickets.find(t => t.id === ticketId) || null;
  }

  /**
   * Update ticket in local storage
   */
  private async updateTicketInStorage(ticket: LotteryTicket): Promise<void> {
    const stored = localStorage.getItem('lottery_tickets');
    const tickets: LotteryTicket[] = stored ? JSON.parse(stored) : [];
    const index = tickets.findIndex(t => t.id === ticket.id);
    
    if (index >= 0) {
      tickets[index] = ticket;
    } else {
      tickets.push(ticket);
    }
    
    localStorage.setItem('lottery_tickets', JSON.stringify(tickets));
  }

  /**
   * Get all tickets for current user
   */
  async getUserTickets(): Promise<LotteryTicket[]> {
    try {
      const address = await this.getCurrentAddress();
      const stored = localStorage.getItem('lottery_tickets');
      const tickets: LotteryTicket[] = stored ? JSON.parse(stored) : [];
      return tickets.filter(t => t.owner.toLowerCase() === address.toLowerCase());
    } catch (error) {
      console.error('Failed to get user tickets:', error);
      return [];
    }
  }

  /**
   * Create a new lottery round
   */
  async createLotteryRound(
    ticketPrice: string,
    jackpot: string,
    duration: number
  ): Promise<LotteryRound> {
    const round: LotteryRound = {
      id: `ROUND_${Date.now()}`,
      ticketPrice,
      jackpot,
      endTime: Date.now() + duration,
      isActive: true
    };

    // Store round data
    const stored = localStorage.getItem('lottery_rounds');
    const rounds: LotteryRound[] = stored ? JSON.parse(stored) : [];
    rounds.push(round);
    localStorage.setItem('lottery_rounds', JSON.stringify(rounds));

    return round;
  }

  /**
   * Get current lottery round
   */
  async getCurrentRound(): Promise<LotteryRound | null> {
    const stored = localStorage.getItem('lottery_rounds');
    const rounds: LotteryRound[] = stored ? JSON.parse(stored) : [];
    return rounds.find(r => r.isActive) || null;
  }

  /**
   * Complete lottery round and reveal winning numbers
   */
  async completeLotteryRound(roundId: string): Promise<number[]> {
    try {
      // Generate winning numbers
      const winningNumbers = TicketEncryption.generateLotteryNumbers();
      
      // Update round
      const stored = localStorage.getItem('lottery_rounds');
      const rounds: LotteryRound[] = stored ? JSON.parse(stored) : [];
      const roundIndex = rounds.findIndex(r => r.id === roundId);
      
      if (roundIndex >= 0) {
        rounds[roundIndex].isActive = false;
        rounds[roundIndex].winningNumbers = winningNumbers;
        localStorage.setItem('lottery_rounds', JSON.stringify(rounds));
      }

      return winningNumbers;
    } catch (error) {
      console.error('Failed to complete lottery round:', error);
      throw new Error('Failed to complete lottery round');
    }
  }
}
