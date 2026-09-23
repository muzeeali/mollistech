export function initAnimations() {
  const $ = window.$;
  if (!$) return;

  function typeHTML(htmlStr, element) {
    if (!element || !element.length) return;
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
    }, 8);
    element.data('typeInterval', interval);
  }

  
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
    'Paid Advertising': {
      filename: 'paid-advertising.json',
      content: "{\n  \"title\": \"Paid Advertising\",\n  \"tagline\": \"Media Buying Managed Against Contribution Margin\",\n  \"channels\": [\"Meta\", \"Google\", \"TikTok\", \"Programmatic\"],\n  \"optimization\": \"Net Contribution Margin\"\n}"
    },
    'SEO': {
      filename: 'seo-strategy.ts',
      content: "{\n  \"title\": \"SEO\",\n  \"tagline\": \"Technical Audits & Topical Authority Mapping\",\n  \"technical\": [\"Core Web Vitals\", \"Architecture Overhauls\"],\n  \"growth\": [\"Topical Mapping\", \"Digital PR\"]\n}"
    },
    'Social Media': {
      filename: 'social-media.yml',
      content: "title: Social Media\ntagline: Always-On Channel Strategy & Community Engines\nplatforms: [\"LinkedIn\", \"Instagram\", \"TikTok\", \"X\"]\nfocus: Community Engines & Recurring Revenue"
    },
    'Content Production': {
      filename: 'content-production.config',
      content: "{\n  \"title\": \"Content Production\",\n  \"tagline\": \"High-Impact Video, Motion & Copy Assets\",\n  \"disciplines\": [\"Commercial Video\", \"Motion Graphics\", \"Photography\", \"Copywriting\"]\n}"
    },
    'App Marketing': {
      filename: 'app-marketing.json',
      content: "{\n  \"title\": \"App Marketing\",\n  \"tagline\": \"Scalable User Acquisition Funnels & LiveOps Campaigns\",\n  \"modules\": [\"ASO\", \"Paid UA\", \"Creative Testing\", \"LiveOps Frameworks\"]\n}"
    },
    'Brand Identity': {
      filename: 'brand-identity.ts',
      content: "{\n  \"title\": \"Brand Identity\",\n  \"tagline\": \"Market-Tested Positioning & Distinctive Brand Voice\",\n  \"deliverables\": [\"Brand Narrative\", \"Naming Architecture\", \"Visual Guidelines\", \"Collateral\"]\n}"
    },
    'System Integration': {
      filename: 'system-integration.graphql',
      content: "type SystemIntegration {\n  title: \"System Integration\"\n  tagline: \"CRM Plumbing, Data Pipelines & Attribution Models\"\n  crm: [\"Salesforce\", \"HubSpot\", \"Custom ERP\"]\n  pipelines: [\"Real-Time Sync\", \"Attribution\"]\n}"
    },
    'UI/UX Design': {
      filename: 'ui-ux-design.tsx',
      content: "export const UIUX = {\n  title: \"UI/UX Design\",\n  tagline: \"Intuitive Interfaces That Drive User Adoption\",\n  deliverables: [\"Design Systems\", \"Prototypes\", \"Wireframes\"]\n};"
    },
    'Custom Software': {
      filename: 'custom-software.json',
      content: "{\n  \"title\": \"Custom Software\",\n  \"tagline\": \"End-to-End Enterprise Systems, Intelligent Automation & Cloud\",\n  \"stack\": [\"React\", \"Node.js\", \"Python\", \"Go\", \"Kubernetes\"]\n}"
    },
    'Mobile Development': {
      filename: 'mobile-development.swift',
      content: "struct MobileApp {\n  let title = \"Mobile Development\"\n  let tagline = \"High-Performance Native & Cross-Platform\"\n  let stack = [\"SwiftUI\", \"Kotlin\", \"React Native\", \"Flutter\"]\n}"
    },
    'QA & Testing': {
      filename: 'qa-testing.spec.ts',
      content: "describe(\"QA & Testing\", () => {\n  it(\"ensures end-to-end reliability\", () => {\n    expect(defectPrevention).toBe(true);\n  });\n});"
    },
    'Staff Augmentation': {
      filename: 'staff-augmentation.json',
      content: "{\n  \"title\": \"Staff Augmentation\",\n  \"tagline\": \"Flexible Technical Capacity & Embedded Pods\",\n  \"talent\": \"Top 1% Senior Engineers\"\n}"
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
  
  // Replaced by scoped network topology handlers

  
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
  "paid-advertising.json",
  "seo-strategy.json",
  "social-media.json",
  "software-development.json",
  "ui-ux.json",
  "system-integration.json"
];

  const ideContents = [`<span class="text-[#8b949e]">/**
 * Service Module: Paid Advertising
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">campaignData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Data-Driven Campaigns"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Maximize your ROI with targeted ad placements, rigorous A/B testing, and data-backed performance marketing strategies."</span>,
  <span class="text-[#a5d6ff]">"channels"</span>: [
    <span class="text-[#a5d6ff]">"Google Ads"</span>,
    <span class="text-[#a5d6ff]">"Meta Ads"</span>,
    <span class="text-[#a5d6ff]">"LinkedIn Ads"</span>,
    <span class="text-[#a5d6ff]">"Programmatic"</span>
  ]
};`,`<span class="text-[#8b949e]">/**
 * Service Module: SEO
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">seoData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Search Engine Optimization"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Increase your visibility and drive high-quality organic traffic through technical SEO, optimized content, and authoritative link building."</span>,
  <span class="text-[#a5d6ff]">"tactics"</span>: [
    <span class="text-[#a5d6ff]">"Technical SEO"</span>,
    <span class="text-[#a5d6ff]">"Content Strategy"</span>,
    <span class="text-[#a5d6ff]">"Link Building"</span>
  ]
};`,`<span class="text-[#8b949e]">/**
 * Service Module: Social Media
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">socialData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Social Media Marketing"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Build brand loyalty and community through strategic content, proactive engagement, and targeted social campaigns."</span>,
  <span class="text-[#a5d6ff]">"platforms"</span>: [
    <span class="text-[#a5d6ff]">"Instagram"</span>,
    <span class="text-[#a5d6ff]">"TikTok"</span>,
    <span class="text-[#a5d6ff]">"LinkedIn"</span>
  ]
};`,`<span class="text-[#8b949e]">/**
 * Service Module: Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">softwareData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Custom Software Engineering"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"We design and develop secure, maintainable, and high-performance software for web, mobile, and enterprise environments."</span>,
  <span class="text-[#a5d6ff]">"stack"</span>: [
    <span class="text-[#a5d6ff]">"React"</span>,
    <span class="text-[#a5d6ff]">"Node.js"</span>,
    <span class="text-[#a5d6ff]">"Python"</span>
  ]
};`,`<span class="text-[#8b949e]">/**
 * Service Module: UI/UX
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">designData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"User Interface & Experience"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"Simplify complex workflows with pixel-perfect, user-centric interfaces designed for modern users."</span>,
  <span class="text-[#a5d6ff]">"tools"</span>: [
    <span class="text-[#a5d6ff]">"Figma"</span>,
    <span class="text-[#a5d6ff]">"Framer"</span>,
    <span class="text-[#a5d6ff]">"Webflow"</span>
  ]
};`,`<span class="text-[#8b949e]">/**
 * Service Module: System Integration
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">integrationData</span> = {
  <span class="text-[#a5d6ff]">"title"</span>: <span class="text-[#a5d6ff]">"Connecting Digital Ecosystems"</span>,
  <span class="text-[#a5d6ff]">"description"</span>: <span class="text-[#a5d6ff]">"We build robust, secure APIs and seamlessly integrate third-party platforms to automate data flow across your organization."</span>,
  <span class="text-[#a5d6ff]">"protocols"</span>: [
    <span class="text-[#a5d6ff]">"REST"</span>,
    <span class="text-[#a5d6ff]">"GraphQL"</span>,
    <span class="text-[#a5d6ff]">"WebSockets"</span>
  ]
};`];

  let currentIdeIndex = -1;
  const ideFilenameEl = $('#ide-filename');
  const ideContentEl = $('#ide-content');

  // typeHTML moved to top


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
    { title: "Paid Advertising", icon: "bi-bullseye" },
    { title: "SEO", icon: "bi-search" },
    { title: "Social Media", icon: "bi-share" },
    { title: "Content Production", icon: "bi-camera-reels" },
    { title: "App Marketing", icon: "bi-app-indicator" },
    { title: "Brand Identity", icon: "bi-fingerprint" },
    { title: "System Integration", icon: "bi-diagram-3" },
    { title: "UI/UX Design", icon: "bi-palette" },
    { title: "Custom Software", icon: "bi-code-slash" },
    { title: "Mobile Development", icon: "bi-phone" },
    { title: "QA & Testing", icon: "bi-check2-all" },
    { title: "Staff Augmentation", icon: "bi-people-fill" }
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
      "paid-advertising.json",
      "seo-strategy.ts",
      "social-media.yml",
      "content-production.config",
      "app-marketing.json",
      "brand-identity.ts",
      "system-integration.graphql",
      "ui-ux-design.tsx",
      "custom-software.json",
      "mobile-development.swift",
      "qa-testing.spec.ts",
      "staff-augmentation.json"
    ];

    const serviceContents = [
`<span class="text-[#8b949e]">/**
 * Service: Paid Advertising
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">adStrategy</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"Paid Advertising"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Media Buying Managed Against Contribution Margin"</span>,
  <span class="text-[#a5d6ff]">"networks"</span>: [
    <span class="text-[#a5d6ff]">"Meta"</span>,
    <span class="text-[#a5d6ff]">"Google"</span>,
    <span class="text-[#a5d6ff]">"TikTok"</span>,
    <span class="text-[#a5d6ff]">"Programmatic"</span>
  ],
  <span class="text-[#a5d6ff]">"optimization"</span>: <span class="text-[#a5d6ff]">"Net Contribution Margins & Blended Returns"</span>
};`,
`<span class="text-[#8b949e]">/**
 * Service: SEO & Search Dominance
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">seoEngine</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"SEO"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Technical Audits & Topical Authority Mapping"</span>,
  <span class="text-[#a5d6ff]">"audits"</span>: [<span class="text-[#a5d6ff]">"Core Web Vitals"</span>, <span class="text-[#a5d6ff]">"Crawl Architecture"</span>, <span class="text-[#a5d6ff]">"Schema"</span>],
  <span class="text-[#a5d6ff]">"strategy"</span>: [<span class="text-[#a5d6ff]">"Topical Authority Mapping"</span>, <span class="text-[#a5d6ff]">"Digital PR Outreach"</span>],
  <span class="text-[#a5d6ff]">"outcome"</span>: <span class="text-[#a5d6ff]">"Compounding Organic Pipeline Growth"</span>
};`,
`<span class="text-[#8b949e]"># Service: Social Media Channel Strategy</span>
<span class="text-[#ff7b72]">channel_orchestration</span>:
  - <span class="text-[#a5d6ff]">LinkedIn</span>
  - <span class="text-[#a5d6ff]">Instagram</span>
  - <span class="text-[#a5d6ff]">TikTok</span>
  - <span class="text-[#a5d6ff]">X</span>

<span class="text-[#79c0ff]">community_engines</span>:
  <span class="text-[#a5d6ff]">cadence</span>: <span class="text-[#a5d6ff]">"High-Velocity Short-Form Pipelines"</span>
  <span class="text-[#a5d6ff]">objective</span>: <span class="text-[#a5d6ff]">"Followers to Brand Advocates"</span>
  <span class="text-[#a5d6ff]">result</span>: <span class="text-[#a5d6ff]">"Compounding Recurring Revenue"</span>`,
`<span class="text-[#8b949e]">/**
 * Service: Content Production
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">creativeStudio</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"Content Production"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"High-Impact Video, Motion & Copy Assets"</span>,
  <span class="text-[#a5d6ff]">"disciplines"</span>: [
    <span class="text-[#a5d6ff]">"Commercial Video Production"</span>,
    <span class="text-[#a5d6ff]">"2D/3D Motion Graphics"</span>,
    <span class="text-[#a5d6ff]">"Product & Studio Photography"</span>,
    <span class="text-[#a5d6ff]">"Direct-Response Copywriting"</span>
  ],
  <span class="text-[#a5d6ff]">"focus"</span>: <span class="text-[#a5d6ff]">"Maximum Audience Retention"</span>
};`,
`<span class="text-[#8b949e]">/**
 * Service: App Marketing
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">appMarketingStack</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"App Marketing"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Scalable User Acquisition Funnels & LiveOps"</span>,
  <span class="text-[#a5d6ff]">"aso"</span>: [<span class="text-[#a5d6ff]">"Keyword Indexing"</span>, <span class="text-[#a5d6ff]">"Custom Product Pages"</span>, <span class="text-[#a5d6ff]">"A/B Icon/Video Tests"</span>],
  <span class="text-[#a5d6ff]">"user_acquisition"</span>: [<span class="text-[#a5d6ff]">"Apple Search Ads"</span>, <span class="text-[#a5d6ff]">"Google UAC"</span>, <span class="text-[#a5d6ff]">"Meta & TikTok UA"</span>],
  <span class="text-[#a5d6ff]">"liveops"</span>: [<span class="text-[#a5d6ff]">"In-App Events"</span>, <span class="text-[#a5d6ff]">"Push Notifications"</span>, <span class="text-[#a5d6ff]">"Retention Frameworks"</span>]
};`,
`<span class="text-[#8b949e]">/**
 * Service: Brand Identity
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">brandArchitecture</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"Brand Identity"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Market-Tested Positioning & Distinctive Brand Voice"</span>,
  <span class="text-[#a5d6ff]">"elements"</span>: [
    <span class="text-[#a5d6ff]">"Strategic Brand Narrative"</span>,
    <span class="text-[#a5d6ff]">"Naming Architecture"</span>,
    <span class="text-[#a5d6ff]">"Visual Identity Guidelines"</span>,
    <span class="text-[#a5d6ff]">"Design Collateral Systems"</span>
  ],
  <span class="text-[#a5d6ff]">"market_impact"</span>: <span class="text-[#a5d6ff]">"High-Value Differentiation in Crowded Spaces"</span>
};`,
`<span class="text-[#8b949e]"># Service: System Integration & CRM Plumbing</span>
<span class="text-[#ff7b72]">type</span> <span class="text-[#79c0ff]">SystemIntegration</span> {
  <span class="text-[#a5d6ff]">service</span>: <span class="text-[#a5d6ff]">"System Integration"</span>
  <span class="text-[#a5d6ff]">tagline</span>: <span class="text-[#a5d6ff]">"CRM Plumbing, Data Pipelines & Attribution Models"</span>
  <span class="text-[#a5d6ff]">crm_integrations</span>: [<span class="text-[#a5d6ff]">"Salesforce"</span>, <span class="text-[#a5d6ff]">"HubSpot"</span>, <span class="text-[#a5d6ff]">"Custom Backend"</span>]
  <span class="text-[#a5d6ff]">data_pipelines</span>: [<span class="text-[#a5d6ff]">"Real-Time Kafka"</span>, <span class="text-[#a5d6ff]">"Airflow Orchestration"</span>]
  <span class="text-[#a5d6ff]">attribution</span>: <span class="text-[#a5d6ff]">"Multi-Touch Attribution Tracking"</span>
  <span class="text-[#a5d6ff]">reliability</span>: <span class="text-[#a5d6ff]">"Zero Revenue & Data Leakage"</span>
}`,
`<span class="text-[#8b949e]">/**
 * Service: UI/UX Design System
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">DesignSystem</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"UI/UX Design"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Intuitive Interfaces That Drive User Adoption"</span>,
  <span class="text-[#a5d6ff]">"artifacts"</span>: [
    <span class="text-[#a5d6ff]">"Frictionless Wireframes"</span>,
    <span class="text-[#a5d6ff]">"Interactive Prototypes"</span>,
    <span class="text-[#a5d6ff]">"Multi-Theme Token Systems"</span>
  ],
  <span class="text-[#a5d6ff]">"outcomes"</span>: <span class="text-[#a5d6ff]">"Increased Product Adoption & Long-Term Retention"</span>
};`,
`<span class="text-[#8b949e]">/**
 * Service: Custom Software Development
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">customSoftware</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"Custom Software"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"End-to-End Enterprise Systems & Cloud Foundations"</span>,
  <span class="text-[#a5d6ff]">"architecture"</span>: [<span class="text-[#a5d6ff]">"Microservices"</span>, <span class="text-[#a5d6ff]">"Multi-Region Cloud"</span>, <span class="text-[#a5d6ff]">"Zero-Trust"</span>],
  <span class="text-[#a5d6ff]">"stack"</span>: [<span class="text-[#a5d6ff]">"React"</span>, <span class="text-[#a5d6ff]">"Node.js"</span>, <span class="text-[#a5d6ff]">"Go"</span>, <span class="text-[#a5d6ff]">"Python"</span>, <span class="text-[#a5d6ff]">"Kubernetes"</span>],
  <span class="text-[#a5d6ff]">"sla"</span>: <span class="text-[#a5d6ff]">"99.999% Zero-Downtime Guarantee"</span>
};`,
`<span class="text-[#8b949e]">/* Service: Mobile Development */</span>
<span class="text-[#ff7b72]">import</span> SwiftUI

<span class="text-[#ff7b72]">struct</span> <span class="text-[#79c0ff]">MobileEngineering</span>: <span class="text-[#79c0ff]">View</span> {
    <span class="text-[#ff7b72]">let</span> service = <span class="text-[#a5d6ff]">"Mobile Development"</span>
    <span class="text-[#ff7b72]">let</span> tagline = <span class="text-[#a5d6ff]">"High-Performance Native & Cross-Platform"</span>
    <span class="text-[#ff7b72]">let</span> frameworks = [<span class="text-[#a5d6ff]">"SwiftUI"</span>, <span class="text-[#a5d6ff]">"Kotlin"</span>, <span class="text-[#a5d6ff]">"React Native"</span>, <span class="text-[#a5d6ff]">"Flutter"</span>]
    <span class="text-[#ff7b72]">let</span> features = [<span class="text-[#a5d6ff]">"Offline Sync"</span>, <span class="text-[#a5d6ff]">"Local Caching"</span>, <span class="text-[#a5d6ff]">"Native Hardware"</span>]
}`,
`<span class="text-[#8b949e]">/**
 * Service: QA & Testing
 */</span>
<span class="text-[#ff7b72]">import</span> { test, expect } <span class="text-[#ff7b72]">from</span> <span class="text-[#a5d6ff]">'@playwright/test'</span>;

test(<span class="text-[#a5d6ff]">'end-to-end system reliability and defect prevention pass'</span>, <span class="text-[#ff7b72]">async</span> ({ page }) =&gt; {
  <span class="text-[#ff7b72]">await</span> page.goto(<span class="text-[#a5d6ff]">'/production-release'</span>);
  <span class="text-[#ff7b72]">await</span> expect(page.locator(<span class="text-[#a5d6ff]'#defect-free-score'</span>)).toHaveText(<span class="text-[#a5d6ff]'100% Verified'</span>);
});`,
`<span class="text-[#8b949e]">/**
 * Service: Staff Augmentation
 */</span>
<span class="text-[#ff7b72]">export const</span> <span class="text-[#79c0ff]">staffAugmentation</span> = {
  <span class="text-[#a5d6ff]">"service"</span>: <span class="text-[#a5d6ff]">"Staff Augmentation"</span>,
  <span class="text-[#a5d6ff]">"tagline"</span>: <span class="text-[#a5d6ff]">"Flexible Technical Capacity & Embedded Pods"</span>,
  <span class="text-[#a5d6ff]">"capacity_models"</span>: [
    <span class="text-[#a5d6ff]">"Fractional Specialized Engineers"</span>,
    <span class="text-[#a5d6ff]">"Full-Time Dedicated Engineering Pods"</span>
  ],
  <span class="text-[#a5d6ff]">"vetting_standard"</span>: <span class="text-[#a5d6ff]">"Top 1% Global Engineering Talent"</span>
};`
    ];

    const serviceNames = [
      "Paid Advertising",
      "SEO",
      "Social Media",
      "Content Production",
      "App Marketing",
      "Brand Identity",
      "System Integration",
      "UI/UX Design",
      "Custom Software",
      "Mobile Development",
      "QA & Testing",
      "Staff Augmentation"
    ];

    let currentServiceIndex = -1;
    
    $(document).off('mouseenter click', '.animate-\\[spin_60s_linear_infinite_reverse\\] > button');
    $(document).on('mouseenter click', '.animate-\\[spin_60s_linear_infinite_reverse\\] > button', function() {
      const section = $(this).closest('section');
      const serviceNodes = section.find('.animate-\\[spin_60s_linear_infinite_reverse\\] > button');
      const index = serviceNodes.index(this);
      
      // Update the visual state of all nodes
      serviceNodes.each(function(i) {
        const btn = $(this);
        const container = btn.parent().parent();
        const line = container.find('line');
        
        if (i === index) {
          // Active state
          btn.removeClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]')
             .addClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]');
          line.attr('stroke', '#58a6ff').attr('stroke-width', '2');
        } else {
          // Inactive state
          btn.removeClass('bg-[#161b22] border-[#58a6ff] text-[#58a6ff] scale-125 shadow-[0_0_20px_rgba(88,166,255,0.4)]')
             .addClass('bg-[#0d1117] border-[#30363d] text-[#8b949e]');
          line.attr('stroke', 'rgba(255,255,255,0.05)').attr('stroke-width', '1');
        }
      });
      
      // Update center text
      if (index >= 0 && index < serviceNames.length) {
        const centerTextEl = section.find('.topology-center-text');
        if (centerTextEl.length) {
          centerTextEl.text(serviceNames[index]);
        }
      }

      // Update terminal IDE text
      if (index >= 0 && index < serviceContents.length) {
        if (currentServiceIndex !== index) {
          currentServiceIndex = index;
          const ideFilenameEl = section.find('#ide-filename');
          const ideContentEl = section.find('#ide-content');
          if (ideFilenameEl.length && ideContentEl.length) {
            ideFilenameEl.text(serviceFiles[index]);
            typeHTML(serviceContents[index], ideContentEl);
          }
        }
      }
    });
  
}