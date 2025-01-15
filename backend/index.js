// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config(); // Load environment variables from .env
const axios = require('axios');
const CryptoPrice = require('./models/coin');


const app = express();
app.use(express.json())
const PORT = 3000;
const corsOptions = {
    origin: 'https://rhino-wallet.vercel.app',  // Allow only this website
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Optional: Specify allowed headers
  };const mongodburi = process.env.mongoose_uri

// MongoDB connection (replace with your MongoDB connection string)
mongoose.connect(mongodburi).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});



// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});


const fetchPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd,inr');

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Handle rate limiting (429 error)
            console.log("Rate limit hit. Returning null for price data.");
            return null;
        }
        console.log("Error fetching price data: ", error);
        return null;
    }
};

const saveInDB = async () => {
    const data = await fetchPrice(); // Fetch price data

    if (data) {
        try {
            // Save Solana data
            const solanaCoin = await CryptoPrice.findOne({ coin: "solana" });
            if (!solanaCoin) {
                await CryptoPrice.create({
                    coin: "solana",
                    price: {
                        usd: data.solana.usd,
                        inr: data.solana.inr
                    }
                });
                console.log("Solana data added to the database");
            } else {
                solanaCoin.price.usd = data.solana.usd;
                solanaCoin.price.inr = data.solana.inr;
                await solanaCoin.save();
                console.log("Solana data updated in the database");
            }

            // Save Ethereum data
            const ethereumCoin = await CryptoPrice.findOne({ coin: "ethereum" });
            if (!ethereumCoin) {
                await CryptoPrice.create({
                    coin: "ethereum",
                    price: {
                        usd: data.ethereum.usd,
                        inr: data.ethereum.inr
                    }
                });
                console.log("Ethereum data added to the database");
            } else {
                ethereumCoin.price.usd = data.ethereum.usd;
                ethereumCoin.price.inr = data.ethereum.inr;
                await ethereumCoin.save();
                console.log("Ethereum data updated in the database");
            }

            return data;

        } catch (error) {
            console.log("Error saving price data to the database: ", error);
            return null;
        }
    }
    return null; // If data is null due to rate limit or other errors
};

const getPricesFromDB = async () => {
    try {
        const solanaCoin = await CryptoPrice.findOne({ coin: "solana" });
        const ethereumCoin = await CryptoPrice.findOne({ coin: "ethereum" });

        if (solanaCoin && ethereumCoin) {
            return {
                solana: {
                    usd: solanaCoin.price.usd,
                    inr: solanaCoin.price.inr
                },
                ethereum: {
                    usd: ethereumCoin.price.usd,
                    inr: ethereumCoin.price.inr
                }
            };
        } else {
            console.log("Prices not found in the database");
            return null;
        }
    } catch (error) {
        console.log("Error fetching prices from database: ", error);
        return null;
    }
};

app.post('/getCoinPrice', async (req, res) => {
    const { publicKey } = req.body;
    const network = "solana";
    // console.log("Solana");

    try {
        const price = await saveInDB(); // Try fetching and saving price to DB

        if (!price) {
            // If rate limit is hit, fetch prices from DB
            console.log("Rate limit hit or error fetching price, using database data");
            const dbPrice = await getPricesFromDB();

            if (dbPrice) {
                return res.status(200).json({ price: dbPrice });
            } else {
                return res.status(500).json({
                    error: "Unable to fetch price data, please try again later."
                });
            }
        }

        // Return the fetched price
        return res.status(200).json({
            price: price
        });

    } catch (error) {
        console.log("Internal Server Error: ", error);
        res.status(500).json({
            error: error
        });
    }
});








app.post('/signup', async (req, res) => {
    const { image, name, email } = req.body;
    // console.log("userCredentials: ", userCredentials);

    if (!email || !name) {
        return res.status(400).json({
            message: "Email and name are required"
        })
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Existing User: ", existingUser);
            return res.status(200).json({
                message: "User already exist with this email"
            })
        }

        const newUser = new User({
            email,
            image,
            name
        });

        await newUser.save();

        console.log("New User: ", newUser);

        res.status(210).json({
            message: "User successfully created",
            user: newUser
        })

    } catch (error) {
        console.log("There was an error: ", error);
        res.status(500).json({
            message: "Internal server Error"
        })
    }
})
// This is test for crackboard
app.post('/saveCredential', async (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({
            message: "Password missing"
        })
    }
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist"
            })
        }
        console.log("This is the existing User", existingUser);

        existingUser.password = password;


        await existingUser.save();
        res.status(201).json({
            message: "Password Saved Successfully"
        })

    } catch (error) {
        console.log("Internal Server Error", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.post('/checkCredential', async (req, res) => {
    const { email, inputValue } = req.body;
    // console.log("This is the email: ", email);
    if (!email || !inputValue) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    try {
        const existingUser = await User.findOne({ email: email });
        // console.log("This is the existing User: ", existingUser);

        if (existingUser.password === inputValue) {
            res.status(200).json({
                message: "Paword matched"
            })
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

    } catch (error) {
        console.log("Internal Server Error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.post('/getBalance', async (req, res) => {
    const { publicKey, network } = req.body;
    let response;

    try {
        if (network === 'solana') {
            response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/Ti-xz4F2isOh8tuoUBe85YkiPVU47UJ6', {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [
                    publicKey
                ]
            })
            return res.status(200).json({
                network: network,
                message: "Balance fetched successfully",
                balance: response.data.result.value
            })
        } else if (network === 'ethereum') {
            response = await axios.post('https://eth-mainnet.g.alchemy.com/v2/Ti-xz4F2isOh8tuoUBe85YkiPVU47UJ6', {
                "id": 1,
                "jsonrpc": "2.0",
                "params": [publicKey, "latest"],
                "method": "eth_getBalance"
            })

            const hexBalance = response.data.result;

            const decimalBalance = BigInt(hexBalance).toString(10);

            return res.status(200).json({network: network,
                message: "Balance fetched successfully",
                balance: decimalBalance,
            });

        }
        else {
            res.status(401).json({
                message: "We do not have information for this coin"
            })
        }
    } catch (error) {
        console.log("There was some error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
