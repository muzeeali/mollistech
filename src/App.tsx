import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { page_home, page_about, page_services, page_staff_augmentation, page_security, page_case_studies, page_contact, page_faqs, page_privacy, page_terms } from './pages';
import { layout_header, layout_footer } from './layout';
import { initAnimations } from './animations';

function Page({ htmlContent }: { htmlContent: string }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Re-initialize animations after DOM update
    setTimeout(() => {
      initAnimations();
    }, 100);
  }, [location.pathname, htmlContent]);

  return (
    <main className="main transition-all duration-300 transform opacity-100 translate-y-0">
      {parse(htmlContent || '<div class="py-24 text-center"><h1 class="display-1 text-[#1868DB] font-bold">404</h1><p>Path not resolved.</p></div>')}
    </main>
  );
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          navigate(href);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [navigate]);

  return (
    <div className="app-container index-page bg-white">
      {layout_header && parse(layout_header)}
      
      <Routes>
        <Route path="/" element={<Page htmlContent={page_home} />} />
        <Route path="/about" element={<Page htmlContent={page_about} />} />
        <Route path="/services" element={<Page htmlContent={page_services} />} />
        <Route path="/staff-augmentation" element={<Page htmlContent={page_staff_augmentation} />} />
        <Route path="/security" element={<Page htmlContent={page_security} />} />
        <Route path="/case-studies" element={<Page htmlContent={page_case_studies} />} />
        <Route path="/contact" element={<Page htmlContent={page_contact} />} />
        <Route path="/faqs" element={<Page htmlContent={page_faqs} />} />
        <Route path="/privacy" element={<Page htmlContent={page_privacy} />} />
        <Route path="/terms" element={<Page htmlContent={page_terms} />} />
        <Route path="*" element={<Page htmlContent={''} />} />
      </Routes>
      
      {layout_footer && parse(layout_footer)}
    </div>
  );
}
