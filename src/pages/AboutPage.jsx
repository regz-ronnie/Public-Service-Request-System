import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Building2, FileText, ShieldCheck, Menu, X } from 'lucide-react';
import { ADMIN_BASE_URL } from '../lib/api';

const pillars = [
  {
    icon: Building2,
    title: 'Transparent service delivery',
    text: 'Residents can follow the status of requests from submission to resolution without uncertainty.',
  },
  {
    icon: FileText,
    title: 'Digital service access',
    text: 'Applications, complaints, and updates are handled through one organized citizen portal.',
  },
  {
    icon: ShieldCheck,
    title: 'Public accountability',
    text: 'Every matter is assigned to the right team, with clear timelines and service standards.',
  },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 text-lg font-bold text-white">
              P
            </div>
            <div>
              <div className="text-base font-black text-slate-900">Public Service Request System</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Citizen Portal</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/services" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block">
              Browse services
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
            <Link to="/services" className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Browse services</Link>
            <a href={`${ADMIN_BASE_URL}/login/?next=/admin/`} className="text-sm font-medium text-slate-600" onClick={() => setMobileMenuOpen(false)}>Admin</a>
          </div>
        </div>
      )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">About the portal</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">Built to make public services easier to access.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            The Public Service Request System supports the relationship between citizens and government offices by simplifying how service requests are submitted, reviewed, and resolved.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-900">{title}</h2>
              <p className="mt-3 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-blue-100 bg-blue-50 p-8">
          <div className="flex items-center gap-2 text-blue-700">
            <BadgeCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">Mission</span>
          </div>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            To deliver responsive, accessible, and accountable services that help communities resolve issues quickly and keep public institutions responsive to local needs.
          </p>
        </div>
      </main>
    </div>
  );
}
