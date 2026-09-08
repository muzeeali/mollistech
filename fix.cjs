const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

// I will just replace `const serviceNodes = ;` with the correct line.
code = code.replace(
  'const serviceNodes = ;',
  `const serviceNodes = $('.animate-\\\\[spin_60s_linear_infinite_reverse\\\\] > button');`
);

fs.writeFileSync('src/animations.js', code);
console.log('Fixed syntax error');
