import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useUserStore from '../store/userStore'
// import jwtDecode from "jwt-decode";

const Signup = () => {
    const { setUser } = useUserStore();

    const navigate = useNavigate();
    const backurl = import.meta.env.VITE_BACKURL;


    const login = useGoogleLogin({
        onSuccess: async (response) => {
            console.log("Google login successful", response);

            // Ensure response.credential exists (for implicit flow)

            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                });
                const userCredentials = res.data;
                console.log("User Credentials: ", res.data);


                const loginResponse = await axios.post(`${backurl}/signup`, {
                    image: userCredentials.picture,
                    name: userCredentials.name,
                    email: userCredentials.email
                })

                if (loginResponse.data.message === "User already exist with this email") {
                    localStorage.setItem('loggedIn', true);
                    setUser(res.data);
                    navigate('/unlockPage');
                } else {
                    setUser(res.data);
                    localStorage.setItem('loggedIn', true);

                    navigate('/createPassword')
                }

            } catch (error) {
                console.log("There was an error while getting data: ", error);
            }

        },

        // Change flow to 'implicit' for client-side apps
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 pb-12 rounded-xl shadow-lg w-96">
                <div className="flex justify-center items-center mb-6">
                    <img
                        src="cropped_rhino.png"
                        alt="Logo"
                        className="w-72 h-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6 text-red-700">RHINO Wallet</h2>

                {/* Use a standard button to trigger login */}
                <div className="flex justify-center w-full items-center">
                    <button
                        onClick={login}  // This triggers the Google Login when clicked
                        className="w-full py-2 px-4 text-black font-semibold rounded-full border border-black focus:outline-none flex items-center justify-center"
                    >
                        <img
                            src="google_logo.png" // Google logo PNG
                            alt="Google logo"
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
