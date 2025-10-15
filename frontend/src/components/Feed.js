import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import CreatePost from "./CreatePost";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const { contract } = useContext(Web3Context);

  const fetchPosts = async () => {
    if (contract) {
      try {
        const postCount = Number(await contract.postCount());
        const fetchedPosts = [];
        for (let i = postCount; i > Math.max(0, postCount - 10); i--) {
          const post = await contract.posts(i);
          const authorUsername = await contract.getPostAuthorUsername(i);
          const likes = Number(await contract.getPostLikes(i)); 
          fetchedPosts.push({ ...post, postId: i, authorUsername,likes });
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [contract]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <CreatePost onPostCreated={fetchPosts} />
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-text-default">
            No posts yet. Be the first to share something!
          </p>
        ) : (
          posts.map((post) => <Post key={post.postId.toString()} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Feed;
