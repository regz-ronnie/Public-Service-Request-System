import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3, FileText, ShieldCheck, Tag } from 'lucide-react';
import api from '../lib/api';
import { serviceCatalog as importedCatalog } from './Home';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await api.get('/requests/categories/');
        const categories = response.data || [];
        const found = categories.find((item) => String(item.id) === String(slug)) || categories[0] || null;

        if (found) {
          setService({
            id: String(found.id),
            title: found.name,
            category: found.name,
            summary: found.description || 'Request this government service through the public portal.',
            description: found.description || 'Submit and track your request for this public service with full visibility from intake to resolution.',
            processingTime: '2 to 5 working days',
            fee: 'KSh 0',
            requirements: ['Citizen identification', 'Issue details', 'Any supporting documents if required'],
            status: 'Available',
            icon: ShieldCheck,
          });
          return;
        }
      } catch (error) {
        console.error('Failed to load service details:', error);
      }

      const fallbackService = (importedCatalog || []).find((item) => String(item.id) === String(slug)) || (importedCatalog || [])[0] || null;
      setService(fallbackService);
    };

    loadService();
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading service details...</p>
        </div>
      </div>
    );
  }

  const Icon = service.icon || ShieldCheck;

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

          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">{service.category}</div>
                <h1 className="mt-2 text-3xl font-black">{service.title}</h1>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-lg leading-8 text-slate-600">{service.description}</p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <FileText className="h-4 w-4" />
                  Service overview
                </div>
                <p className="mt-4 text-slate-700">{service.summary}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-black text-slate-900">Requirements</h2>
                <ul className="mt-4 space-y-3">
                  {service.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">✓</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <Clock3 className="h-4 w-4" />
                  Timeline
                </div>
                <p className="mt-4 text-2xl font-black text-slate-900">{service.processingTime}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <Tag className="h-4 w-4" />
                  Service fee
                </div>
                <p className="mt-4 text-2xl font-black text-slate-900">{service.fee}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <ShieldCheck className="h-4 w-4" />
                  Request status
                </div>
                <p className="mt-4 text-lg font-bold text-slate-900">{service.status}</p>
              </div>

              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800"
              >
                Start request
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
