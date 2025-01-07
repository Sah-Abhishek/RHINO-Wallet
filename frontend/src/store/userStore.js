import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateMnemonic, mnemonicToSeedSync } from "bip39";


const useUserStore = create(
  persist(
    (set) => ({
      // Initial state
      name: '',
      image: '',
      email: '',
      wallet: [],
      mnemonic: [],
      web3Network: "",
      solanaCurrentIndex: 0,
      ethereumCurrentIndex: 0,

      setSolanaCurrentIndex: () => set((state) => ({
        solanaCurrentIndex: state.solanaCurrentIndex + 1, 
      })),
      
      setEthereumCurrentIndex: () => set((state) =>( {
        ethereumCurrentIndex: state.ethereumCurrentIndex + 1
      })),



      setWeb3Network: (network) => set((state) => ({
        web3Network: network
      })),

      addWallet: (keyPair) => set((state) => ({
        wallet: [...state.wallet, keyPair], // Add the new keyPair to the existing wallet array
      })),

      addMnemonic: (words) => set({
        mnemonic: words
      }),

      

      // Action to set user data
      setUser: (user) => {
        console.log('Setting user data:', user); // Log to the console when setUser is called
        set({
          name: user.name,
          image: user.picture,
          email: user.email,
        });
      },
    }),
    {
      name: 'wallet-storage', // The key for localStorage
      getStorage: () => localStorage, // Use localStorage as the storage engine
    }
  )
);

export default useUserStore;
