import { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeb3 } from '@/contexts/Web3Context';
import { toast } from 'sonner';

interface Comment {
  commentId: number;
  authorUsername: string;
  content: string;
}

interface CommentSectionProps {
  postId: number;
  onCommentAdded: () => void;
}

const CommentSection = ({ postId, onCommentAdded }: CommentSectionProps) => {
  const { contract } = useWeb3();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingComments, setFetchingComments] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    if (!contract) return;

    try {
      const commentsData = await contract.getCommentsForPost(postId);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setFetchingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!contract || !newComment.trim()) return;

    setLoading(true);
    try {
      const tx = await contract.commentOnPost(postId, newComment);
      await tx.wait();
      
      toast.success('Comment added!');
      setNewComment('');
      await fetchComments();
      onCommentAdded();
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-background flex-1"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim() || loading}
          size="sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>

      {fetchingComments ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <div
              key={comment.commentId}
              className="bg-muted/50 rounded-lg p-3 animate-fade-in"
            >
              <p className="text-sm font-semibold text-foreground mb-1">
                @{comment.authorUsername}
              </p>
              <p className="text-sm text-muted-foreground">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
