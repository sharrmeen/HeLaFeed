import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useWeb3 } from '@/contexts/Web3Context';
import { toast } from 'sonner';

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { contract, isRegistered } = useWeb3();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!contract || !content.trim()) return;

    setLoading(true);
    try {
      const tx = await contract.createPost(content);
      await tx.wait();
      
      toast.success('Post created successfully!');
      setContent('');
      onPostCreated();
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isRegistered) return null;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border animate-fade-in">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-background border-border resize-none min-h-[100px] mb-4"
        disabled={loading}
      />
      
      <div className="flex justify-end">
        <Button
          onClick={handleCreatePost}
          disabled={!content.trim() || loading}
          className="shadow-soft"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Post
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
