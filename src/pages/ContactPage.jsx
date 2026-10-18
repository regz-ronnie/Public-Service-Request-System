import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock3 } from 'lucide-react';

const contacts = [
  { icon: Phone, title: 'Call us', value: '+254 20 000 0000' },
  { icon: Mail, title: 'Email', value: 'support@publicservice.go.ke' },
  { icon: MapPin, title: 'Head office', value: 'Nairobi, Kenya' },
  { icon: Clock3, title: 'Office hours', value: 'Mon - Fri: 8:00 AM - 5:00 PM' },
];

export default function ContactPage() {
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
            <Link to="/services" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Explore services
            </Link>
            <a
              href="https://public-service-request-system-backe-khaki.vercel.app/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

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
    </div>
  );
}
