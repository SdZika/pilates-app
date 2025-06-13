'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  isAdmin: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserAndRole = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Profile fetch failed');
        const profile = await res.json();
        setIsAdmin(profile?.role === 'admin');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      fetchUserAndRole();
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const refreshUser = fetchUserAndRole;

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
