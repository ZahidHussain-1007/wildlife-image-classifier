import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {user ? (
        <div className="space-y-2">
          <div>
            <strong>Username: </strong>
            <span>{user.username}</span>
          </div>
          <div>
            <strong>Email: </strong>
            <span>{user.email}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p>You are not logged in.</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
