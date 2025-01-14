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
      wallets: {
        solana: [],
        ethereum: []
      },
      mnemonic: [],
      web3Network: "solana",
      solanaCurrentIndex: 0,
      ethereumCurrentIndex: 0,
      selectedWallet: {},
      currencySelected: 'usd',

      setCurrencySelected: (currency) => set((state) => ({
        setCurrencySelected: currency
      })),

      deleteWallet: (index, network) => set((state) => {
        // Get the current network wallets (Solana or Ethereum)
        const networkWallets = state.wallets[network];

        // Filter out the wallet by index (remove the wallet at the given index)
        const updatedWallets = networkWallets.filter(wallet => wallet.index !== index);

        // Return the updated state with the filtered wallets
        return {
          wallets: {
            ...state.wallets,
            [network]: updatedWallets,  // Update the specific network wallets
          },
        };
      }),

      renameWallet: (index, network, newName) => set((state) => {
        // Update the wallet name for the given index in the specified network
        const updatedWallets = { ...state.wallets };
        const networkWallets = updatedWallets[network];
        const walletIndex = networkWallets.findIndex(wallet => wallet.index === index);
        
        if (walletIndex !== -1) {
            networkWallets[walletIndex].walletName = newName;
        }
        
        return { wallets: updatedWallets };
    }),

      setSelectedWallet: (index) => set((state) => {
        const networkWallets = state.wallets[state.web3Network];
        // Reset selectedWallet based on the new network
        if (!index && networkWallets.length > 0) {
          return {
            selectedWallet: networkWallets[0]  // Select the first wallet by default
          };
        }

        const selectedWallet = networkWallets.find(wallet => wallet.index === index);
        // console.log("SelectedWallet: ", selectedWallet);
        return { selectedWallet: selectedWallet || {} };  // Fallback if no wallet is found
      }),


      setSolanaCurrentIndex: () => set((state) => ({
        solanaCurrentIndex: state.solanaCurrentIndex + 1,
      })),

      setEthereumCurrentIndex: () => set((state) => ({
        ethereumCurrentIndex: state.ethereumCurrentIndex + 1
      })),



      setWeb3Network: (network) => set((state) => ({
        web3Network: network
      })),

      addWallet: (network, keyPair) => set((state) => {
        // Create a new wallet structure with the keyPair and network
        // console.log("AddWallet executed from userStore: ");
        const updatedWallets = { ...state.wallets };
        // console.log("This is the netowork: ", network);
        // console.log("This is the updatedWallets: ", updatedWallets);

        if (network === 'solana') {
          updatedWallets.solana = [...updatedWallets.solana, keyPair];
        } else if (network === 'ethereum') {
          updatedWallets.ethereum = [...updatedWallets.ethereum, keyPair];
        }

        return {
          wallets: updatedWallets
        };
      }),

      addMnemonic: (words) => set({
        mnemonic: words
      }),



      // Action to set user data
      setUser: (user) => {
        // console.log('Setting user data:', user); // Log to the console when setUser is called
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
