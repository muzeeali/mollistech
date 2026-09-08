const fs = require('fs');

let code = fs.readFileSync('src/animations.js', 'utf8');

const newTypeHTML = `const typeHTML = (htmlStr, element) => {
    clearInterval(element.data('typeInterval'));
    element.html('');
    
    const tokens = [];
    let i = 0;
    while(i < htmlStr.length) {
        if (htmlStr[i] === '<') {
            let closingIdx = htmlStr.indexOf('>', i);
            if (closingIdx !== -1) {
                tokens.push(htmlStr.substring(i, closingIdx + 1));
                i = closingIdx + 1;
                continue;
            }
        }
        if (htmlStr[i] === '&') {
            let semiIdx = htmlStr.indexOf(';', i);
            if (semiIdx !== -1 && semiIdx - i < 10) {
                tokens.push(htmlStr.substring(i, semiIdx + 1));
                i = semiIdx + 1;
                continue;
            }
        }
        tokens.push(htmlStr[i]);
        i++;
    }
    
    let tokenIndex = 0;
    let currentHtml = '';
    const interval = setInterval(() => {
        while (tokenIndex < tokens.length && tokens[tokenIndex].startsWith('<')) {
            currentHtml += tokens[tokenIndex];
            tokenIndex++;
        }
        
        if (tokenIndex < tokens.length) {
            currentHtml += tokens[tokenIndex];
            tokenIndex++;
            element.html(currentHtml);
        } else {
            element.html(currentHtml);
            clearInterval(interval);
        }
    }, 10);
    element.data('typeInterval', interval);
  };`;

// replace the old typeHTML definition
code = code.replace(/const typeHTML = \(htmlStr, element\) => \{[\s\S]*?element\.data\('typeInterval', interval\);\n  \};/, newTypeHTML);

code = code.replace(/clearInterval\(ideContentEl\.data\('typeInterval'\)\);\s*ideContentEl\.html\(''\);\s*const lines = serviceContents\[index\]\.split\('\\n'\);\s*let lineIndex = 0;\s*const interval = setInterval\(\(\) => \{[\s\S]*?ideContentEl\.data\('typeInterval', interval\);/g, `
             clearInterval(ideContentEl.data('typeInterval'));
             ideContentEl.html('');
             const tokens = [];
             let i = 0;
             const htmlStr = serviceContents[index];
             while(i < htmlStr.length) {
                 if (htmlStr[i] === '<') {
                     let closingIdx = htmlStr.indexOf('>', i);
                     if (closingIdx !== -1) {
                         tokens.push(htmlStr.substring(i, closingIdx + 1));
                         i = closingIdx + 1;
                         continue;
                     }
                 }
                 if (htmlStr[i] === '&') {
                     let semiIdx = htmlStr.indexOf(';', i);
                     if (semiIdx !== -1 && semiIdx - i < 10) {
                         tokens.push(htmlStr.substring(i, semiIdx + 1));
                         i = semiIdx + 1;
                         continue;
                     }
                 }
                 tokens.push(htmlStr[i]);
                 i++;
             }
             
             let tokenIndex = 0;
             let currentHtml = '';
             const interval = setInterval(() => {
                 while (tokenIndex < tokens.length && tokens[tokenIndex].startsWith('<')) {
                     currentHtml += tokens[tokenIndex];
                     tokenIndex++;
                 }
                 if (tokenIndex < tokens.length) {
                     currentHtml += tokens[tokenIndex];
                     tokenIndex++;
                     ideContentEl.html(currentHtml);
                 } else {
                     ideContentEl.html(currentHtml);
                     clearInterval(interval);
                 }
             }, 10);
             ideContentEl.data('typeInterval', interval);`);

fs.writeFileSync('src/animations.js', code);
console.log('Update finished');
