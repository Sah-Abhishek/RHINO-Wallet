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
      selectedWallet: {},

      setSelectedWallet: (index) => set((state) => {
        // Filter wallets by the current web3Network
        // console.log("This is the web3network from store.js ", state.web3network);
        
        const filteredWallets = state.wallet.filter(wallet => wallet.network === state.web3Network);
        console.log("FilteredWallets from store: ", filteredWallets);

        if(!index){
          return{
            selectedWallet: state.wallet.find(wallet => wallet.index === 0)
          }
        }
        
        // Find the wallet with the matching walletName
        const selectedWallet = filteredWallets.find(wallet => wallet.index === index);
        
        // If a matching wallet is found, return it as the selected wallet
        if (selectedWallet) {
          return { selectedWallet: selectedWallet };
        } else {
          return { selectedWallet: null }; // If not found, reset selectedWallet
        }
      }),

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
