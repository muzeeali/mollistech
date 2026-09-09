export function initAnimations() {
  const $ = window.$;
  if (!$) return;
  
  // 1. Intersection Observer for Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).removeClass('opacity-0 translate-y-10 scale-95').addClass('opacity-100 translate-y-0 scale-100');
      }
    });
  }, { threshold: 0.1 });
  
  $('section h2, section p, .client-logos, .section-card').not('.hero *').each(function() {
    $(this).addClass('transition-all duration-1000 transform opacity-0 translate-y-10');
    observer.observe(this);
  });
  
  $('h3.text-2xl, h3.text-4xl').not('.group *').each(function() {
    $(this).addClass('transition-all duration-1000 transform opacity-0 translate-y-10');
    observer.observe(this);
  });

  const scrollTerminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let index = 0;
        const buttons = $(entry.target).find('button.relative');
        if (buttons.length > 0) {
          // Trigger first one immediately so it types out like a terminal
          $(buttons[0]).trigger('mouseenter');
          index++;
          const interval = setInterval(() => {
            if (index >= buttons.length) {
              clearInterval(interval);
              return;
            }
            $(buttons[index]).trigger('mouseenter');
            setTimeout(() => {
              $(buttons[index-1]).trigger('mouseleave');
            }, 100);
            index++;
          }, 2000);
          $(entry.target).data('terminal-interval', interval);
        }
      } else {
        clearInterval($(entry.target).data('terminal-interval'));
      }
    });
  }, { threshold: 0.5 });
  
  $('.animate-\\[spin_60s_linear_infinite_reverse\\]').parent().parent().each(function() {
    scrollTerminalObserver.observe(this);
  });

  // Ensure events are attached only once
  $(document).off('click', '.cursor-pointer.transition-all');
  $(document).on('click', '.cursor-pointer.transition-all', function() {
    if ($(this).find('.font-mono').length) {
      $(this).siblings().each(function() {
        $(this).removeClass('bg-[#0a1224] border-l-[#58a6ff]').addClass('hover:bg-[#060b18] border-l-transparent');
        $(this).find('h3').removeClass('text-white').addClass('text-gray-500');
        $(this).find('.font-mono').removeClass('text-[#58a6ff]').addClass('text-[#1868DB]/40');
        $(this).find('.overflow-hidden').css('max-height', '0px').css('opacity', '0').removeClass('mt-6');
      });
      
      $(this).addClass('bg-[#0a1224] border-l-[#58a6ff]').removeClass('hover:bg-[#060b18] border-l-transparent');
      $(this).find('h3').addClass('text-white').removeClass('text-gray-500');
      $(this).find('.font-mono').addClass('text-[#58a6ff]').removeClass('text-[#1868DB]/40');
      $(this).find('.overflow-hidden').css('max-height', '200px').css('opacity', '1').addClass('mt-6');
    }
  });

  const servicesData = {
    'Custom Software Development': {
      filename: 'custom-software.json',
      content: `{\n  "title": "Custom Software Development",\n  "description": "We design and develop secure, maintainable, and high-performance software for web, mobile, and enterprise environments.",\n  "stack": ["React", "Node.js", "Python", "Go"]\n}`
    },
    'Cloud Engineering': {
      filename: 'cloud-devops.yaml',
      content: `title: Cloud Engineering & DevOps\ndescription: We design, automate, and operate production-grade cloud environments focused on scalability and reliability.\nstack:\n  - AWS\n  - Docker\n  - Kubernetes\n  - Terraform`
    },
    'Cybersecurity': {
      filename: 'cybersecurity.config',
      content: `{\n  "title": "Cybersecurity",\n  "description": "Security is embedded into our architecture, development, and cloud operations to ensure resilient systems.",\n  "protocols": ["Zero-Trust", "OAuth 2.0", "AES-256"]\n}`
    },
    'AI & Data': {
      filename: 'ai-data-solutions.py',
      content: `def ai_data_solutions():\n    return {\n        "title": "AI & Data Solutions",\n        "description": "We build scalable data-driven platforms that enable automation, analytics, and advanced product capabilities.",\n        "frameworks": ["PyTorch", "TensorFlow", "Snowflake"]\n    }`
    },
    'UI/UX': {
      filename: 'ui-ux-design.tsx',
      content: `export const UIUX = {\n  title: "UI/UX Design",\n  description: "We design intuitive and accessible interfaces that simplify complex systems and improve product adoption.",\n  tools: ["Figma", "Tailwind CSS", "Framer"]\n};`
    },
    'Quality Assurance': {
      filename: 'qa-automation.test.js',
      content: `describe("Quality Assurance & Automation", () => {\n  it("ensures reliability", () => {\n    expect(testing).toContain(["Cypress", "Jest", "Selenium"]);\n  });\n});`
    },
    'Dedicated Engineering': {
      filename: 'dedicated-teams.md',
      content: `# Dedicated Engineering Teams\nWe provide experienced engineers who integrate directly into your team and workflows.\n\n**Methodology:** Agile, Scrum, Jira`
    },
    'Mobile App': {
      filename: 'mobile-development.swift',
      content: `struct MobileApp {\n    let title = "Mobile App Development"\n    let technologies = ["React Native", "Swift", "Kotlin", "Flutter"]\n}`
    },
    'API Development': {
      filename: 'api-integration.graphql',
      content: `type API {\n  title: String!\n  integrations: [String!]!\n}\n# REST, GraphQL, Webhooks, ERP/CRM`
    }
  };

  const updateTerminal = (title, contextEl) => {
    for (const key in servicesData) {
      if (title.includes(key) || key.includes(title)) {
        const terminalHeader = contextEl.find('.bi-file-earmark-code').parent();
        if(terminalHeader.length) {
          terminalHeader.html(`<i class="bi bi-file-earmark-code text-[#8b949e] mr-2"></i>${servicesData[key].filename}<i class="bi bi-x ml-4 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer"></i>`);
          
          let code = servicesData[key].content;
          code = code.replace(/("[^"]*")/g, '<span class="text-[#a5d6ff]">$1</span>');
          code = code.replace(/(\b(?:def|return|export|const|describe|it|expect|struct|let|type)\b)/g, '<span class="text-[#ff7b72]">$1</span>');
          
          const lines = code.split('\n');
          let numbersHtml = '';
          let codeHtml = '';
          lines.forEach((line, i) => {
            numbersHtml += `<div>${i+1}</div>`;
            codeHtml += `<div>${line || ' '}</div>`;
          });
          
          contextEl.find('.font-mono.select-none').html(numbersHtml);
          contextEl.find('pre.whitespace-pre-wrap').html(codeHtml);
        }
        break;
      }
    }
  };

  $(document).off('mouseenter', 'tr.group, .service-item, .group.hover\\:bg-\\[\\#1868DB\\]');
  $(document).on('mouseenter', 'tr.group, .service-item, .group.hover\\:bg-\\[\\#1868DB\\]', function() {
    const title = $(this).find('h2').text().trim() || $(this).find('h3').text().trim() || $(this).text().trim();
    const contextEl = $(this).closest('main');
    updateTerminal(title, contextEl);
  });
  
  $(document).off('mouseenter', 'button.relative.z-10.w-14');
  $(document).on('mouseenter', 'button.relative.z-10.w-14', function() {
    const tooltipText = $(this).next('div').text().trim();
    if(tooltipText) {
      const contextEl = $(this).closest('section');
      updateTerminal(tooltipText, contextEl);
      
      $(this).closest('section').find('button.relative').removeClass('border-gray-500 text-[#c9d1d9]').addClass('border-[#30363d] text-[#8b949e]');
      $(this).removeClass('border-[#30363d] text-[#8b949e]').addClass('border-gray-500 text-[#c9d1d9]');
      $(this).next('div').removeClass('opacity-0').addClass('opacity-100');
    }
  });

  $(document).off('mouseleave', 'button.relative.z-10.w-14');
  $(document).on('mouseleave', 'button.relative.z-10.w-14', function() {
    $(this).next('div').removeClass('opacity-100').addClass('opacity-0');
  });

  
  $(document).off('click', '#hero-slider .bottom-12 button');
  $(document).on('click mouseenter', '#hero-slider .bottom-12 button', function() {
    const index = $(this).index();
    const heroSlider = $('#hero-slider');
    
    const buttons = heroSlider.find('.bottom-12 button');
    buttons.each(function(i) {
      if (i === index) {
        $(this).find('.w-3.h-3').removeClass('border-gray-400 group-hover:border-[#1868DB] bg-transparent').addClass('bg-[#1868DB] border-[#1868DB]');
        $(this).find('span').removeClass('text-gray-500 group-hover:text-[#101214]').addClass('text-[#101214]');
        $(this).find('.bottom-0').removeClass('bg-gray-200 opacity-0 group-hover:opacity-100').addClass('bg-[#1868DB]').css('opacity', '1');
      } else {
        $(this).find('.w-3.h-3').removeClass('bg-[#1868DB] border-[#1868DB]').addClass('border-gray-400 group-hover:border-[#1868DB] bg-transparent');
        $(this).find('span').removeClass('text-[#101214]').addClass('text-gray-500 group-hover:text-[#101214]');
        $(this).find('.bottom-0').removeClass('bg-[#1868DB]').addClass('bg-gray-200 opacity-0 group-hover:opacity-100').css('opacity', '');
      }
    });
    
    const textSlides = heroSlider.find('.max-w-2xl > div');
    textSlides.each(function(i) {
      if (i === index) {
        $(this).removeClass('opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none').addClass('opacity-100 translate-y-0 relative');
      } else {
        $(this).removeClass('opacity-100 translate-y-0 relative').addClass('opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none');
      }
    });

    const graphicSlides = heroSlider.find('> .absolute.inset-0.z-0 > .absolute.inset-0');
    graphicSlides.each(function(i) {
      if (i === index) {
        $(this).removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
      } else {
        $(this).removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
      }
    });
    
    if (currentIdeIndex !== index && index >= 0 && index < ideContents.length) {
      currentIdeIndex = index;
      ideFilenameEl.text(ideFiles[index]);
      typeHTML(ideContents[index], ideContentEl);
    }
  });

  $(document).off('click', '.mobile-nav-toggle');
  $(document).on('click', '.mobile-nav-toggle', function() {
    const body = $('body');
    const navmenu = $('#navmenu');
    body.toggleClass('mobile-nav-active');
    $(this).toggleClass('bi-three-dots-vertical bi-x');
    
    if (body.hasClass('mobile-nav-active')) {
      navmenu.find('ul').removeClass('d-none');
      navmenu.addClass('mobile-menu-open');
    } else {
      navmenu.find('ul').addClass('d-none d-xl-flex');
      navmenu.removeClass('mobile-menu-open');
    }
  });

  $(document).off('click', '#navmenu a');
  $(document).on('click', '#navmenu a', function() {
    if ($('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle').removeClass('bi-x').addClass('bi-three-dots-vertical');
      $('#navmenu').find('ul').addClass('d-none d-xl-flex');
    }
  });

  // Initialize hero slider to first slide
  setTimeout(() => {
    $('#hero-slider .bottom-12 button').first().trigger('click');
  }, 100);

  // 6. Hero Slider Auto-Slide Logic
  let heroSliderInterval;
  
  function startHeroSlider() {
    clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(() => {
      const buttons = $('#hero-slider .bottom-12 button');
      if(buttons.length > 0) {
        let activeIndex = -1;
        buttons.each(function(i) {
          if ($(this).find('span.text-\\[\\#101214\\]').length > 0 || $(this).find('span').hasClass('text-[#101214]')) {
             activeIndex = i;
          }
        });
        
        let nextIndex = activeIndex + 1;
        if(nextIndex >= buttons.length || nextIndex === 0) nextIndex = 0; // fallback if activeIndex is -1
        
        $(buttons[nextIndex]).trigger('click');
      }
    }, 10000);
  }
  
  $(document).off('click.autoslide', '#hero-slider .bottom-12 button');
  $(document).on('click.autoslide', '#hero-slider .bottom-12 button', function() {
    startHeroSlider();
  });
  
  startHeroSlider();

  
  // 12. IDE Terminal Typing Animation
  const ideFiles = [
    "custom-software.json",
    "cloud-infrastructure.json",
    "design-system.json",
    "data-engineering.json",
    "ai-models.json",
    "ci-cd-pipeline.json"
  ];

  const ideContents = [
`<span class="text-[#8b949e]">/**
 * Service Module: Custom Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">serviceData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Development"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"We design and develop secure, maintainable, and high-performance software for web, mobile, and enterprise environments."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [
    <span class="text-[#a5d6ff]">"React"</span>,
    <span class="text-[#a5d6ff]">"Node.js"</span>,
    <span class="text-[#a5d6ff]">"Python"</span>,
    <span class="text-[#a5d6ff]">"Go"</span>
  ]
};`,
`<span class="text-[#8b949e]">/**
 * Service Module: Cloud
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">cloudData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Cloud Architecture & Migration"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Scalable cloud infrastructure designed for maximum reliability and performance."</span>,
  <span class="text-[#a5d6ff]">"providers"</span>: [
    <span class="text-[#a5d6ff]">"AWS"</span>,
    <span class="text-[#a5d6ff]">"Google Cloud"</span>,
    <span class="text-[#a5d6ff]">"Azure"</span>
  ]
};`,
`<span class="text-[#8b949e]">/**
 * Service Module: UI/UX
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">designData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"User Interface & Experience"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Human-centered design creating intuitive, engaging, and beautiful product experiences."</span>,
  <span class="text-[#a5d6ff]">"tools"</span>: [
    <span class="text-[#a5d6ff]">"Figma"</span>,
    <span class="text-[#a5d6ff]">"Framer"</span>,
    <span class="text-[#a5d6ff]">"Webflow"</span>
  ]
};`,
`<span class="text-[#8b949e]">/**
 * Service Module: Data
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">dataData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Data Engineering & Analytics"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"High-speed pipelines and secure warehousing to transform raw data into actionable insights."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [
    <span class="text-[#a5d6ff]">"Snowflake"</span>,
    <span class="text-[#a5d6ff]">"dbt"</span>,
    <span class="text-[#a5d6ff]">"Airflow"</span>
  ]
};`,
`<span class="text-[#8b949e]">/**
 * Service Module: AI Enhancement
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">aiData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Generative AI Embedded"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Deploy proprietary machine learning models directly into your applications for intelligent automation."</span>,
  <span class="text-[#a5d6ff]">"capabilities"</span>: [
    <span class="text-[#a5d6ff]">"LLMs"</span>,
    <span class="text-[#a5d6ff]">"Computer Vision"</span>,
    <span class="text-[#a5d6ff]">"Predictive Analytics"</span>
  ]
};`,
`<span class="text-[#8b949e]">/**
 * Service Module: DevOps
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">devopsData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Automated DevOps Pipelines"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Accelerate delivery with continuous integration, automated testing, and secure release orchestration."</span>,
  <span class="text-[#a5d6ff]">"tools"</span>: [
    <span class="text-[#a5d6ff]">"Kubernetes"</span>,
    <span class="text-[#a5d6ff]">"Terraform"</span>,
    <span class="text-[#a5d6ff]">"GitHub Actions"</span>
  ]
};`
  ];

  let currentIdeIndex = -1;
  const ideFilenameEl = $('#ide-filename');
  const ideContentEl = $('#ide-content');

  const typeHTML = (htmlStr, element) => {
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
  };


  // 10. Text coloring animation based on scroll progress
  const whoWeAreHeading = $('#who-we-are-heading');
  if (whoWeAreHeading.length) {
    $(window).off('scroll.whoWeAre').on('scroll.whoWeAre', function() {
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
      "\\$ valo architect --init\nBuilding scalable architecture...\n[████████████████████] 100%\n\nStatus: System Robust & Performant.",
      "\\$ valo deploy --pipeline=production\nRunning zero-downtime deployment...\n[████████████████████] 100%\n\nStatus: All Checks Passed.",
      "\\$ valo audit --strict\nRunning security audit on production...\n[████████████████████] 100%\n\nResults:\n> 0 Vulnerabilities Found\n> Zero-Trust Configuration: Valid\n> Data Encryption: AES-256 Active\n\nStatus: Secure."
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



  
  
  
  // Capabilities scroll observer
  const capabilityTexts = [
    { title: "Custom Software Development", icon: "bi-code-slash", image: "https://www.thevalo.net/assets/img/services/custom-software-development.png" },
    { title: "Cloud Engineering & DevOps", icon: "bi-cloud-arrow-up", image: "https://www.thevalo.net/assets/img/services/Cloud-Engineering-and-DevOps.png" },
    { title: "AI & Data Solutions", icon: "bi-cpu", image: "https://www.thevalo.net/assets/img/services/ai-and-data-solutions.png" },
    { title: "UI/UX Design", icon: "bi-palette" },
    { title: "Cybersecurity", icon: "bi-shield-lock" },
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
          const imgEl = $('#capability-image');
          const textEl = $('#capability-text');
          const contentEl = $('#capability-visual-content');
          
          contentEl.css('opacity', '0');
          
          setTimeout(() => {
            const data = capabilityTexts[index];
            if (data.image) {
              iconEl.addClass('hidden');
              imgEl.attr('src', data.image).removeClass('hidden');
            } else {
              imgEl.addClass('hidden');
              iconEl.attr('class', `${data.icon} text-8xl md:text-9xl text-[#1868DB] opacity-40 transition-all duration-500`).removeClass('hidden');
            }
            textEl.text(`${data.title} // ARCHITECTURE`);
            contentEl.css('opacity', '1');
          }, 300);
        }
      }
    });
  }, { threshold: 0.4 });

  $('.capability-text-container > div').each(function() {
    capabilityObserver.observe(this);
  });





