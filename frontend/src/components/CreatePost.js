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
        <div>
            {isLoading && <LoadingOverlay />}
            <form onSubmit={handleSubmit} className='mb-6'>
                <textarea
                    className='bg-background-default border border-background-dark rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-text-light'
                    placeholder="Share your thoughts…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows='3'
                />
                <button
                    type='submit'
                    className='bg-primary text-background-dark font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out'
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;