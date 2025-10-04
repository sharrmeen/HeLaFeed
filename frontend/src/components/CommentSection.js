import React, { useState, useEffect } from "react";

function CommentSection({ postId, contract }) {
    const [showInput, setShowInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const fetchComments = async () => {
        if (contract) {
            try {
                const postComments = await contract.getCommentsForPost(postId);
                setComments(postComments);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCommentSubmit = async () => {
        if (!contract || !commentText.trim()) return;
        try {
            await contract.commentOnPost(postId, commentText);
            setCommentText("");
            setShowInput(false);
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [contract, postId]);

    return (
        <div className="flex flex-col w-full">
            <button onClick={() => setShowInput(!showInput)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"/></svg>Comment</button>

            {showInput && (
                <div className="flex mb-2 mt-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 p-2 border rounded-l-lg"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-blue-500 text-white px-4 rounded-r-lg"
                    >
                        Post
                    </button>
                </div>
            )}

            {comments.length > 0 && (
                <div className="mt-2">
                    {(expanded ? comments : comments.slice(0, 3)).map((c) => (
                        <div key={c.commentId} className="border-t border-background-dark py-1">
                            <span className="font-semibold">{c.authorUsername}:</span>
                             {c.content}
                             <span className="text-xs text-gray-400">({formatTimeAgo(c.timestamp)})</span>
                        </div>
                    ))}
                    {comments.length > 3 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-500 text-sm mt-1"
                        >
                            {expanded ? "Show Less" : `View All (${comments.length})`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CommentSection;
