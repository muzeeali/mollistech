const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

const lastPart = `
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
    $(this).toggleClass('bi-list bi-x');
    
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
      $('.mobile-nav-toggle').removeClass('bi-x').addClass('bi-list');
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
          if ($(this).find('span.text-\\\\[\\\\#101214\\\\]').length > 0 || $(this).find('span').hasClass('text-[#101214]')) {
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
`;

code = code.substring(0, code.indexOf('$(document).off(\'click\', \'#hero-slider .bottom-12 button\');')) + lastPart;
fs.writeFileSync('src/animations.js', code);
