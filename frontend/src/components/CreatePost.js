import React, { useState, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const { contract } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && content.trim()) {
      setIsLoading(true);
      try {
        let txn = await contract.createPost(content);
        await txn.wait(1);
        setContent("");
        onPostCreated();
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mb-6">
      {isLoading && <LoadingOverlay />}

      <form onSubmit={handleSubmit}>
        <textarea
          className="bg-background-light border border-accent rounded-lg p-3 w-full mb-4 text-text-dark placeholder:text-text-default focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          placeholder="Share your thoughts…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-background-dark font-semibold py-2 px-5 rounded-lg transition-colors duration-200 shadow-md"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
