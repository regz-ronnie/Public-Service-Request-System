import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  FileText,
  Globe,
  Landmark,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

export let serviceCatalog = [];

const buildServiceFromCategory = (category) => ({
  id: String(category.id),
  icon: [Building2, Landmark, FileText, BellRing, Globe, ShieldCheck][Math.abs(Number(category.id)) % 6],
  title: category.name,
  category: category.name,
  summary: category.description || 'Request this government service through the public portal.',
  description: category.description || 'Submit and track your request for this public service with full visibility from intake to resolution.',
  processingTime: '2 to 5 working days',
  fee: 'KSh 0',
  requirements: ['Citizen identification', 'Issue details', 'Any supporting documents if required'],
  status: 'Available',
});

const categories = [
  { icon: Landmark, title: 'Municipal Services', text: 'Local government support and permits' },
  { icon: FileText, title: 'Business Licenses', text: 'Registration, renewals and updates' },
  { icon: MapPin, title: 'Property & Land', text: 'Records, zoning and valuation requests' },
  { icon: CalendarDays, title: 'Appointments', text: 'Book visits and service consultations' },
];

const stats = [
  { value: '2.4M+', label: 'Residents served' },
  { value: '98%', label: 'Satisfaction rate' },
  { value: '24/7', label: 'Digital access' },
  { value: '12 min', label: 'Average response' },
];

const steps = [
  {
    number: '01',
    title: 'Choose a service',
    text: 'Browse the most used government services and find the right category for your request.',
  },
  {
    number: '02',
    title: 'Submit details',
    text: 'Fill in required fields, upload documents, and review your application before sending.',
  },
  {
    number: '03',
    title: 'Track progress',
    text: 'Receive updates, monitor status changes, and get notifications when action is needed.',
  },
];

const quickLinks = ['Request services', 'Emergency updates', 'Public notices', 'Support center'];

const citizenIssues = [
  'Broken streetlight',
  'Water supply issue',
  'Garbage collection',
  'Blocked drain',
  'Road damage',
  'Public safety concern',
];

