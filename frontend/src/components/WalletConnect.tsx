import { Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';

const WalletConnect = () => {
  const { account, username, connectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-3">
      {account ? (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-card border border-border shadow-soft">
          <div className="flex flex-col items-end">
            {username && (
              <span className="text-sm font-semibold text-foreground">@{username}</span>
            )}
            <span className="text-xs text-muted-foreground">{formatAddress(account)}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
        </div>
      ) : (
        <Button onClick={connectWallet} className="rounded-full shadow-glow">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
