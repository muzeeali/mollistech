const fs = require('fs');
let code = fs.readFileSync('src/pages.js', 'utf8');

code = code.replace(/<div data-index="0" class="min-h-\[50vh\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="0" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="1" class="min-h-\[50vh\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="1" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="2" class="min-h-\[50vh\] flex flex-col justify-center transition-opacity duration-700 opacity-100">/g, '<div data-index="2" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">'); 

fs.writeFileSync('src/pages.js', code);
