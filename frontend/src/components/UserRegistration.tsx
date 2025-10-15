import { useState } from 'react';
import { User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWeb3 } from '@/contexts/Web3Context';
import logo from '../../public/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const UserRegistration = () => {
  const { isRegistered, registerUser } = useWeb3();
  const [open, setOpen] = useState(!isRegistered);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim()) return;

    setLoading(true);
    await registerUser(username, bio);
    setLoading(false);
    setOpen(false);
  };

  if (isRegistered) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
          <img src={logo} className="w-9 h-5" />
            Welcome to HeLaFeed
          </DialogTitle>
          <DialogDescription>
            Create your profile to start sharing and connecting on the blockchain
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Username</label>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Bio (Optional)</label>
            <Textarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-background resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={handleRegister}
            disabled={!username.trim() || loading}
            className="w-full shadow-glow"
          >
            <User className="w-4 h-4 mr-2" />
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistration;