const dashboardRows = [
  { service: 'Building Permit', status: 'In review', officer: 'A. Johnson', date: '12 Oct 2026' },
  { service: 'Business License', status: 'Approved', officer: 'M. Okafor', date: '08 Oct 2026' },
  { service: 'Property Record', status: 'Pending', officer: 'S. Adeyemi', date: '06 Oct 2026' },
  { service: 'Complaint Report', status: 'Escalated', officer: 'K. Bello', date: '02 Oct 2026' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState(serviceCatalog);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/requests/categories/');
        const categories = response.data || [];
        const mappedServices = categories.map(buildServiceFromCategory);
        serviceCatalog = mappedServices;
        setServices(mappedServices);
      } catch (error) {
        console.error('Failed to load categories from the backend:', error);
        serviceCatalog = [];
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  const categoriesList = ['All', ...new Set(services.map((service) => service.category))];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const searchValue = searchTerm.trim().toLowerCase();
      const matchesSearch =
        searchValue === '' ||
        service.title.toLowerCase().includes(searchValue) ||
        service.summary.toLowerCase().includes(searchValue) ||
        service.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, services]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Public Service Request System logo"
              className="h-12 w-12 rounded-xl border border-blue-200 bg-white shadow-md shadow-blue-100"
            />
            <div>
              <div className="text-lg font-black tracking-tight text-slate-900">Public Service Request System</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Citizen Portal</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <Link to="/" className="transition hover:text-blue-700">Home</Link>
            <div className="group relative">
              <Link to="/services" className="flex items-center gap-1 transition hover:text-blue-700">
                Services <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="invisible absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {serviceCatalog.slice(0, 4).map((service) => (
                  <Link key={service.id} to={`/services/${service.id}`} className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-100">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="transition hover:text-blue-700">About</Link>
            <Link to="/dashboard" className="transition hover:text-blue-700">Dashboard</Link>
            <Link to="/contact" className="transition hover:text-blue-700">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:flex">
              <Search className="h-4 w-4" />
              Search
            </button>
            <Link
              to="/login"
              className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800"
            >
              Register
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(135deg,#eff6ff_0%,#f8fafc_45%,#ecfeff_100%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Trusted public service access
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Responsive services for every resident and business.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Submit service requests, monitor progress, and connect with the right government office through one secure portal designed for citizens and institutions.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800"
                >
                  Citizen submit request
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Browse services
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <div className="text-xl font-black text-slate-900">{item.value}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-12 h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl" />
              <div className="absolute -right-8 bottom-8 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Status center</p>
                      <h2 className="mt-2 text-2xl font-bold">Request overview</h2>
                    </div>
                    <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-300">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      'Building permit application',
                      'Water connection status',
                      'Property verification request',
                    ].map((item, index) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-200">
                            {index + 1}
                          </div>
                          <span className="text-sm text-slate-100">{item}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-sky-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-600 p-2 text-white">
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Digital access</span>
                    </div>
                    <div className="mt-3 text-2xl font-black text-slate-900">24/7</div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-600 p-2 text-white">
                        <CircleCheckBig className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Approved</span>
                    </div>
                    <div className="mt-3 text-2xl font-black text-slate-900">89%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Find a service</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">Search public services</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-[260px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search service, category or keyword"
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none ring-0 transition focus:border-blue-400 focus:bg-white"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                >
                  {categoriesList.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Common citizen requests</div>
            <div className="flex flex-wrap gap-3">
              {citizenIssues.map((issue) => (
                <span key={issue} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                  {issue}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Available services
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              One portal for essential public service requests.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.length > 0 ? (
              filteredServices.map(({ id, icon: Icon, title, category, summary, fee, processingTime, status }) => (
                <div key={id} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {status}
                    </span>
                  </div>

                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{category}</div>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Processing</span>
                      <span className="font-semibold text-slate-800">{processingTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fee</span>
                      <span className="font-semibold text-slate-800">{fee}</span>
                    </div>
                  </div>

                  <Link to={`/services/${id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-lg font-semibold text-slate-800">No services match your search.</p>
                <p className="mt-2 text-sm text-slate-600">Try a different keyword or select another category.</p>
              </div>
            )}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="dashboard" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                  Official dashboard
                </span>
                <h2 className="mt-4 text-3xl font-black sm:text-4xl">Operations overview</h2>
              </div>
              <div className="flex gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">This month</span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300">+18.4% efficiency</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-slate-300">Total requests</p>
                <p className="mt-4 text-4xl font-black text-white">18,456</p>
                <p className="mt-2 text-sm text-emerald-300">+1,245 vs last month</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-slate-300">Completed this week</p>
                <p className="mt-4 text-4xl font-black text-white">3,218</p>
                <p className="mt-2 text-sm text-blue-200">96% on target</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-slate-300">Pending review</p>
                <p className="mt-4 text-4xl font-black text-white">871</p>
                <p className="mt-2 text-sm text-amber-300">54 need escalated action</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm" aria-label="Recent service requests overview">
                  <thead className="bg-slate-950/30 text-slate-300">
                    <tr>
                      <th className="px-6 py-4 font-medium">Service</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Officer</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardRows.map((row) => (
                      <tr key={row.service} className="border-t border-white/10 text-slate-200">
                        <td className="px-6 py-4">{row.service}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-100">{row.status}</span>
                        </td>
                        <td className="px-6 py-4">{row.officer}</td>
                        <td className="px-6 py-4">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 text-slate-900">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Why residents choose us
              </span>
              <h2 className="mt-5 text-3xl font-black sm:text-4xl">Built for transparency, trust, and convenience.</h2>
              <p className="mt-5 max-w-xl text-slate-600">
                This platform simplifies how residents interact with public institutions by creating a clear digital experience that keeps information secure, accessible, and easy to follow.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Fast approval tracking and status updates',
                  'Secure digital submissions and identity checks',
                  'Clear communication from request to resolution',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1 text-emerald-600">
                      <CircleCheckBig className="h-4 w-4" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/60">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-blue-600 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <p className="mt-6 text-3xl font-black text-white">24k+</p>
                  <p className="mt-2 text-sm text-blue-100">Active citizen accounts</p>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 p-5 ring-1 ring-inset ring-emerald-400/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                    <BadgeCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="mt-6 text-3xl font-black text-slate-900">100%</p>
                  <p className="mt-2 text-sm text-emerald-700">Secure data handling</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Request progress</span>
                  <span className="font-semibold text-slate-900">92% complete</span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span>Latest update</span>
                  <span className="text-emerald-600">Approved</span>
                </div>
                <p className="mt-2 text-base text-slate-700">Your property maintenance request has been reviewed and approved for the next phase.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              A simple process from request to resolution.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 text-sm font-black text-white">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 py-20 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">Need help now?</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Get connected to the right service faster.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login" className="rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-700 transition hover:bg-slate-100">
                Sign in
              </Link>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/15">
                Contact support
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 font-black text-white">
                P
              </div>
              <div>
                <div className="text-lg font-black text-white">Public Service Request System</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Citizen Portal</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Delivering trusted digital public services to residents with secure access, transparent updates, and clearer communication across service departments.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Quick links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href="#services" className="transition hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Support</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#about" className="transition hover:text-white">About us</a></li>
              <li><a href="#process" className="transition hover:text-white">How it works</a></li>
              <li><a href="/login" className="transition hover:text-white">Sign in</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-300" />
                <span>+1 (800) 555-0145</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-blue-300" />
                <span>portal.publicservice.gov</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:flex-row lg:px-8">
            <span>© 2026 Public Service Request System. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
