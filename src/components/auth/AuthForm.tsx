
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Heart, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import QuoteDisplay from '@/components/common/Quote';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
      } else {
        await register(name, email, password);
        toast({
          title: "Registration successful!",
          description: "Your account has been created.",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Authentication error",
        description: error instanceof Error ? error.message : "Failed to authenticate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
      <div className="hidden md:flex flex-col justify-center p-8 bg-romance-lavender/20 rounded-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-heart animate-heart-beat" fill="#FFCCD5" />
            <h2 className="text-2xl font-cursive text-heart">HeartSync</h2>
          </div>
          <h3 className="text-3xl font-serif mb-4">
            {mode === 'login' 
              ? 'Welcome Back to Your Love Story' 
              : 'Begin Your Love Journey'}
          </h3>
          <p className="text-muted-foreground">
            {mode === 'login'
              ? 'Reconnect with your shared moments and continue writing your story together.'
              : 'Create an account to start documenting and enhancing your relationship in a meaningful way.'}
          </p>
        </div>

        <div className="mt-auto">
          <QuoteDisplay className="mb-6" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-4 h-4 text-heart" />
            <p className="text-sm">Celebrate your unique connection</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-4 md:p-8">
        <div className="md:hidden mb-8 text-center">
          <Heart className="w-10 h-10 text-heart animate-heart-beat mx-auto mb-2" fill="#FFCCD5" />
          <h2 className="text-2xl font-cursive text-heart">HeartSync</h2>
          <h3 className="text-2xl font-serif mt-4">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-border rounded-lg focus:ring-2 focus:ring-heart/20 focus:border-heart outline-none transition-all"
                  placeholder="Enter your name"
                  required={mode === 'register'}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border border-border rounded-lg focus:ring-2 focus:ring-heart/20 focus:border-heart outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border border-border rounded-lg focus:ring-2 focus:ring-heart/20 focus:border-heart outline-none transition-all"
                placeholder={mode === 'login' ? "Enter your password" : "Create a password"}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-heart to-romance-purple text-white font-medium rounded-lg shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-heart hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-heart hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
