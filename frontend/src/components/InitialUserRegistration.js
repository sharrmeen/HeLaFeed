import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function InitialUserRegistration({ onRegistrationComplete }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { contract, account } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (contract && account) {
        const user = await contract.users(account);
        if (user.username !== "") {
          onRegistrationComplete();
        }
      }
    };
    checkRegistration();
  }, [contract, account, onRegistrationComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      setIsLoading(true);
      try {
        const txn = await contract.createUser(username, bio);
        await txn.wait(1);
        onRegistrationComplete();
      } catch (error) {
        console.error("User registration failed:", error);
        alert("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {isLoading && <LoadingOverlay />}
      <div className="w-full max-w-md bg-background-light rounded-xl border-2 border-primary shadow-2xl p-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Finish Setting Up Your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-text-dark text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
              className="sleek-input w-full border border-primary rounded-md p-3 focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block text-text-dark text-sm font-medium mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              placeholder="Tell us about yourself"
              rows="4"
              className="sleek-input w-full border border-primary rounded-md p-3 focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-background-dark font-semibold py-2 rounded-lg hover:opacity-90 transition duration-150"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default InitialUserRegistration;
