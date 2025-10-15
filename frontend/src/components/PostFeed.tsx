import { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import PostCard from './PostCard';

interface Post {
  postId: number;
  author: string;
  content: string;
  likes: number;
  authorUsername: string;
}

const PostFeed = () => {
  const { contract } = useWeb3();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contract) {
      fetchPosts();
    }
  }, [contract]);

  const fetchPosts = async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const postCount = await contract.postCount();
      const postsData: Post[] = [];

      for (let i = 1; i <= Number(postCount); i++) {
        const post = await contract.posts(i);
        const username = await contract.getPostAuthorUsername(i);
        
        postsData.push({
          postId: Number(post.postId),
          author: post.author,
          content: post.content,
          likes: Number(post.likes),
          authorUsername: username,
        });
      }

      setPosts(postsData.reverse());
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Feed</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchPosts}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl shadow-soft border border-border">
          <p className="text-muted-foreground">No posts yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} onUpdate={fetchPosts} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
