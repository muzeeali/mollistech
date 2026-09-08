const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

code = code.replace(/bi-list/g, 'bi-three-dots-vertical');

fs.writeFileSync('src/animations.js', code);
