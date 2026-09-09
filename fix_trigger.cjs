const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');
code = code.replace(/\s*\.trigger\('mouseenter'\);/, "\n          $(buttons[0]).trigger('mouseenter');");
fs.writeFileSync('src/animations.js', code);
