import React, { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";


function Post({ post }) {
  const { contract, account } = useContext(Web3Context);

  return (
    <div className="bg-background-light rounded-xl shadow-lg p-6 mb-6 border border-background-dark transition hover:shadow-xl">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold mr-3">
          {post.authorUsername[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-text-dark">{post.authorUsername}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-text-dark mb-4">{post[2]}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mb-2">
        <LikeButton
          postId={post.postId}
          contract={contract}
          account={account}
          initialLikes={post.likes}
        />
        <CommentSection postId={post.postId} contract={contract} />
      </div>
    </div>
  );
}

export default Post;
