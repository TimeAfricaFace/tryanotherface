import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../lib/supabase';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const signUpSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  displayName: yup.string().required('Display name is required'),
});

const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = mode === 'signup' ? signUpSchema : signInSchema;
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              username: data.username,
              display_name: data.displayName,
            },
          },
        });

        if (error) throw error;
        
        // Show success message for email confirmation
        alert('Please check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/file_000000009c24624693dc549194d4cb7a.png" 
                alt="Try Another Face" 
                className="h-20 w-auto mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {mode === 'signup' ? 'Join TAF' : 'Welcome Back'}
            </h1>
            <p className="text-white/80">
              {mode === 'signup' 
                ? 'Begin your spiritual awakening journey' 
                : 'Continue your journey of self-discovery'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleEmailAuth)} className="space-y-6">
            {mode === 'signup' && (
              <>
                <Input
                  label="Username"
                  {...register('username')}
                  error={errors.username?.message}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                
                <Input
                  label="Display Name"
                  {...register('displayName')}
                  error={errors.displayName?.message}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </>
            )}

            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full bg-white text-gray-900 hover:bg-gray-100"
            >
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20" />
            <span className="px-4 text-white/60 text-sm">or</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          <Button
            onClick={handleGoogleAuth}
            loading={loading}
            className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
            variant="secondary"
          >
            Continue with Google
          </Button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
              className="text-white/80 hover:text-white transition-colors"
            >
              {mode === 'signup' 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default AuthForm;
