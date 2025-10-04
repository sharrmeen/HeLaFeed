import React, { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import banner from "../images/image.gif";
import helaLogo from "../assets/HeLaLogoIcon.svg";

function ConnectWallet() {
    const { connectWallet } = useContext(Web3Context);

    return (
        <div className="min-h-screen flex flex-col bg-background-default">
            <header className="bg-background-dark shadow-md ">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <img src={helaLogo} alt="Hela Logo" className="w-9 h-9" />
                <h1 className="text-3xl font-semibold text-primary">HelaFeed</h1>
                </div>
                    <button
                        onClick={connectWallet}
                        className="bg-primary text-background-dark font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out"
                    >
                        Connect MetaMask
                    </button>
                </div>
            </header>
            <main className="flex-grow container my-[-40px] mx-auto px-4 py-16 flex items-center justify-between">
                <div className="max-w-xl">
                    <h2 className="text-7xl font-bold text-primary mb-4">
                        Welcome to HelaFeed
                    </h2>
                    <p className="text-xl text-text-light mb-8">
                    Decentralized voices, shared without barriers.
                    </p>
                    <button
                        onClick={connectWallet}
                        className="bg-primary text-background-dark font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out text-lg"
                    >
                        Get Started
                    </button>
                </div>
                <img
                    src={banner}
                    className=" mr-12 "
                    width={600}
                    height={300}
                    alt="HeleFeed banner"
                />
                
                
               
            </main>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#12c781" fill-opacity="1" d="M0,64L34.3,74.7C68.6,85,137,107,206,133.3C274.3,160,343,192,411,197.3C480,203,549,181,617,165.3C685.7,149,754,139,823,128C891.4,117,960,107,1029,133.3C1097.1,160,1166,224,1234,229.3C1302.9,235,1371,181,1406,154.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </div>
    );
}

export default ConnectWallet;
