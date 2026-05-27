import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function ProfilePage() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? 'Google User';
  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          {avatarUrl && <img src={avatarUrl} alt={name} className="h-16 w-16 rounded-full" />}
          <div className="space-y-1">
            <p className="text-lg font-medium">{name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
