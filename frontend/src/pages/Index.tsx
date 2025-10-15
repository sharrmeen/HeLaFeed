import WalletConnect from '@/components/WalletConnect';
import UserRegistration from '@/components/UserRegistration';
import CreatePost from '@/components/CreatePost';
import PostFeed from '@/components/PostFeed';
import { useWeb3 } from '@/contexts/Web3Context';
import logo from '../../public/logo.png';
import { useState } from 'react';

const Index = () => {
  const { account, isRegistered } = useWeb3();
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full  flex items-center justify-center shadow-glow">
            <img src={logo} className="w-9 h-5" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HeLaFeed
            </h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {!account ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-secondary flex items-center justify-center shadow-glow animate-glow">
              <img src={logo} className="w-10 h-8" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Welcome to HeLaFeed
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              A decentralized social network on the Hela blockchain. Connect your wallet to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6" key={refreshKey}>
            <UserRegistration />
            {isRegistered && (
              <>
                <CreatePost onPostCreated={handlePostCreated} />
                <PostFeed />
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Hela Blockchain • Decentralized Social Network
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
