import { Link } from 'react-router-dom';
import { Phone, Globe } from 'lucide-react';

const Footer = () => {
  const quickLinks = ['Request services', 'Emergency updates', 'Public notices', 'Support center'];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Public Service Request System logo"
              className="h-11 w-11 rounded-xl border border-blue-400 bg-white shadow-md shadow-blue-500/20"
            />
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
                <Link to="/services" className="transition hover:text-white">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Support</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="transition hover:text-white">About us</Link></li>
            <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
            <li><Link to="/login" className="transition hover:text-white">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-300" />
              <span>+254 20 000 0000</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-blue-300" />
              <span>portal.publicservice.gov.ke</span>
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
  );
};

export default Footer;
