import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { toast } from 'sonner';
import CommentSection from './CommentSection';

interface Post {
  postId: number;
  author: string;
  content: string;
  likes: number;
  authorUsername: string;
}

interface PostCardProps {
  post: Post;
  onUpdate: () => void;
}

const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const { contract, account } = useWeb3();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, [post.postId, account]);

  const checkIfLiked = async () => {
    if (!contract || !account) return;
    
    try {
      const liked = await contract.isPostLikedByUser(post.postId, account);
      setIsLiked(liked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleLike = async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const tx = isLiked 
        ? await contract.unlikePost(post.postId)
        : await contract.likePost(post.postId);
      
      await tx.wait();
      
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      toast.success(isLiked ? 'Post unliked' : 'Post liked!');
      onUpdate();
    } catch (error: any) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300 animate-slide-up">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {post.authorUsername.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">@{post.authorUsername}</p>
            <p className="text-xs text-muted-foreground">
              {post.author.slice(0, 6)}...{post.author.slice(-4)}
            </p>
          </div>
        </div>
        
        <p className="text-foreground leading-relaxed">{post.content}</p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={loading}
          className={`gap-2 ${isLiked ? 'text-destructive' : 'text-muted-foreground'} hover:text-destructive`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          )}
          <span className="text-sm">{likesCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="gap-2 text-muted-foreground hover:text-primary"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">Comments</span>
        </Button>
      </div>

      {showComments && (
        <CommentSection postId={post.postId} onCommentAdded={onUpdate} />
      )}
    </div>
  );
};

export default PostCard;
