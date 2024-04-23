$( document ).ready(function() {
  AOS.init({
    startEvent: 'DOMContentLoaded',
    delay: 0,
    duration: 1000,
    offset: 0,
  });

  Fancybox.bind('[data-fancybox="video-1"]', {
    trapFocus: true,
    Thumbs: false
  });

  Fancybox.bind('[data-fancybox="video-2"]', {
    trapFocus: true,
    Thumbs: false
  });

  $.validator.messages.required = 'Пожалуйста, введите данные';

  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
  }, "Поле может состоять только из букв");

  jQuery.validator.addMethod("phone", function (value, element) {
    if (value.startsWith('+375')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
    } else if (value.startsWith('+7')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
    } else {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
    }
  }, "Введите полный номер");

  let phone = document.querySelectorAll('.phone-mask')

  if(phone.length) {
    phone.forEach(element => {
      IMask(element, {
        mask: [
          {
            mask: '+{375} (00) 000 00 00',
            startsWith: '375',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],

        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');

          return dynamicMasked.compiledMasks.find(function (m) {
            return number.indexOf(m.startsWith) === 0;
          });
        }
      })
    });
  }

  window.addEventListener('load', function() {
    const header = document.querySelector('.header');
    const middle = document.getElementById('middle');

    function checkScroll() {
      if (window.scrollY > header.offsetHeight) {
        header.classList.add('active');
        middle.classList.add('active');
      } else {
        header.classList.remove('active');
        middle.classList.remove('active');
      }
    }

    checkScroll();

    window.addEventListener('scroll', checkScroll);
  });

  function heightAuto(element) {
    setTimeout(() => {
      const visibleEl = element.querySelectorAll('.is-visible')
      let heights = []

      visibleEl.forEach(el => {
        let height = el.offsetHeight

        heights.push(height)
    });

      const maxHeight = Math.max(...heights)
      const list = element.querySelector('.splide__list')

      list.style.height = maxHeight + 'px'
    }, 1);
  }

  const reviews = document.querySelector('.reviews-splide')
  if(reviews) {
   const reviewsSlider = new Splide( '.reviews-splide', {
      type: "slide",
      perPage: 2,
      gap: 20,
      pagination: false,

      breakpoints: {
        1024: {
          gap: 10
        },

        768: {
          perPage: 1,
          autoHeight: true,
        },
      },
    }).mount();
    reviewsSlider.on('mounted moved', () => {
      heightAuto(reviews)
    })
  }

  const publications = document.querySelector('.publications-splide')

  if(publications) {
    const publicationsSlider = new Splide( '.publications-splide', {
      type: "slide",
      perPage: 2,
      gap: 20,
      pagination: false,

      breakpoints: {
        1024: {
          gap: 10
        },

        768: {
          perPage: 1,
          autoHeight: true
        }
      },
    }).mount();
    publicationsSlider.on('mounted moved', () => {
      heightAuto(publications)
    })
  }

  const way = document.querySelector('.way-splide')

  if(way) {
    const waySlider = new Splide( '.way-splide', {
      type: "slide",
      // perPage: "auto",
      gap: 0,
      pagination: false,
      autoWidth: true,
    }).mount();
  }

  const anchorLink = document.querySelectorAll('.anchor-link')

  console.log(anchorLink)

  if(anchorLink.length) {
    anchorLink.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault()

        const el = document.getElementById(`${element.dataset.anchor}`)

        let offset = (el.getBoundingClientRect().top + window.pageYOffset) - document.querySelector('.header').clientHeight

        if(el.dataset.aos) {
          offset = offset - 100
        }

        window.scrollTo({
          behavior: 'smooth',
          top: offset
        })
      })
    });
  }
})

function showPopup() {
  $.magnificPopup.open({
    items: { src: './popup/success.html' },
    type: 'ajax',
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $('.mfp-wrap').addClass('not_delay');
          $('.white-popup').addClass('not_delay');
        }, 700);
      }
    },
  });
}