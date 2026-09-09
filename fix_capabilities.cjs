const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

const observerCode = `
  // Capabilities scroll observer
  const capabilityTexts = [
    { title: "Custom Software Development", icon: "bi-code-slash" },
    { title: "Cloud Engineering & DevOps", icon: "bi-cloud-arrow-up" },
    { title: "AI & Data Solutions", icon: "bi-cpu" },
    { title: "UI/UX Design", icon: "bi-palette" },
    { title: "Cybersecurity & Cloud Security", icon: "bi-shield-lock" },
    { title: "Quality Assurance & Automation", icon: "bi-check2-all" },
    { title: "Dedicated Engineering Teams", icon: "bi-people-fill" },
    { title: "Mobile App Development", icon: "bi-phone" },
    { title: "API Development & System Integration", icon: "bi-diagram-3" }
  ];

  let currentCapabilityIndex = -1;
  const capabilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset all sections
        $('.capability-text-container > div').removeClass('opacity-100 translate-x-0').addClass('opacity-20 -translate-x-8');
        // Activate current
        $(entry.target).removeClass('opacity-20 -translate-x-8').addClass('opacity-100 translate-x-0');
        
        const index = parseInt($(entry.target).attr('data-index'));
        if (index !== currentCapabilityIndex && index >= 0 && index < capabilityTexts.length) {
          currentCapabilityIndex = index;
          
          const iconEl = $('#capability-icon');
          const textEl = $('#capability-text');
          const contentEl = $('#capability-visual-content');
          
          contentEl.css('opacity', '0');
          
          setTimeout(() => {
            iconEl.attr('class', \`\${capabilityTexts[index].icon} text-9xl text-[#1868DB] opacity-30 transition-all duration-500\`);
            textEl.text(\`\${capabilityTexts[index].title} // ARCHITECTURE\`);
            contentEl.css('opacity', '1');
          }, 300);
        }
      }
    });
  }, { threshold: 0.6 });

  $('.capability-text-container > div').each(function() {
    capabilityObserver.observe(this);
  });
`;

code = code.replace(/\/\/ 13\. Services & Capabilities Network Topology Animation/, observerCode + '\n\n// 13. Services & Capabilities Network Topology Animation');
fs.writeFileSync('src/animations.js', code);
