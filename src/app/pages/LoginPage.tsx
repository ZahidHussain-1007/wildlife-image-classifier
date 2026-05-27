import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

export function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, loading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Welcome to Animal Predictor</CardTitle>
          <CardDescription className="text-center">
            Sign in with Google to save your wildlife predictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleLoginButton redirectPath={from} />
        </CardContent>
      </Card>
    </div>
  );
}