// 13. Services & Capabilities Network Topology Animation
  
    const serviceFiles = [
      "custom-software.json",
      "cloud-engineering.yml",
      "cybersecurity.json",
      "ai-data.py",
      "ui-ux-design.tsx",
      "qa-automation.spec.ts",
      "dedicated-teams.json",
      "mobile-app.swift",
      "api-integration.graphql"
    ];

    const serviceContents = [
`<span class="text-[#8b949e]">/**
 * Service: Custom Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">softwareData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Development"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Scalable, secure, and high-performance solutions."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [<span class="text-[#a5d6ff]">"React"</span>, <span class="text-[#a5d6ff]">"Node.js"</span>, <span class="text-[#a5d6ff]">"Python"</span>, <span class="text-[#a5d6ff]">"Go"</span>]
};`,
`<span class="text-[#8b949e]"># Service: Cloud Engineering & DevOps</span>
<span class="text-[#ff7b72]">stages</span>:
  - <span class="text-[#a5d6ff]">build</span>
  - <span class="text-[#a5d6ff]">test</span>
  - <span class="text-[#a5d6ff]">deploy</span>

<span class="text-[#79c0ff]">production_deploy</span>:
  <span class="text-[#a5d6ff]">script</span>:
    - <span class="text-[#a5d6ff]">echo "Deploying to Kubernetes cluster..."</span>
    - <span class="text-[#a5d6ff]">kubectl apply -f k8s/</span>`,
`<span class="text-[#8b949e]">/**
 * Service: Cybersecurity & Cloud Security
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">securityConfig</span> = {
  <span class="text-[#a5d6ff]">"encryption"</span>: <span class="text-[#a5d6ff]">"AES-256"</span>,
  <span class="text-[#a5d6ff]">"compliance"</span>: [<span class="text-[#a5d6ff]">"SOC2"</span>, <span class="text-[#a5d6ff]">"HIPAA"</span>, <span class="text-[#a5d6ff]">"GDPR"</span>],
  <span class="text-[#a5d6ff]">"firewall"</span>: <span class="text-[#79c0ff]">true</span>,
  <span class="text-[#a5d6ff]">"zero_trust"</span>: <span class="text-[#79c0ff]">true</span>
};`,
`<span class="text-[#8b949e]"># Service: AI & Data Solutions</span>
<span class="text-[#ff7b72]">import</span> pandas <span class="text-[#ff7b72]">as</span> pd
<span class="text-[#ff7b72]">from</span> sklearn.model_selection <span class="text-[#ff7b72]">import</span> train_test_split
<span class="text-[#ff7b72]">from</span> transformers <span class="text-[#ff7b72]">import</span> pipeline

<span class="text-[#8b949e]"># Initialize GenAI model pipeline</span>
generator = pipeline(<span class="text-[#a5d6ff]">'text-generation'</span>, model=<span class="text-[#a5d6ff]">'gpt-4'</span>)
results = generator(<span class="text-[#a5d6ff]'>"Optimize data pipelines for speed."</span>)`,
`<span class="text-[#8b949e]">/**
 * Service: UI/UX Design
 */</span>
<span class="text-[#ff7b72]">import</span> React <span class="text-[#ff7b72]">from</span> <span class="text-[#a5d6ff]">'react'</span>;

<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">DesignSystem</span> = () =&gt; (
  <span class="text-[#79c0ff]">&lt;ThemeProvider</span> <span class="text-[#a5d6ff]">theme</span>=<span class="text-[#a5d6ff]">"dark"</span><span class="text-[#79c0ff]">&gt;</span>
    <span class="text-[#79c0ff]">&lt;Button</span> <span class="text-[#a5d6ff]">variant</span>=<span class="text-[#a5d6ff]">"primary"</span><span class="text-[#79c0ff]">&gt;</span>User-Centric Design<span class="text-[#79c0ff]">&lt;/Button&gt;</span>
  <span class="text-[#79c0ff]">&lt;/ThemeProvider&gt;</span>
);`,
`<span class="text-[#8b949e]">/**
 * Service: Quality Assurance & Automation
 */</span>
<span class="text-[#ff7b72]">import</span> { test, expect } <span class="text-[#ff7b72]">from</span> <span class="text-[#a5d6ff]">'@playwright/test'</span>;

test(<span class="text-[#a5d6ff]">'automated integration checks pass'</span>, <span class="text-[#ff7b72]">async</span> ({ page }) =&gt; {
  <span class="text-[#ff7b72]">await</span> page.goto(<span class="text-[#a5d6ff]">'/production'</span>);
  <span class="text-[#ff7b72]">await</span> expect(page.locator(<span class="text-[#a5d6ff]">'#status'</span>)).toHaveText(<span class="text-[#a5d6ff]">'All systems nominal'</span>);
});`,
`<span class="text-[#8b949e]">/**
 * Service: Dedicated Engineering Teams
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">teamStructure</span> = {
  <span class="text-[#a5d6ff]">"model"</span>: <span class="text-[#a5d6ff]">"Embedded Pods"</span>,
  <span class="text-[#a5d6ff]">"composition"</span>: [
    <span class="text-[#a5d6ff]">"Tech Lead"</span>,
    <span class="text-[#a5d6ff]">"Senior Full-Stack Engineers"</span>,
    <span class="text-[#a5d6ff]">"QA Automation Engineer"</span>
  ],
  <span class="text-[#a5d6ff]">"agile_workflow"</span>: <span class="text-[#a5d6ff]">"Scrum/Kanban"</span>
};`,
`<span class="text-[#8b949e]">/* Service: Mobile App Development */</span>
<span class="text-[#ff7b72]">import</span> SwiftUI

<span class="text-[#ff7b72]">struct</span> MobileView: <span class="text-[#79c0ff]">View</span> {
    <span class="text-[#ff7b72]">var</span> body: <span class="text-[#ff7b72]">some</span> <span class="text-[#79c0ff]">View</span> {
        VStack {
            Text(<span class="text-[#a5d6ff]">"High-Performance iOS App"</span>)
                .font(.largeTitle)
                .foregroundColor(.blue)
        }
    }
}`,
`<span class="text-[#8b949e]"># Service: API Development & System Integration</span>
<span class="text-[#ff7b72]">type</span> <span class="text-[#79c0ff]">Query</span> {
  <span class="text-[#79c0ff]">systemStatus</span>: <span class="text-[#79c0ff]">String!</span>
  <span class="text-[#79c0ff]">fetchData</span>(<span class="text-[#a5d6ff]">source</span>: <span class="text-[#79c0ff]">String!</span>): <span class="text-[#79c0ff]">JSON!</span>
}

<span class="text-[#ff7b72]">type</span> <span class="text-[#79c0ff]">Mutation</span> {
  <span class="text-[#79c0ff]">integrateSystem</span>(<span class="text-[#a5d6ff]">config</span>: <span class="text-[#79c0ff]">ConfigInput!</span>): <span class="text-[#79c0ff]">Boolean!</span>
}`
    ];

    let currentServiceIndex = -1;
    
    $(document).off('mouseenter', '.animate-\\[spin_60s_linear_infinite_reverse\\] > button');
    $(document).on('mouseenter', '.animate-\\[spin_60s_linear_infinite_reverse\\] > button', function() {
      const serviceNodes = $('.animate-\\[spin_60s_linear_infinite_reverse\\] > button');
      const index = serviceNodes.index(this);
      
      // Update the visual state of all nodes
      serviceNodes.each(function(i) {
        const btn = $(this);
        const container = btn.parent().parent();
        const line = container.find('line');
        const label = btn.next('div');
        
        if (i === index) {
          // Active state
          btn.removeClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]')
             .addClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]');
          line.attr('stroke', '#58a6ff').attr('stroke-width', '2');
          label.removeClass('text-[#8b949e] opacity-0').addClass('text-[#58a6ff] opacity-100');
        } else {
          // Inactive state
          btn.removeClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]')
             .addClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]');
          line.attr('stroke', 'rgba(255,255,255,0.05)').attr('stroke-width', '1');
          label.removeClass('text-[#58a6ff] opacity-100').addClass('text-[#8b949e] opacity-0');
        }
      });
      
      // Update terminal IDE text
      if (currentServiceIndex !== index && index >= 0 && index < serviceContents.length) {
        currentServiceIndex = index;
        const ideFilenameEl = $('#ide-filename');
        const ideContentEl = $('#ide-content');
        if (ideFilenameEl.length && ideContentEl.length) {
          ideFilenameEl.text(serviceFiles[index]);
          // Use typeHTML if it is defined, otherwise fallback
          if (typeof typeHTML === 'function') {
             typeHTML(serviceContents[index], ideContentEl);
          } else {
             // Fallback definition for typeHTML
             
             
             
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
             ideContentEl.data('typeInterval', interval);
          }
        }
      }
    });
  
}