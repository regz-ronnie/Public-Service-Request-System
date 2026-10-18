import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_BASE_URL } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle, Menu, X } from 'lucide-react';
import Footer from '../components/Footer';

const Login = () => {
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
      navigate(userType === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Public Service Request System logo"
              className="h-10 w-10 rounded-xl border border-blue-200 bg-white shadow-md shadow-blue-100"
            />
            <div>
              <div className="text-base font-black text-slate-900">Public Service Request System</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Citizen Portal</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <Link to="/" className="transition hover:text-blue-700">Home</Link>
            <Link to="/services" className="transition hover:text-blue-700">Services</Link>
            <Link to="/about" className="transition hover:text-blue-700">About</Link>
            <Link to="/contact" className="transition hover:text-blue-700">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href={`${ADMIN_BASE_URL}/login/?next=/admin/`} className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 sm:block">
              Admin Login
            </a>
            <Link to="/register" className="hidden rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 sm:block">
              Register
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <a href={`${ADMIN_BASE_URL}/login/?next=/admin/`} className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Admin Login</a>
            <Link to="/register" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Register</Link>
          </div>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
