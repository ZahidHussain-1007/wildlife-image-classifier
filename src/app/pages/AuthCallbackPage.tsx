import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finishing sign in...');

  useEffect(() => {
    const finishSignIn = async () => {
      const redirectPath = localStorage.getItem('authRedirectPath') ?? '/';
      const code = new URLSearchParams(window.location.search).get('code');
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session && code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setMessage('Sign in failed. Please try again.');
          navigate('/login', { replace: true });
          return;
        }
      }

      localStorage.removeItem('authRedirectPath');
      navigate(redirectPath, { replace: true });
    };

    finishSignIn();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-muted-foreground">
      {message}
    </div>
  );
}
