import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock3, Menu, X } from 'lucide-react';
import { ADMIN_BASE_URL } from '../lib/api';
import Footer from '../components/Footer';

const contacts = [
  { icon: Phone, title: 'Call us', value: '+254 20 000 0000' },
  { icon: Mail, title: 'Email', value: 'support@publicservice.go.ke' },
  { icon: MapPin, title: 'Head office', value: 'Nairobi, Kenya' },
  { icon: Clock3, title: 'Office hours', value: 'Mon - Fri: 8:00 AM - 5:00 PM' },
];

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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

          <div className="flex items-center gap-3">
            <Link to="/services" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block">
              Explore services
            </Link>
            <a
              href={`${ADMIN_BASE_URL}/login/?next=/admin/`}
              className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 sm:block"
            >
              Admin
            </a>
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
            <Link to="/services" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Explore services</Link>
            <a href={`${ADMIN_BASE_URL}/login/?next=/admin/`} className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Admin</a>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Contact us</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">Need help with a service request?</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Reach out to the support desk for guidance on application status, service access, or government assistance.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map(({ icon: Icon, title, value }) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-black text-slate-900">{title}</h2>
              <p className="mt-3 text-slate-600">{value}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
