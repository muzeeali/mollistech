const fs = require('fs');
let code = fs.readFileSync('src/pages.js', 'utf8');

const targetStr = '<div class="relative z-10 whitespace-pre-wrap text-[#4ade80]">';
const splitCode = code.split(targetStr);

if(splitCode.length > 1) {
    const after = splitCode[1];
    const endDivIdx = after.indexOf('</div>');
    const theRest = after.substring(endDivIdx + 6);
    code = splitCode[0] + '<div class="relative z-10 whitespace-pre-wrap text-[#4ade80]"><span id="terminal-content"></span><span class="animate-pulse inline-block w-2 h-4 bg-[#4ade80] ml-1 align-middle"></span></div>' + theRest;
}

code = code.replace(/<div data-index="0" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="0" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="1" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-20">/g, '<div data-index="1" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">');
code = code.replace(/<div data-index="2" class="min-h-\\[50vh\\] flex flex-col justify-center transition-opacity duration-700 opacity-100">/g, '<div data-index="2" class="min-h-[50vh] flex flex-col justify-center transition-opacity duration-700 opacity-20 terminal-trigger">'); // notice opacity-100 -> 20

fs.writeFileSync('src/pages.js', code);
