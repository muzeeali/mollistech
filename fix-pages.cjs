const fs = require('fs');
let code = fs.readFileSync('src/pages.js', 'utf8');

// Replace the inline styles in Who We Are section
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(0, 48, 96\);">We don't just <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#003060">We don\'t just </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(24, 104, 219\);">deliver code. <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#1868DB">deliver code. </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(0, 48, 96\);">We embed directly into your <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#003060">We embed directly into your </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(24, 104, 219\);">product cycle, <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#1868DB">product cycle, </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(0, 48, 96\);">aligning every <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#003060">aligning every </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(0, 48, 96\);">technology choice with your <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#003060">technology choice with your </span>');
code = code.replace(/<span class="text-gray-200 transition-colors duration-200" style="color: rgb\(24, 104, 219\);">long-term success. <\/span>/g, '<span class="text-gray-200 transition-colors duration-200 reveal-text" data-color="#1868DB">long-term success. </span>');

// Wrap h2 with an ID
code = code.replace(/<h2 class="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-20">/g, '<h2 id="who-we-are-heading" class="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-20">');

// Add terminal id and empty it out to be dynamically typed
code = code.replace(/<div class="relative z-10 whitespace-pre-wrap text-\\[#4ade80\\]">.*?<span class="animate-pulse/s, '<div class="relative z-10 whitespace-pre-wrap text-[#4ade80]" id="terminal-content"></div><span class="animate-pulse');

// Add a class for observation to the text blocks
code = code.replace(/<div data-index="0" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="0" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="1" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="1" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="2" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-100">/g, '<div data-index="2" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');

fs.writeFileSync('src/pages.js', code);
