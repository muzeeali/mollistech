const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/body\.mobile-nav-active \.mobile-nav-toggle \{[\s\S]*?\}/, `body.mobile-nav-active .mobile-nav-toggle {
  position: fixed;
  top: 24px;
  right: 20px;
  z-index: 9999;
  color: #101214;
}`);

fs.writeFileSync('src/index.css', code);
