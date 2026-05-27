import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { LayoutDashboard, Settings, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const userName =
    user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email ?? 'User';
  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-xl">
            Animal Predictor
          </Link>
          <nav className="flex gap-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant={isActive('/about') ? 'default' : 'ghost'}
                size="sm"
              >
                About
              </Button>
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button
                  variant={isActive('/dashboard') ? 'default' : 'ghost'}
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className="h-6 w-6 rounded-full" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="max-w-32 truncate text-sm font-medium">{userName}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    Toggle theme
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => void logout()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login / Sign Up</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
