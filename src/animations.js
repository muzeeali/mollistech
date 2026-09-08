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
      content: `{\n  "title": "Cybersecurity & Cloud Security",\n  "description": "Security is embedded into our architecture, development, and cloud operations to ensure resilient systems.",\n  "protocols": ["Zero-Trust", "OAuth 2.0", "AES-256"]\n}`
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
  $(document).on('click', '#hero-slider .bottom-12 button', function() {
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
}
