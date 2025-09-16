import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_ticketPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "uint256", "name": "_prizePool", "type": "uint256"}
    ],
    "name": "createLotteryRound",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "roundId", "type": "uint256"},
      {"internalType": "uint256", "name": "ticketNumber", "type": "uint256"}
    ],
    "name": "purchaseTicket",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "roundId", "type": "uint256"}],
    "name": "getLotteryRoundInfo",
    "outputs": [
      {"internalType": "uint8", "name": "ticketPrice", "type": "uint8"},
      {"internalType": "uint8", "name": "totalTickets", "type": "uint8"},
      {"internalType": "uint8", "name": "winningTicket", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isCompleted", "type": "bool"},
      {"internalType": "address", "name": "organizer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "prizePool", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Placeholder

export const useLottery = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createLotteryRound = async (
    ticketPrice: string,
    duration: number,
    prizePool: string
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createLotteryRound',
        args: [BigInt(ticketPrice), BigInt(duration), BigInt(prizePool)],
        value: parseEther(prizePool),
      });
    } catch (err) {
      console.error('Error creating lottery round:', err);
    }
  };

  const purchaseTicket = async (roundId: number, ticketNumber: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'purchaseTicket',
        args: [BigInt(roundId), BigInt(ticketNumber)],
        value: parseEther('0.01'), // Minimum ticket price
      });
    } catch (err) {
      console.error('Error purchasing ticket:', err);
    }
  };

  const getLotteryRoundInfo = (roundId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getLotteryRoundInfo',
      args: [BigInt(roundId)],
    });
  };

  return {
    createLotteryRound,
    purchaseTicket,
    getLotteryRoundInfo,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
