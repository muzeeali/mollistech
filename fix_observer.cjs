const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');
code = code.replace(
  /let index = 0;\s*const buttons = \$\(entry\.target\)\.find\('button\.relative'\);\s*if \(buttons\.length > 0\) \{\s*const interval = setInterval\(\(\) => \{/,
  `let index = 0;
        const buttons = $(entry.target).find('button.relative');
        if (buttons.length > 0) {
          // Trigger first one immediately so it types out like a terminal
          $(buttons[0]).trigger('mouseenter');
          index++;
          const interval = setInterval(() => {`
);
fs.writeFileSync('src/animations.js', code);
