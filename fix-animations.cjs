const fs = require('fs');
let code = fs.readFileSync('src/animations.js', 'utf8');

code = code.replace(/}\n*$/g, `
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
          if($(this).find('.bg-\\\\[\\\\#1868DB\\\\]').length > 0 || $(this).find('.bg-\\[\\#1868DB\\]').length > 0 || $(this).find('.bg-[#1868DB]').length > 0) {
            activeIndex = i;
          }
        });
        
        let nextIndex = activeIndex + 1;
        if(nextIndex >= buttons.length) nextIndex = 0;
        
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
`);

fs.writeFileSync('src/animations.js', code);
