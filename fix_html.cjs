const fs = require('fs');
let code = fs.readFileSync('src/pages.js', 'utf8');

const correctHtml = `<pre class="text-sm leading-relaxed whitespace-pre-wrap"><span id="ide-content"><span class="text-[#8b949e]">/** * Service: Custom Software Development */</span>\n<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">softwareData</span> = {\n  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Development"</span>,\n  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Scalable, secure, and high-performance solutions."</span>,\n  <span class="text-[#a5d6ff]">"stack"</span>: [<span class="text-[#a5d6ff]">"React"</span>, <span class="text-[#a5d6ff]">"Node.js"</span>, <span class="text-[#a5d6ff]">"Python"</span>, <span class="text-[#a5d6ff]">"Go"</span>]\n};</span><span class="animate-pulse inline-block w-2 h-4 bg-[#c9d1d9] ml-1 align-middle"></span></pre>`;

code = code.replace(/<pre class=\"text-sm leading-relaxed whitespace-pre-wrap\">[\s\S]*?<\/pre>/, correctHtml);
fs.writeFileSync('src/pages.js', code);
