// Encryption service for lottery ticket numbers
import { ethers } from 'ethers';

export interface EncryptedTicket {
  encryptedNumbers: string;
  nonce: string;
  ticketId: string;
  timestamp: number;
}

export class TicketEncryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;

  /**
   * Generate a random encryption key
   */
  static generateKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Encrypt ticket numbers using AES-GCM
   */
  static async encryptNumbers(numbers: number[], key: string): Promise<EncryptedTicket> {
    try {
      // Convert numbers to JSON string
      const data = JSON.stringify(numbers);
      
      // Generate random nonce
      const nonce = crypto.getRandomValues(new Uint8Array(12));
      
      // Convert key to CryptoKey
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: this.ALGORITHM },
        false,
        ['encrypt']
      );

      // Encrypt the data
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: nonce,
        },
        cryptoKey,
        new TextEncoder().encode(data)
      );

      // Convert to hex strings for storage
      const encryptedHex = Array.from(new Uint8Array(encryptedData))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const nonceHex = Array.from(nonce)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      return {
        encryptedNumbers: encryptedHex,
        nonce: nonceHex,
        ticketId: this.generateTicketId(),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt ticket numbers');
    }
  }

  /**
   * Decrypt ticket numbers
   */
  static async decryptNumbers(encryptedTicket: EncryptedTicket, key: string): Promise<number[]> {
    try {
      // Convert hex strings back to Uint8Array
      const encryptedData = new Uint8Array(
        encryptedTicket.encryptedNumbers.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      );
      
      const nonce = new Uint8Array(
        encryptedTicket.nonce.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      );

      // Convert key to CryptoKey
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: this.ALGORITHM },
        false,
        ['decrypt']
      );

      // Decrypt the data
      const decryptedData = await crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: nonce,
        },
        cryptoKey,
        encryptedData
      );

      // Convert back to numbers
      const decryptedString = new TextDecoder().decode(decryptedData);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt ticket numbers');
    }
  }

  /**
   * Generate a unique ticket ID
   */
  private static generateTicketId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `TICKET_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Generate random lottery numbers
   */
  static generateLotteryNumbers(count: number = 6, max: number = 99): number[] {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  /**
   * Create a hash of the encrypted data for blockchain storage
   */
  static createHash(encryptedTicket: EncryptedTicket): string {
    const data = `${encryptedTicket.encryptedNumbers}${encryptedTicket.nonce}${encryptedTicket.ticketId}${encryptedTicket.timestamp}`;
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data));
  }
}
