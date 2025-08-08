"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TestAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<{ type?: string; data?: unknown; error?: unknown } | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const testSignUp = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setResult({ type: 'signup', data, error });
    } catch (err) {
      setResult({ type: 'signup', error: err });
    }
    setLoading(false);
  };

  const testSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setResult({ type: 'signin', data, error });
    } catch (err) {
      setResult({ type: 'signin', error: err });
    }
    setLoading(false);
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      setResult({ type: 'session', data, error });
    } catch (err) {
      setResult({ type: 'session', error: err });
    }
    setLoading(false);
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getUser();
      setResult({ type: 'user', data, error });
    } catch (err) {
      setResult({ type: 'user', error: err });
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      setResult({ type: 'signout', error });
    } catch (err) {
      setResult({ type: 'signout', error: err });
    }
    setLoading(false);
  };

  const checkProfiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email);
      setResult({ type: 'profiles', data, error });
    } catch (err) {
      setResult({ type: 'profiles', error: err });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-8">Supabase Auth Test</h1>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="test@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="password123"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={testSignUp}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Sign Up
          </button>
          
          <button
            onClick={testSignIn}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Sign In
          </button>
          
          <button
            onClick={checkSession}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            Check Session
          </button>
          
          <button
            onClick={checkUser}
            disabled={loading}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
          >
            Check User
          </button>
          
          <button
            onClick={checkProfiles}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Check Profiles Table
          </button>
          
          <button
            onClick={signOut}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Sign Out
          </button>
        </div>

        {result && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-bold mb-2">Result ({result.type}):</h2>
            <pre className="overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}