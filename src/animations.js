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
  
  $('section h2, section p, .client-logos, .section-card').not('.hero *, #partnership-accordion *, #partnership-accordion p, .group *').each(function() {
    $(this).addClass('transition-all duration-1000 transform opacity-0 translate-y-10');
    observer.observe(this);
  });
  
  $('h3.text-2xl, h3.text-4xl').not('.group *, #partnership-accordion *').each(function() {
    $(this).addClass('transition-all duration-1000 transform opacity-0 translate-y-10');
    observer.observe(this);
  });



  // Window function for bulletproof accordion toggling
  if (typeof window !== 'undefined') {
    window.selectPartnershipItem = function(element) {
      const parent = element.parentElement;
      if (!parent) return;
      Array.from(parent.children).forEach(child => {
        child.classList.remove('bg-[#161A22]', 'border-l-[#FFFFFF]', 'pl-10');
        child.classList.add('border-l-transparent');
        const h3 = child.querySelector('h3');
        if (h3) { h3.classList.remove('text-white'); h3.classList.add('text-white/60'); }
        const mono = child.querySelector('.font-mono');
        if (mono) { mono.classList.remove('text-[#FFFFFF]'); mono.classList.add('text-white/40'); }
        const body = child.querySelector('.overflow-hidden');
        if (body) {
          body.classList.remove('max-h-40', 'opacity-100', 'mt-4');
          body.classList.add('max-h-0', 'opacity-0', 'mt-0');
          body.style.maxHeight = '0px';
          body.style.opacity = '0';
          const p = body.querySelector('p');
          if (p) {
            p.classList.remove('opacity-100', 'translate-y-0');
            p.style.opacity = '0';
          }
          const icon = body.querySelector('i');
          if (icon) {
            icon.style.opacity = '0';
          }
        }
      });
      element.classList.add('bg-[#161A22]', 'border-l-[#FFFFFF]', 'pl-10');
      element.classList.remove('border-l-transparent');
      const h3 = element.querySelector('h3');
      if (h3) { h3.classList.add('text-white'); h3.classList.remove('text-white/60'); }
      const mono = element.querySelector('.font-mono');
      if (mono) { mono.classList.add('text-[#FFFFFF]'); mono.classList.remove('text-white/40'); }
      const body = element.querySelector('.overflow-hidden');
      if (body) {
        body.classList.remove('max-h-0', 'opacity-0', 'mt-0');
        body.classList.add('max-h-40', 'opacity-100', 'mt-4');
        body.style.maxHeight = '300px';
        body.style.opacity = '1';
        const p = body.querySelector('p');
        if (p) {
          p.classList.remove('opacity-0', 'translate-y-10');
          p.classList.add('opacity-100', 'translate-y-0');
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
          p.style.color = '#F9FAFB';
          p.style.display = 'block';
        }
        const icon = body.querySelector('i');
        if (icon) {
          icon.style.opacity = '1';
          icon.style.color = '#FFFFFF';
          icon.style.display = 'inline-block';
        }
      }
    };
  }

  // Ensure events are attached only once
  $(document).off('click', '#partnership-accordion > div');
  $(document).on('click', '#partnership-accordion > div', function() {
    if (window.selectPartnershipItem) {
      window.selectPartnershipItem(this);
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
          terminalHeader.html(`<i class="bi bi-file-earmark-code text-[#9CA3AF] mr-2"></i>${servicesData[key].filename}<i class="bi bi-x ml-4 text-[#9CA3AF] hover:text-[#F9FAFB] cursor-pointer"></i>`);
          
          let code = servicesData[key].content;
          code = code.replace(/("[^"]*")/g, '<span class="text-[#F9FAFB]">$1</span>');
          code = code.replace(/(\b(?:def|return|export|const|describe|it|expect|struct|let|type)\b)/g, '<span class="text-[#FFFFFF]">$1</span>');
          
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

  $(document).off('mouseenter', 'tr.group, .service-item, .group.hover\\:bg-\\[\\#FFFFFF\\]');
  $(document).on('mouseenter', 'tr.group, .service-item, .group.hover\\:bg-\\[\\#FFFFFF\\]', function() {
    const title = $(this).find('h2').text().trim() || $(this).find('h3').text().trim() || $(this).text().trim();
    const contextEl = $(this).closest('main');
    updateTerminal(title, contextEl);
  });
  
  // Replaced by scoped network topology handlers

  // Hero Slider State & Function (15s auto-slide)
  let currentHeroSlide = 0;
  let heroSliderInterval;

  function goToHeroSlide(index) {
    const heroSlider = $('#hero-slider');
    if (!heroSlider.length) return;

    const textSlides = heroSlider.find('.max-w-2xl > div');
    const graphicSlides = heroSlider.find('> .absolute.inset-0.z-0 > .absolute.inset-0');
    const totalSlides = textSlides.length;
    if (totalSlides === 0) return;

    currentHeroSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    textSlides.each(function(i) {
      if (i === currentHeroSlide) {
        $(this).removeClass('opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none').addClass('opacity-100 translate-y-0 relative');
      } else {
        $(this).removeClass('opacity-100 translate-y-0 relative').addClass('opacity-0 translate-y-[20px] absolute inset-x-0 top-0 pointer-events-none');
      }
    });

    graphicSlides.each(function(i) {
      if (i === currentHeroSlide) {
        $(this).removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
      } else {
        $(this).removeClass('opacity-100').addClass('opacity-0 pointer-events-none');
      }
    });
  }

  function startHeroSlider() {
    clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(() => {
      const heroSlider = $('#hero-slider');
      if (heroSlider.length) {
        goToHeroSlide(currentHeroSlide + 1);
      }
    }, 15000);
  }

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

  // Initialize hero slider to first slide and start 15s auto-slide
  setTimeout(() => {
    goToHeroSlide(0);
    startHeroSlider();
  }, 100);

  // Smooth scroll for Contact anchor links
  $(document).off('click', 'a[href="#contact"]');
  $(document).on('click', 'a[href="#contact"]', function(e) {
    const target = $('#contact');
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 600);
    }
  });

  
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
          $(this).css('color', 'rgba(255, 255, 255, 0.25)');
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
      "\\$ mollistech architect --init\nBuilding scalable architecture...\n[████████████████████] 100%\n\nStatus: System Robust & Performant.",
      "\\$ mollistech deploy --pipeline=production\nRunning zero-downtime deployment...\n[████████████████████] 100%\n\nStatus: All Checks Passed.",
      "\\$ mollistech audit --strict\nRunning security audit on production...\n[████████████████████] 100%\n\nResults:\n> 0 Vulnerabilities Found\n> Zero-Trust Configuration: Valid\n> Data Encryption: AES-256 Active\n\nStatus: Secure."
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
              iconEl.attr('class', `${data.icon} text-8xl md:text-9xl text-[#FFFFFF] opacity-40 transition-all duration-500`).removeClass('hidden');
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
`<span class="text-[#9CA3AF]">/**
 * Service: Paid Advertising
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">adStrategy</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"Paid Advertising"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Media Buying Managed Against Contribution Margin"</span>,
  <span class="text-[#F9FAFB]">"networks"</span>: [
    <span class="text-[#F9FAFB]">"Meta"</span>,
    <span class="text-[#F9FAFB]">"Google"</span>,
    <span class="text-[#F9FAFB]">"TikTok"</span>,
    <span class="text-[#F9FAFB]">"Programmatic"</span>
  ],
  <span class="text-[#F9FAFB]">"optimization"</span>: <span class="text-[#F9FAFB]">"Net Contribution Margins & Blended Returns"</span>
};`,
`<span class="text-[#9CA3AF]">/**
 * Service: SEO & Search Dominance
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">seoEngine</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"SEO"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Technical Audits & Topical Authority Mapping"</span>,
  <span class="text-[#F9FAFB]">"audits"</span>: [<span class="text-[#F9FAFB]">"Core Web Vitals"</span>, <span class="text-[#F9FAFB]">"Crawl Architecture"</span>, <span class="text-[#F9FAFB]">"Schema"</span>],
  <span class="text-[#F9FAFB]">"strategy"</span>: [<span class="text-[#F9FAFB]">"Topical Authority Mapping"</span>, <span class="text-[#F9FAFB]">"Digital PR Outreach"</span>],
  <span class="text-[#F9FAFB]">"outcome"</span>: <span class="text-[#F9FAFB]">"Compounding Organic Pipeline Growth"</span>
};`,
`<span class="text-[#9CA3AF]"># Service: Social Media Channel Strategy</span>
<span class="text-[#FFFFFF]">channel_orchestration</span>:
  - <span class="text-[#F9FAFB]">LinkedIn</span>
  - <span class="text-[#F9FAFB]">Instagram</span>
  - <span class="text-[#F9FAFB]">TikTok</span>
  - <span class="text-[#F9FAFB]">X</span>

<span class="text-[#FFFFFF]">community_engines</span>:
  <span class="text-[#F9FAFB]">cadence</span>: <span class="text-[#F9FAFB]">"High-Velocity Short-Form Pipelines"</span>
  <span class="text-[#F9FAFB]">objective</span>: <span class="text-[#F9FAFB]">"Followers to Brand Advocates"</span>
  <span class="text-[#F9FAFB]">result</span>: <span class="text-[#F9FAFB]">"Compounding Recurring Revenue"</span>`,
`<span class="text-[#9CA3AF]">/**
 * Service: Content Production
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">creativeStudio</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"Content Production"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"High-Impact Video, Motion & Copy Assets"</span>,
  <span class="text-[#F9FAFB]">"disciplines"</span>: [
    <span class="text-[#F9FAFB]">"Commercial Video Production"</span>,
    <span class="text-[#F9FAFB]">"2D/3D Motion Graphics"</span>,
    <span class="text-[#F9FAFB]">"Product & Studio Photography"</span>,
    <span class="text-[#F9FAFB]">"Direct-Response Copywriting"</span>
  ],
  <span class="text-[#F9FAFB]">"focus"</span>: <span class="text-[#F9FAFB]">"Maximum Audience Retention"</span>
};`,
`<span class="text-[#9CA3AF]">/**
 * Service: App Marketing
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">appMarketingStack</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"App Marketing"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Scalable User Acquisition Funnels & LiveOps"</span>,
  <span class="text-[#F9FAFB]">"aso"</span>: [<span class="text-[#F9FAFB]">"Keyword Indexing"</span>, <span class="text-[#F9FAFB]">"Custom Product Pages"</span>, <span class="text-[#F9FAFB]">"A/B Icon/Video Tests"</span>],
  <span class="text-[#F9FAFB]">"user_acquisition"</span>: [<span class="text-[#F9FAFB]">"Apple Search Ads"</span>, <span class="text-[#F9FAFB]">"Google UAC"</span>, <span class="text-[#F9FAFB]">"Meta & TikTok UA"</span>],
  <span class="text-[#F9FAFB]">"liveops"</span>: [<span class="text-[#F9FAFB]">"In-App Events"</span>, <span class="text-[#F9FAFB]">"Push Notifications"</span>, <span class="text-[#F9FAFB]">"Retention Frameworks"</span>]
};`,
`<span class="text-[#9CA3AF]">/**
 * Service: Brand Identity
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">brandArchitecture</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"Brand Identity"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Market-Tested Positioning & Distinctive Brand Voice"</span>,
  <span class="text-[#F9FAFB]">"elements"</span>: [
    <span class="text-[#F9FAFB]">"Strategic Brand Narrative"</span>,
    <span class="text-[#F9FAFB]">"Naming Architecture"</span>,
    <span class="text-[#F9FAFB]">"Visual Identity Guidelines"</span>,
    <span class="text-[#F9FAFB]">"Design Collateral Systems"</span>
  ],
  <span class="text-[#F9FAFB]">"market_impact"</span>: <span class="text-[#F9FAFB]">"High-Value Differentiation in Crowded Spaces"</span>
};`,
`<span class="text-[#9CA3AF]"># Service: System Integration & CRM Plumbing</span>
<span class="text-[#FFFFFF]">type</span> <span class="text-[#FFFFFF]">SystemIntegration</span> {
  <span class="text-[#F9FAFB]">service</span>: <span class="text-[#F9FAFB]">"System Integration"</span>
  <span class="text-[#F9FAFB]">tagline</span>: <span class="text-[#F9FAFB]">"CRM Plumbing, Data Pipelines & Attribution Models"</span>
  <span class="text-[#F9FAFB]">crm_integrations</span>: [<span class="text-[#F9FAFB]">"Salesforce"</span>, <span class="text-[#F9FAFB]">"HubSpot"</span>, <span class="text-[#F9FAFB]">"Custom Backend"</span>]
  <span class="text-[#F9FAFB]">data_pipelines</span>: [<span class="text-[#F9FAFB]">"Real-Time Kafka"</span>, <span class="text-[#F9FAFB]">"Airflow Orchestration"</span>]
  <span class="text-[#F9FAFB]">attribution</span>: <span class="text-[#F9FAFB]">"Multi-Touch Attribution Tracking"</span>
  <span class="text-[#F9FAFB]">reliability</span>: <span class="text-[#F9FAFB]">"Zero Revenue & Data Leakage"</span>
}`,
`<span class="text-[#9CA3AF]">/**
 * Service: UI/UX Design System
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">DesignSystem</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"UI/UX Design"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Intuitive Interfaces That Drive User Adoption"</span>,
  <span class="text-[#F9FAFB]">"artifacts"</span>: [
    <span class="text-[#F9FAFB]">"Frictionless Wireframes"</span>,
    <span class="text-[#F9FAFB]">"Interactive Prototypes"</span>,
    <span class="text-[#F9FAFB]">"Multi-Theme Token Systems"</span>
  ],
  <span class="text-[#F9FAFB]">"outcomes"</span>: <span class="text-[#F9FAFB]">"Increased Product Adoption & Long-Term Retention"</span>
};`,
`<span class="text-[#9CA3AF]">/**
 * Service: Custom Software Development
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">customSoftware</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"Custom Software"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"End-to-End Enterprise Systems & Cloud Foundations"</span>,
  <span class="text-[#F9FAFB]">"architecture"</span>: [<span class="text-[#F9FAFB]">"Microservices"</span>, <span class="text-[#F9FAFB]">"Multi-Region Cloud"</span>, <span class="text-[#F9FAFB]">"Zero-Trust"</span>],
  <span class="text-[#F9FAFB]">"stack"</span>: [<span class="text-[#F9FAFB]">"React"</span>, <span class="text-[#F9FAFB]">"Node.js"</span>, <span class="text-[#F9FAFB]">"Go"</span>, <span class="text-[#F9FAFB]">"Python"</span>, <span class="text-[#F9FAFB]">"Kubernetes"</span>],
  <span class="text-[#F9FAFB]">"sla"</span>: <span class="text-[#F9FAFB]">"99.999% Zero-Downtime Guarantee"</span>
};`,
`<span class="text-[#9CA3AF]">/* Service: Mobile Development */</span>
<span class="text-[#FFFFFF]">import</span> SwiftUI

<span class="text-[#FFFFFF]">struct</span> <span class="text-[#FFFFFF]">MobileEngineering</span>: <span class="text-[#FFFFFF]">View</span> {
    <span class="text-[#FFFFFF]">let</span> service = <span class="text-[#F9FAFB]">"Mobile Development"</span>
    <span class="text-[#FFFFFF]">let</span> tagline = <span class="text-[#F9FAFB]">"High-Performance Native & Cross-Platform"</span>
    <span class="text-[#FFFFFF]">let</span> frameworks = [<span class="text-[#F9FAFB]">"SwiftUI"</span>, <span class="text-[#F9FAFB]">"Kotlin"</span>, <span class="text-[#F9FAFB]">"React Native"</span>, <span class="text-[#F9FAFB]">"Flutter"</span>]
    <span class="text-[#FFFFFF]">let</span> features = [<span class="text-[#F9FAFB]">"Offline Sync"</span>, <span class="text-[#F9FAFB]">"Local Caching"</span>, <span class="text-[#F9FAFB]">"Native Hardware"</span>]
}`,
`<span class="text-[#9CA3AF]">/**
 * Service: QA & Testing
 */</span>
<span class="text-[#FFFFFF]">import</span> { test, expect } <span class="text-[#FFFFFF]">from</span> <span class="text-[#F9FAFB]">'@playwright/test'</span>;

test(<span class="text-[#F9FAFB]">'end-to-end system reliability and defect prevention pass'</span>, <span class="text-[#FFFFFF]">async</span> ({ page }) =&gt; {
  <span class="text-[#FFFFFF]">await</span> page.goto(<span class="text-[#F9FAFB]">'/production-release'</span>);
  <span class="text-[#FFFFFF]">await</span> expect(page.locator(<span class="text-[#F9FAFB]'#defect-free-score'</span>)).toHaveText(<span class="text-[#F9FAFB]'100% Verified'</span>);
});`,
`<span class="text-[#9CA3AF]">/**
 * Service: Staff Augmentation
 */</span>
<span class="text-[#FFFFFF]">export const</span> <span class="text-[#FFFFFF]">staffAugmentation</span> = {
  <span class="text-[#F9FAFB]">"service"</span>: <span class="text-[#F9FAFB]">"Staff Augmentation"</span>,
  <span class="text-[#F9FAFB]">"tagline"</span>: <span class="text-[#F9FAFB]">"Flexible Technical Capacity & Embedded Pods"</span>,
  <span class="text-[#F9FAFB]">"capacity_models"</span>: [
    <span class="text-[#F9FAFB]">"Fractional Specialized Engineers"</span>,
    <span class="text-[#F9FAFB]">"Full-Time Dedicated Engineering Pods"</span>
  ],
  <span class="text-[#F9FAFB]">"vetting_standard"</span>: <span class="text-[#F9FAFB]">"Top 1% Global Engineering Talent"</span>
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
          // Active state (Brown accent, white text)
          btn.removeClass('bg-[#111419] bg-[#0B0C0E] border-[rgba(255,255,255,0.08)]')
             .addClass('bg-[#161A22] border-[#FFFFFF] text-white scale-125 shadow-[0_0_20px_rgba(200,83,25,0.4)]');
          line.attr('stroke', '#FFFFFF').attr('stroke-width', '2');
        } else {
          // Inactive state (Dark bg, white text, faint white line)
          btn.removeClass('bg-[#161A22] bg-[#161A22] border-[#FFFFFF] scale-125 shadow-[0_0_20px_rgba(200,83,25,0.4)]')
             .addClass('bg-[#0B0C0E] border-[rgba(255,255,255,0.08)] text-white');
          line.attr('stroke', 'rgba(255, 255, 255, 0.15)').attr('stroke-width', '1');
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