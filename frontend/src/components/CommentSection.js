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
    <div className="flex flex-col w-full mt-2">
      <button
        onClick={() => setShowInput(!showInput)}
        className="flex items-center gap-2 text-primary font-medium hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#12C781"
        >
          <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
        </svg>
        Comment
      </button>

      {showInput && (
        <div className="flex mb-2 mt-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border border-neutral rounded-l-lg bg-background-light text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-primary hover:bg-secondary text-white px-4 rounded-r-lg transition-colors duration-200"
          >
            Post
          </button>
        </div>
      )}

      {comments.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {(expanded ? comments : comments.slice(0, 3)).map((c) => (
            <div
              key={c.commentId}
              className="border-t border-accent pt-1"
            >
              <span className="font-semibold text-primary">{c.authorUsername}:</span>{" "}
              <span className="text-text-default">{c.content}</span>{" "}
            </div>
          ))}

          {comments.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-accent text-sm mt-1 self-start hover:underline"
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
