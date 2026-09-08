const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

code = code.replace(/buttons\.each\(function\(i\) \{[\s\S]*?activeIndex = i;\n          \}\n        \}\);/g, `buttons.each(function(i) {
          // Check if it has the active text color
          if ($(this).find('span.text-\\\\[\\\\#101214\\\\]').length > 0 && !$(this).find('span').hasClass('text-gray-500')) {
             activeIndex = i;
          }
        });`);

fs.writeFileSync('src/animations.js', code);
