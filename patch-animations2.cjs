const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

code = code.replace("$(window).on('scroll.whoWeAre', function() {", "$(window).off('scroll.whoWeAre').on('scroll.whoWeAre', function() {");

fs.writeFileSync('src/animations.js', code);
