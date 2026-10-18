import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle, Shield, Menu, X } from 'lucide-react';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      const userType = response.user_type || localStorage.getItem('user_type');
      
      if (userType !== 'admin') {
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }
      
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Public Service Request System logo"
              className="h-10 w-10 rounded-xl border border-blue-400 bg-white shadow-md shadow-blue-500/20"
            />
            <div>
              <div className="text-base font-black text-white">Public Service Request System</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Admin Portal</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/login" className="transition hover:text-white">Citizen Login</Link>
          </nav>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-300 sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="border-t border-slate-700 bg-slate-900 px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/login" className="text-sm font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>Citizen Login</Link>
          </div>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-slate-800">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Admin Login</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Sign in with your admin credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In as Admin'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-slate-400">
              Need citizen access?{' '}
              <Link to="/login" className="text-cyan-400 hover:underline font-medium">
                Citizen Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
