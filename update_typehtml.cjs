const fs = require('fs');

let code = fs.readFileSync('src/animations.js', 'utf8');

const newTypeHTML = `const typeHTML = (htmlStr, element) => {
    clearInterval(element.data('typeInterval'));
    element.html('');
    const lines = htmlStr.split('\\n');
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex <= lines.length) {
        element.html(lines.slice(0, lineIndex).join('\\n'));
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    element.data('typeInterval', interval);
  };`;

// replace the old typeHTML definition
code = code.replace(/const typeHTML = \(htmlStr, element\) => \{[\s\S]*?element\.data\('typeInterval', interval\);\n  \};/, newTypeHTML);

code = code.replace(/clearInterval\(ideContentEl\.data\('typeInterval'\)\);\s*ideContentEl\.html\(''\);\s*const lines = serviceContents\[index\]\.split\('\\n'\);\s*let lineIndex = 0;\s*const interval = setInterval\(\(\) => \{[\s\S]*?ideContentEl\.data\('typeInterval', interval\);/g, `
             clearInterval(ideContentEl.data('typeInterval'));
             ideContentEl.html('');
             const lines = serviceContents[index].split('\\n');
             let lineIndex = 0;
             const interval = setInterval(() => {
                if (lineIndex <= lines.length) {
                   ideContentEl.html(lines.slice(0, lineIndex).join('\\n'));
                   lineIndex++;
                } else {
                   clearInterval(interval);
                }
             }, 100);
             ideContentEl.data('typeInterval', interval);`);

fs.writeFileSync('src/animations.js', code);
console.log('Update finished');
