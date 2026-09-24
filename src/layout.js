export function getLayoutHeader(currentPath = '/') {
  const normPath = currentPath.length > 1 && currentPath.endsWith('/') 
    ? currentPath.slice(0, -1) 
    : currentPath;

  const isHome = normPath === '/' ? 'active' : '';
  const isAbout = normPath === '/about' ? 'active' : '';
  const isServices = normPath === '/services' || normPath.startsWith('/services/') ? 'active' : '';
  const isStaff = normPath === '/staff-augmentation' || normPath.startsWith('/staff-augmentation/') ? 'active' : '';
  const isWork = normPath === '/case-studies' || normPath.startsWith('/case-studies/') ? 'active' : '';

  return `<header class="fixed top-0 left-0 w-full z-50 bg-[#161A22]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.07)] transition-all duration-300" id="header">
<div class="container max-w-7xl mx-auto px-4 md:px-8 position-relative d-flex align-items-center justify-content-between">
  <a href="/" class="logo d-flex align-items-center me-auto text-decoration-none py-3">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-white text-base shadow-sm">
        M
      </div>
      <span class="font-display font-semibold text-lg tracking-tight text-[#F9FAFB]">Mollistech</span>
    </div>
  </a>

  <nav id="navmenu" class="me-md-4 navmenu">
    <div class="mobile-nav-extras hidden">
      <div class="absolute top-[20px] left-[20px] z-[9999] d-xl-none">
        <a href="/" class="!border-none !p-0 text-decoration-none flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-white text-sm">M</div>
          <span class="font-display font-semibold text-lg text-[#F9FAFB]">Mollistech</span>
        </a>
      </div>
      <div class="w-full px-6 pt-[90px] d-xl-none mb-6">
        <a href="/contact" class="btn-primary-white !m-0 !w-full !block text-center !py-3 !rounded-full !text-[15px] !font-semibold text-white bg-[#c85319] hover:bg-[#E5E7EB] transition-all">Start a Project</a>
      </div>
    </div>
    
    <ul class="d-flex align-items-center gap-8 list-unstyled mb-0 d-none d-xl-flex">
      <li><a href="/" class="${isHome} text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">Home</a></li>
      <li><a href="/about" class="${isAbout} text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">About</a></li>
      <li><a href="/services" class="${isServices} text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">Disciplines</a></li>
      <li><a href="/staff-augmentation" class="${isStaff} text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">Staff Augmentation</a></li>
      <li><a href="/case-studies" class="${isWork} text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">Selected Work</a></li>
    </ul>
    
    <i class="mobile-nav-toggle d-xl-none bi bi-list text-2xl text-white cursor-pointer"></i>
  </nav>

  <a class="btn-primary-white d-none d-xl-inline-flex items-center justify-center bg-[#c85319] hover:bg-[#db5c1c] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 text-decoration-none shadow-sm active:scale-95" href="/contact">
    Contact Us
  </a>
</div>
</header>`;
}

export const layout_header = getLayoutHeader('/');

export const layout_footer = `<footer id="footer" class="footer bg-[#0B0C0E] text-[#9CA3AF] pt-12 pb-8 border-t border-[rgba(255,255,255,0.07)]">
<div class="container max-w-7xl mx-auto px-4 md:px-8">
  <div class="bg-[#111419] border border-[rgba(255,255,255,0.08)] rounded-3xl px-8 py-12 md:px-14 md:py-14 text-white">
    <div class="row gy-5">
      <div class="col-lg-4 col-md-6 d-flex flex-column gap-3">
        <a href="/" class="d-flex align-items-center gap-3 text-decoration-none mb-2">
          <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-white text-base">
            M
          </div>
          <span class="font-display font-semibold text-lg tracking-tight text-[#F9FAFB]">Mollistech</span>
        </a>
        <p class="text-[13px] text-[#9CA3AF] leading-relaxed max-w-sm mb-3">
          Full-stack marketing & systems engineering agency. Delivering high-impact growth, performance infrastructure, and custom software.
        </p>
        <ul class="list-unstyled d-flex flex-column gap-2.5 mb-0 text-[13px] font-medium">
          <li><a href="/" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Home</a></li>
          <li><a href="/about" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">About Us</a></li>
          <li><a href="/case-studies" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Selected Work</a></li>
          <li><a href="/contact" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Contact &amp; Teardown</a></li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-6 d-flex flex-column gap-3">
        <h4 class="font-mono font-medium text-[#9CA3AF] mb-1 text-[11px] tracking-widest uppercase">Disciplines</h4>
        <ul class="list-unstyled d-flex flex-column gap-2.5 mb-0 text-[13px] font-medium text-[#9CA3AF]">
          <li><a href="/services" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Paid Advertising &amp; Growth</a></li>
          <li><a href="/services" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Custom Software Engineering</a></li>
          <li><a href="/staff-augmentation" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">IT Staff Augmentation</a></li>
          <li><a href="/services" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">System Integration &amp; CRM</a></li>
          <li><a href="/services" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">SEO &amp; Content Production</a></li>
          <li><a href="/services" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Mobile App Development</a></li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-6 d-flex flex-column gap-3">
        <h4 class="font-mono font-medium text-[#9CA3AF] mb-1 text-[11px] tracking-widest uppercase">Office &amp; Inquiries</h4>
        <ul class="list-unstyled d-flex flex-column gap-2.5 mb-0 text-[13px] text-[#9CA3AF]">
          <li class="text-[#F9FAFB] font-medium">Bahria Town, Phase 5</li>
          <li>Islamabad, Pakistan</li>
          <li class="mt-2"><a href="tel:+923495743744" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">+92 3495743744</a></li>
          <li class="mt-1"><a href="mailto:hello@mollistech.com" class="text-[#FFFFFF] font-semibold hover:underline text-decoration-none transition-colors">hello@mollistech.com &rarr;</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column flex-md-row justify-content-between align-items-center py-6 text-[12px] text-[#9CA3AF] font-mono px-4">
    <div>&copy; 2026 Mollistech. All rights reserved.</div>
    <div class="d-flex gap-5 mt-3 mt-md-0 align-items-center">
      <a href="/privacy" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Privacy Policy</a>
      <a href="/terms" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">Terms &amp; Conditions</a>
      <a href="/faqs" class="text-[#9CA3AF] hover:text-[#FFFFFF] text-decoration-none transition-colors">FAQs</a>
    </div>
  </div>
</div>
</footer>`;
