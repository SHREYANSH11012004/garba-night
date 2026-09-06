"use client";
import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import Navbar from '@/app/components/Navbar';

interface Match {
  id: string;
  displayName: string;
  department: string;
  photoUrl?: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const response = await fetchApi('/matches');
        if (response?.data) {
          setMatches(response.data);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load matches');
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-zinc-950 px-4 py-8 sm:px-6 md:py-12 overflow-hidden">
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-3xl font-bold text-white">Your Matches</h1>
          <p className="mt-2 text-sm text-zinc-500">People who accepted each other.</p>
        </div>

      {/* Matches Grid */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        
        {loading && (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="col-span-full flex justify-center py-12 text-red-500">
            {error}
          </div>
        )}

        {!loading && matches.length === 0 && !error && (
          <div className="col-span-full bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl p-4 flex gap-4 items-center justify-center min-h-[100px]">
            <p className="text-zinc-500 text-sm">Keep discovering to find more partners.</p>
          </div>
        )}

        {!loading && matches.map((match) => (
          <div key={match.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center hover:bg-zinc-800 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-zinc-800 bg-cover bg-center overflow-hidden shrink-0" style={{ backgroundImage: `url('${match.photoUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'}')` }}>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">{match.displayName}</h3>
              <p className="text-zinc-400 text-sm">{match.department}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </button>
            </div>
          </div>
        ))}

      </div>
      </main>
    </>
  );
}
