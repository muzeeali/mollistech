const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

// We append the new logic inside initAnimations
const insertPos = code.lastIndexOf('}'); // End of initAnimations

const newCode = `
  // 10. Text coloring animation based on scroll progress
  const whoWeAreHeading = $('#who-we-are-heading');
  if (whoWeAreHeading.length) {
    $(window).on('scroll.whoWeAre', function() {
      const rect = whoWeAreHeading[0].getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * 0.9;
      const endTrigger = windowHeight * 0.2;
      
      const scrollPos = rect.top;
      
      let progress = (startTrigger - scrollPos) / (startTrigger - endTrigger);
      progress = Math.max(0, Math.min(1, progress));
      
      const spans = whoWeAreHeading.find('.reveal-text');
      const totalSpans = spans.length;
      
      spans.each(function(index) {
        // Calculate at what progress percentage this span should turn fully colored
        const threshold = (index) / totalSpans;
        const targetColor = $(this).attr('data-color');
        
        if (progress > threshold) {
          $(this).css('color', targetColor);
        } else {
          $(this).css('color', 'rgb(229, 231, 235)'); // text-gray-200
        }
      });
    });
    // Trigger once on init
    $(window).trigger('scroll.whoWeAre');
  }

  // 11. Terminal Typing Animation
  const terminalTriggers = $('.terminal-trigger');
  const terminalContent = $('#terminal-content');
  
  if (terminalTriggers.length && terminalContent.length) {
    const terminalTexts = [
      "\\\\$ valo architect --init\\nBuilding scalable architecture...\\n[████████████████████] 100%\\n\\nStatus: System Robust & Performant.",
      "\\\\$ valo deploy --pipeline=production\\nRunning zero-downtime deployment...\\n[████████████████████] 100%\\n\\nStatus: All Checks Passed.",
      "\\\\$ valo audit --strict\\nRunning security audit on production...\\n[████████████████████] 100%\\n\\nResults:\\n> 0 Vulnerabilities Found\\n> Zero-Trust Configuration: Valid\\n> Data Encryption: AES-256 Active\\n\\nStatus: Secure."
    ];
    
    let currentTerminalIndex = -1;
    let typeInterval = null;

    const typeText = (text) => {
      clearInterval(typeInterval);
      terminalContent.text('');
      let charIndex = 0;
      typeInterval = setInterval(() => {
        if (charIndex <= text.length) {
          terminalContent.text(text.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 10); 
    };

    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          terminalTriggers.removeClass('opacity-100').addClass('opacity-20');
          $(entry.target).removeClass('opacity-20').addClass('opacity-100');
          
          const index = parseInt($(entry.target).attr('data-index'));
          if (index !== currentTerminalIndex && index >= 0 && index < terminalTexts.length) {
            currentTerminalIndex = index;
            typeText(terminalTexts[index]);
          }
        }
      });
    }, { threshold: 0.5 }); 

    terminalTriggers.each(function() {
      terminalObserver.observe(this);
    });
  }
`;

code = code.substring(0, insertPos) + newCode + code.substring(insertPos);
fs.writeFileSync('src/animations.js', code);
