// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config(); // Load environment variables from .env
const axios = require('axios');


const app = express();
app.use(express.json())
const PORT = 3000;
app.use(cors()); // Enable CORS for all routes
const mongodburi = process.env.mongoose_uri

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
    const { inputValue } = req.body;
    // try{
    //     const 
    // }
})

app.post('/getBalance', async (req, res) => {
    const { publicKey, network } = req.body;
    var response;
    try {
        if (network === "solana") {
            response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/Ti-xz4F2isOh8tuoUBe85YkiPVU47UJ6', {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [
                    "768wBd9yHNLf5eKeA4wFA8cu9V6JSruW6i3fyMsjyWRv"
                ]
            })

            // console.log("This is the response: ", response.data);

        }
        else if(network === "ethereum"){
            response = await axios.post('https://eth-mainnet.g.alchemy.com/v2/Ti-xz4F2isOh8tuoUBe85YkiPVU47UJ6',{

            });
        }

        // console.log("This is the data from solana: ", response.data);

        const data = response.data;

        res.status(200).json({
            message: "Balance fetched successfully",
            data
        })

    } catch (error) {
        console.log("There was some error", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
