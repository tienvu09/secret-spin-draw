// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretSpinDraw is SepoliaConfig {
    using FHE for *;
    
    struct LotteryTicket {
        euint32 ticketId;
        euint32 ticketNumber;
        address owner;
        uint256 purchaseTime;
        bool isWinner;
    }
    
    struct LotteryRound {
        euint32 roundId;
        euint32 ticketPrice;
        euint32 totalTickets;
        euint32 winningTicket;
        bool isActive;
        bool isCompleted;
        address organizer;
        uint256 startTime;
        uint256 endTime;
        uint256 prizePool;
    }
    
    struct Winner {
        euint32 ticketId;
        address winner;
        euint32 prizeAmount;
        uint256 claimTime;
        bool isClaimed;
    }
    
    mapping(uint256 => LotteryRound) public lotteryRounds;
    mapping(uint256 => LotteryTicket) public tickets;
    mapping(uint256 => Winner) public winners;
    mapping(address => euint32) public playerReputation;
    mapping(address => uint256[]) public playerTickets;
    
    uint256 public roundCounter;
    uint256 public ticketCounter;
    uint256 public winnerCounter;
    
    address public owner;
    address public verifier;
    uint256 public platformFee; // Platform fee percentage (basis points)
    
    event LotteryRoundCreated(uint256 indexed roundId, address indexed organizer, uint32 ticketPrice);
    event TicketPurchased(uint256 indexed ticketId, uint256 indexed roundId, address indexed buyer);
    event LotteryCompleted(uint256 indexed roundId, uint256 indexed winningTicketId);
    event PrizeClaimed(uint256 indexed winnerId, address indexed winner, uint32 prizeAmount);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier, uint256 _platformFee) {
        owner = msg.sender;
        verifier = _verifier;
        platformFee = _platformFee; // e.g., 500 = 5%
    }
    
    function createLotteryRound(
        uint256 _ticketPrice,
        uint256 _duration,
        uint256 _prizePool
    ) public payable returns (uint256) {
        require(_ticketPrice > 0, "Ticket price must be positive");
        require(_duration > 0, "Duration must be positive");
        require(msg.value >= _prizePool, "Insufficient prize pool funds");
        
        uint256 roundId = roundCounter++;
        
        lotteryRounds[roundId] = LotteryRound({
            roundId: FHE.asEuint32(0), // Will be set properly later
            ticketPrice: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            totalTickets: FHE.asEuint32(0),
            winningTicket: FHE.asEuint32(0),
            isActive: true,
            isCompleted: false,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            prizePool: _prizePool
        });
        
        emit LotteryRoundCreated(roundId, msg.sender, uint32(_ticketPrice));
        return roundId;
    }
    
    function purchaseTicket(
        uint256 roundId,
        externalEuint32 ticketNumber,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(lotteryRounds[roundId].organizer != address(0), "Lottery round does not exist");
        require(lotteryRounds[roundId].isActive, "Lottery round is not active");
        require(block.timestamp <= lotteryRounds[roundId].endTime, "Lottery round has ended");
        require(msg.value >= 0.01 ether, "Insufficient payment"); // Minimum payment
        
        uint256 ticketId = ticketCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalTicketNumber = FHE.fromExternal(ticketNumber, inputProof);
        
        tickets[ticketId] = LotteryTicket({
            ticketId: FHE.asEuint32(0), // Will be set properly later
            ticketNumber: internalTicketNumber,
            owner: msg.sender,
            purchaseTime: block.timestamp,
            isWinner: false
        });
        
        // Update round totals
        lotteryRounds[roundId].totalTickets = FHE.add(lotteryRounds[roundId].totalTickets, FHE.asEuint32(1));
        
        // Add ticket to player's collection
        playerTickets[msg.sender].push(ticketId);
        
        emit TicketPurchased(ticketId, roundId, msg.sender);
        return ticketId;
    }
    
    function completeLotteryRound(
        uint256 roundId,
        externalEuint32 winningTicketNumber,
        bytes calldata inputProof
    ) public {
        require(lotteryRounds[roundId].organizer == msg.sender, "Only organizer can complete lottery");
        require(lotteryRounds[roundId].isActive, "Lottery round is not active");
        require(block.timestamp > lotteryRounds[roundId].endTime, "Lottery round has not ended");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalWinningNumber = FHE.fromExternal(winningTicketNumber, inputProof);
        
        lotteryRounds[roundId].winningTicket = internalWinningNumber;
        lotteryRounds[roundId].isActive = false;
        lotteryRounds[roundId].isCompleted = true;
        
        // Find winning ticket (this would be done off-chain in practice)
        // For now, we'll create a placeholder winner
        uint256 winnerId = winnerCounter++;
        winners[winnerId] = Winner({
            ticketId: FHE.asEuint32(0), // Will be set properly later
            winner: address(0), // Will be set when winner is found
            prizeAmount: FHE.asEuint32(0), // Will be set to prize amount
            claimTime: 0,
            isClaimed: false
        });
        
        emit LotteryCompleted(roundId, 0); // Winning ticket ID will be set off-chain
    }
    
    function claimPrize(
        uint256 winnerId,
        externalEuint32 prizeAmount,
        bytes calldata inputProof
    ) public {
        require(winners[winnerId].winner == msg.sender, "Only winner can claim prize");
        require(!winners[winnerId].isClaimed, "Prize already claimed");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPrizeAmount = FHE.fromExternal(prizeAmount, inputProof);
        
        winners[winnerId].prizeAmount = internalPrizeAmount;
        winners[winnerId].claimTime = block.timestamp;
        winners[winnerId].isClaimed = true;
        
        // Calculate platform fee
        uint256 platformFeeAmount = (lotteryRounds[0].prizePool * platformFee) / 10000;
        uint256 winnerAmount = lotteryRounds[0].prizePool - platformFeeAmount;
        
        // Transfer prize to winner
        payable(msg.sender).transfer(winnerAmount);
        
        // Transfer platform fee to owner
        payable(owner).transfer(platformFeeAmount);
        
        emit PrizeClaimed(winnerId, msg.sender, 0); // Prize amount will be decrypted off-chain
    }
    
    function updatePlayerReputation(address player, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(player != address(0), "Invalid player address");
        
        playerReputation[player] = reputation;
        emit ReputationUpdated(player, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getLotteryRoundInfo(uint256 roundId) public view returns (
        uint8 ticketPrice,
        uint8 totalTickets,
        uint8 winningTicket,
        bool isActive,
        bool isCompleted,
        address organizer,
        uint256 startTime,
        uint256 endTime,
        uint256 prizePool
    ) {
        LotteryRound storage round = lotteryRounds[roundId];
        return (
            0, // FHE.decrypt(round.ticketPrice) - will be decrypted off-chain
            0, // FHE.decrypt(round.totalTickets) - will be decrypted off-chain
            0, // FHE.decrypt(round.winningTicket) - will be decrypted off-chain
            round.isActive,
            round.isCompleted,
            round.organizer,
            round.startTime,
            round.endTime,
            round.prizePool
        );
    }
    
    function getTicketInfo(uint256 ticketId) public view returns (
        uint8 ticketNumber,
        address owner,
        uint256 purchaseTime,
        bool isWinner
    ) {
        LotteryTicket storage ticket = tickets[ticketId];
        return (
            0, // FHE.decrypt(ticket.ticketNumber) - will be decrypted off-chain
            ticket.owner,
            ticket.purchaseTime,
            ticket.isWinner
        );
    }
    
    function getWinnerInfo(uint256 winnerId) public view returns (
        uint8 ticketId,
        address winner,
        uint8 prizeAmount,
        uint256 claimTime,
        bool isClaimed
    ) {
        Winner storage winner = winners[winnerId];
        return (
            0, // FHE.decrypt(winner.ticketId) - will be decrypted off-chain
            winner.winner,
            0, // FHE.decrypt(winner.prizeAmount) - will be decrypted off-chain
            winner.claimTime,
            winner.isClaimed
        );
    }
    
    function getPlayerReputation(address player) public view returns (uint8) {
        return 0; // FHE.decrypt(playerReputation[player]) - will be decrypted off-chain
    }
    
    function getPlayerTickets(address player) public view returns (uint256[] memory) {
        return playerTickets[player];
    }
    
    function setPlatformFee(uint256 _platformFee) public {
        require(msg.sender == owner, "Only owner can set platform fee");
        require(_platformFee <= 1000, "Platform fee cannot exceed 10%");
        platformFee = _platformFee;
    }
    
    function withdrawPlatformFees() public {
        require(msg.sender == owner, "Only owner can withdraw platform fees");
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner).transfer(balance);
    }
}
