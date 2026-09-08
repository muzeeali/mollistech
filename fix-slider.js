const fs = require('fs');
let html = fs.readFileSync('src/pages.js', 'utf8');

// Reset all slides to inactive
html = html.replace(/opacity-100 translate-y-0 relative/g, 'opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none');
// Set first slide to active
html = html.replace('opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none', 'opacity-100 translate-y-0 relative');

// Reset all buttons
html = html.replace(/bg-\[\#1868DB\] border-\[\#1868DB\]/g, 'border-gray-400 group-hover:border-[#1868DB]');
html = html.replace(/text-\[\#101214\]/g, 'text-gray-500 group-hover:text-[#101214]');
html = html.replace(/bg-\[\#1868DB\] rounded-t-full/g, 'bg-gray-200 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity');

// Set first button active (we need to be careful not to replace all buttons globally incorrectly, but we can do it via jQuery on mount)
fs.writeFileSync('src/pages.js', html);
