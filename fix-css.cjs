const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

// Replace the old mobile nav CSS block
code = code.replace(/\/\* Custom Mobile Menu Styles \*\/[\s\S]*?(?=\/\* Hide scrollbar)/, `/* Custom Mobile Menu Styles */
body.mobile-nav-active {
  overflow: hidden;
}
body.mobile-nav-active #navmenu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9998;
  display: block !important;
  backdrop-filter: blur(10px);
  padding: 0;
}
body.mobile-nav-active .mobile-nav-extras {
  display: block !important;
}
body.mobile-nav-active #navmenu ul {
  display: flex !important;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 24px;
  gap: 1.5rem;
  font-size: 1.2rem;
}
body.mobile-nav-active .mobile-nav-toggle {
  position: fixed;
  top: 25px;
  right: 20px;
  z-index: 9999;
  font-size: 2rem;
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
