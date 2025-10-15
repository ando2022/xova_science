import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Sparkles, Mail, Lock } from 'lucide-react';
import { login, sendMagicLink } from '../lib/mock-auth';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Welcome back!');
        onLoginSuccess();
        // Navigation will happen automatically via auth state change
      } else {
        const errorMsg = result.error || 'Login failed';
        setError(errorMsg);
        setIsLoading(false);
        
        // Show helpful hint in console
        if (errorMsg.includes('Database') || errorMsg.includes('table')) {
          console.error('❌ Database setup required. See DATABASE_SETUP_GUIDE.md');
        }
      }
    } catch (err: any) {
      const errorMsg = err?.message || 'An error occurred. Please try again.';
      setError(errorMsg);
      setIsLoading(false);
      console.error('Login error:', err);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await sendMagicLink(email);
      
      if (result.success) {
        // In mock mode, auto-login
        const loginResult = await login(email, 'mock-password');
        if (loginResult.success) {
          toast.success('Logged in successfully!');
          onLoginSuccess();
        } else {
          setMagicLinkSent(true);
          toast.success('Magic link sent! Check your email.');
        }
      } else {
        setError(result.error || 'Failed to send magic link');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-primary/3 via-xova-accent/3 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--xova-primary)/0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(var(--xova-secondary)/0.15),transparent_50%)]"></div>
      <Card className="w-full max-w-md p-8 relative shadow-xl border-xova-primary/20">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-xova-primary to-xova-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-xova-primary/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl text-center mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">Log in to your XOVA account</p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Tabs defaultValue="magic-link" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="magic-link">
              <Mail className="w-4 h-4 mr-2" />
              Magic Link
            </TabsTrigger>
            <TabsTrigger value="password">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="magic-link">
            {magicLinkSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-xova-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-xova-success" />
                </div>
                <h3 className="text-lg mb-2">Check Your Email</h3>
                <p className="text-muted-foreground mb-4">
                  We've sent a magic link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the link in your email to log in. It may take a few minutes to arrive.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setMagicLinkSent(false)}
                  className="w-full"
                >
                  Send Another Link
                </Button>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <Label htmlFor="magic-email">Email</Label>
                  <Input
                    id="magic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you a secure link to log in without a password
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Magic Link'}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-xova-primary to-xova-secondary hover:from-xova-primary-dark hover:to-xova-secondary shadow-lg shadow-xova-primary/25"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-xova-primary hover:text-xova-primary-dark font-medium"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </button>
        </div>
      </Card>
    </div>
  );
}
