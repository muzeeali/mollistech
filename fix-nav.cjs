const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/\/\* Custom Mobile Menu Styles \*\/[\s\S]*?(?=\/\* Hide scrollbar)/, `/* Custom Mobile Menu Styles */
body.mobile-nav-active {
  overflow: hidden;
}
body.mobile-nav-active #header {
  height: 100dvh;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  bottom: 0;
}
body.mobile-nav-active #navmenu {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9998;
  display: block !important;
  padding: 0;
  background: transparent;
  overflow-y: auto;
}
body.mobile-nav-active .mobile-nav-extras {
  display: block !important;
}
body.mobile-nav-active .mobile-nav-extras .absolute {
  display: none !important; /* Hide the duplicate logo in extras since the header logo is visible */
}
body.mobile-nav-active .mobile-nav-extras .w-full.px-6.pt-\\[90px\\] {
  padding-top: 20px; /* Adjust padding since logo is hidden */
}
body.mobile-nav-active #navmenu ul {
  display: flex !important;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 24px 40px;
  gap: 1.5rem;
  font-size: 1.2rem;
}
body.mobile-nav-active .mobile-nav-toggle {
  /* Removed fixed positioning so it just stays where it naturally is in the flex container */
  color: #101214;
}
body.mobile-nav-active #navmenu a {
  color: #101214;
  font-weight: 700;
  text-decoration: none;
}
body.mobile-nav-active #navmenu a:hover {
  color: #1868DB;
}
`);

fs.writeFileSync('src/index.css', code);
