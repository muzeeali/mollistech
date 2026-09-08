const fs = require('fs');
let code = fs.readFileSync('src/layout.js', 'utf8');

code = code.replace(/<nav id="navmenu" class="navmenu">([\s\S]*?)<i class="mobile-nav-toggle d-xl-none bi bi-list"><\/i><\/nav>/, `<nav id="navmenu" class="navmenu">
<div class="mobile-nav-extras hidden">
  <div class="absolute top-[20px] left-[20px] z-[9999] d-xl-none"><a href="/" class="!border-none !p-0"><img alt="VALO Logo" class="h-12 w-auto object-contain" src="https://www.thevalo.net/logo.svg?v=4"></a></div>
  <div class="w-full px-6 pt-[90px] d-xl-none mb-6"><a href="/contact" class="btn-getstarted !m-0 !w-full !block text-center !py-3.5 !rounded-2xl !text-[17px] !font-semibold !text-white shadow-sm active:scale-[0.98] transition-transform bg-[#1868DB] hover:bg-[#1868DB]">Contact Us</a></div>
</div>
$1<i class="mobile-nav-toggle d-xl-none bi bi-three-dots-vertical text-2xl"></i></nav>`);

fs.writeFileSync('src/layout.js', code);
