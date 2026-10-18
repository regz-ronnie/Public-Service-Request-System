import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Building2, FileText, Globe, Landmark, Search, ShieldCheck } from 'lucide-react';
import api from '../lib/api';
import { serviceCatalog as initialCatalog } from './Home';

export default function ServicesPage() {
  const [services, setServices] = useState(initialCatalog);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/requests/categories/');
        const categories = response.data || [];
        setServices(categories.map((category) => ({
          id: String(category.id),
          icon: [Building2, Landmark, FileText, BellRing, Globe, ShieldCheck][Math.abs(Number(category.id)) % 6],
          title: category.name,
          category: category.name,
          summary: category.description || 'Request this government service through the public portal.',
          processingTime: '2 to 5 working days',
          fee: 'KSh 0',
          status: 'Available',
          description: category.description || 'Submit and track your request for this public service with full visibility from intake to resolution.',
          requirements: ['Citizen identification', 'Issue details', 'Any supporting documents if required'],
        })));
      } catch (error) {
        console.error('Failed to load services:', error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

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
            <Link to="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Home
            </Link>
            <a
              href="https://public-service-request-system-backe-khaki.vercel.app/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Admin
            </a>
            <Link to="/login" className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800">
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">All services</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Explore government services</h1>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              readOnly
              value="Search services"
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-500 outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <service.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                  {service.category}
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>

              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Fee</span>
                  <span className="font-bold text-slate-900">{service.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Processing</span>
                  <span className="font-medium">{service.processingTime}</span>
                </div>
              </div>

              <Link
                to={`/services/${service.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                View service
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
