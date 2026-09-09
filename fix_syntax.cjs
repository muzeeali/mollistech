const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');
code = code.replace(/const buttons = \.find\('button\.relative'\);/, "const buttons = $(entry.target).find('button.relative');");
fs.writeFileSync('src/animations.js', code);
