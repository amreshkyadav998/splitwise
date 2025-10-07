import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Input, Label } from '../components/Input';
import Button from '../components/Button';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form;
      const { data } = await api.post(endpoint, payload);
      setToken(data.token); setUser(data.user); navigate('/');
    } finally { setLoading(false); }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader title={mode === 'login' ? 'Log in' : 'Sign up'} subtitle={mode === 'login' ? 'Welcome back' : 'Create a new account'} />
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button type="submit" disabled={loading}>{loading ? 'Please wait…' : (mode === 'login' ? 'Log in' : 'Sign up')}</Button>
            <button type="button" className="text-sm text-blue-600 hover:underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Create an account' : 'Have an account? Log in'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


