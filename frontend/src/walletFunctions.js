import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";
import bs58 from 'bs58';




export const generateKeyPairSolana = async (web3Network, mnemonic, currentIndex, incrementFunction) => {
    // const { mnemonic } = useUserStore();
    const walletName = currentIndex === 0 ? "Main Wallet" : `Wallet ${currentIndex}`;

    if (web3Network === "solana") {
        const mnemonicString = mnemonic.join(" ");
        const seed = mnemonicToSeed(mnemonicString);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret)
        const publicKey = keyPair.publicKey.toBase58();
        const privateKey = bs58.encode(keyPair.secretKey);;
        console.log("This is the publicKey solana: ", publicKey);
        console.log("This is the privateKey solana: ", privateKey);
        incrementFunction();


        return {
            network: "solana",
            keyPair: {
                publicKey: publicKey,
                privateKey: privateKey
            },
            walletName: walletName
        };
    } else {
        const mnemonicString = mnemonic.join("");
        const seed = await mnemonicToSeed(mnemonicString);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const keyPair = new Wallet(privateKey);
        console.log("KeyPair from wallet functions: ", keyPair.address);
        incrementFunction();

        return {
            network: "ethereum", keyPair: {
                publicKey: keyPair.address,
                privateKey: privateKey,
            },
            walletName: walletName
        };
    }

}

