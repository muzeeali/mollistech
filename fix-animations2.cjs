const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

code = code.replace(/let activeIndex = -1;[\s\S]*?let nextIndex = activeIndex \+ 1;/g, `let activeIndex = -1;
        buttons.each(function(i) {
          // A more robust way to check which one is active by checking the bottom line which is definitely red/blue
          if($(this).find('.bg-\\\\[\\\\#1868DB\\\\]').length > 0 || $(this).find('.bg-\\[\\#1868DB\\]').length > 0 || $(this).find('.bg-[#1868DB]').length > 0 || $(this).find('div.absolute.bottom-0.bg-\\\\[\\\\#1868DB\\\\]').css('opacity') === '1' || $(this).find('.w-3.h-3.bg-\\\\[\\\\#1868DB\\\\]').length > 0) {
            activeIndex = i;
          }
        });
        
        let nextIndex = activeIndex + 1;`);

fs.writeFileSync('src/animations.js', code);
