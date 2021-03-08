import create from "zustand";
import Web3 from "web3";

const useWalletStore = create((set, get) => ({
  isWalletConnected: false,
  connectToWallet: () => set({ isWalletConnected: true }),
  disconnectFromWallet: () => set({ isWalletConnected: false }),
}));

export default useWalletStore;
