
let slideUp = (target, duration=500) => {
  
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    faqSlideCheck = true;
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    faqSlideCheck = true;
  }, duration);
}

function galleryPopup(arg) {

  let html = arg.html,
      body = arg.body,
      widthImage = (arg.widthImage) ? arg.widthImage : '70%',
      link = arg.link;

  let galleryPopupBlock = 
          `
          <div class="_gallery-popup _hidden">
              <div class="_gallery-popup-bg"></div>
              <div class="_gallery-popup-body _gallery-popup-max">
                  <button type="button" class="_gallery-popup-close-btn">
                    ✕
                  </button>
                  <img src="${link.href}" class="_gallery-popup-img" alt="Image Not Found">
              </div>
          </div>
          
          `;

    body.insertAdjacentHTML('beforeend', galleryPopupBlock);
    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    body.classList.add('_popup-active');
    
    let galleryPopup = document.querySelector('._gallery-popup');

    galleryPopup.style.setProperty('--max-width-image', widthImage);
    galleryPopup.style.setProperty('--width-image', document.querySelector('._gallery-popup-img').clientWidth + 'px');

    setTimeout(function() {
      galleryPopup.classList.remove('_hidden');
    },200);



    function removeGalleryPopup() {
      galleryPopup.classList.add('_hidden');
      setTimeout(function() {
        body.removeChild(galleryPopup);
        body.classList.remove('_popup-active');
        html.style.setProperty('--popup-padding', '0px');
      },200);
    }



    galleryPopup.querySelector('._gallery-popup-close-btn').addEventListener('click', function() {
      removeGalleryPopup();
    });
    galleryPopup.querySelector('._gallery-popup-bg').addEventListener('click', function() {
      removeGalleryPopup();
    });



}







const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



document.querySelectorAll('.faq__item').forEach(element => {
  
  if(!element.classList.contains('_active')) {
    element.querySelector('.faq__item--content').style.display = 'none'
  }
  
})

document.querySelectorAll('.product__color--elem._active').forEach(element => {

  element.querySelector('.product__color--radio').checked = true;

  let productImage        = document.querySelector('#' + element.dataset.productImageId);

      productImage.classList.add('_active');
      productImage.style.display = 'block';

})


let thisTarget, faqSlideCheck = true;
body.addEventListener('click', function (e) {

    thisTarget = e.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }




    let btnToScroll = thisTarget.closest('._btn-to-scroll');
    if(btnToScroll) {

        e.preventDefault();
        let section;

        try {
          section = document.querySelector(btnToScroll.getAttribute('href'));
        }
        catch {
          section = 0;
        }


        menu.forEach(elem => {
          elem.classList.remove('_active')
        })
        window.scroll({
            left: 0, 
            top: (section) ? section.offsetTop : 0,
            behavior: 'smooth'
        })
    
    }





    let dropDownCurrent = thisTarget.closest('._drop-down-current'),
    dropDownParent = (dropDownCurrent) ? dropDownCurrent.closest('._drop-down') : false;
    if (dropDownCurrent) {

        if (!dropDownParent.classList.contains('_active')) {
            dropDownParent.classList.add('_active');
        }

    } else if (!thisTarget.closest('._drop-down')) {

        document.querySelectorAll('._drop-down').forEach(element => {
            element.classList.remove('_active');
        })

    }







    let productElemBtn = thisTarget.closest('.product__color--elem');
    if(productElemBtn) {

      if(!productElemBtn.classList.contains('_active')) {
        
        e.preventDefault();
        
        document.querySelectorAll('.product__color--elem._active').forEach(element => {
          element.classList.remove('_active');
        })
        productElemBtn.classList.add('_active');
        productElemBtn.querySelector('.product__color--radio').checked = true;
  
        
        
        let productImage        = document.querySelector('#' + productElemBtn.dataset.productImageId),
            activeProductImage  = document.querySelectorAll('.product__image--elem._active');

  
          activeProductImage.forEach(element => {
          element.classList.remove('_active');
          setTimeout(() => {
            element.style.display = 'none';
            
          },200)
  
        });
        
        
        setTimeout(() => {
          productImage.style.display = 'block';
        },(activeProductImage) ? 200 : 0)
        
        setTimeout(() => {
          productImage.style.display = 'block';
          productImage.classList.add('_active');
        },(activeProductImage) ? 400 : 200);

      }
      
    
    }




    let galleryLink = thisTarget.closest('._gallery-popup-link');
    if(galleryLink) {
      
      e.preventDefault();
      galleryPopup({
        link: galleryLink,
        html: html,
        body: body,
        widthImage: '80%',
      });


    }






    let faqTitle = thisTarget.closest('.faq__item--title');
    if(faqTitle) {

        let faqItem         = faqTitle.closest('.faq__item'),
            faqItemContent  = faqItem.querySelector('.faq__item--content');

        if(faqItem.classList.contains('_active') && faqSlideCheck) {
          faqSlideCheck = false;
          faqItem.classList.remove('_active');
          slideUp(faqItemContent);

        } else if(!faqItem.classList.contains('_active') && faqSlideCheck) {
          faqSlideCheck = false;
          document.querySelectorAll('.faq__item._active').forEach(element => {
            element.classList.remove('_active');
            slideUp(element.querySelector('.faq__item--content'));
          })

          faqItem.classList.add('_active');
          slideDown(faqItemContent);

        }

        
    
    }





    let hiddenBtn = thisTarget.closest('._hiddenBtn');
    if(hiddenBtn) {
      e.preventDefault();
      hiddenToggle(hiddenBtn.getAttribute('href')).show();
      document.querySelector(hiddenBtn.getAttribute('href')).classList.add('_active');
    }

})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let introSlider = new Swiper('.intro__slider', {
  
    spaceBetween: 0,
    slidesPerView: 1,
    
    direction: "horizontal",
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    /* navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, */
    breakpoints: {
      /* 992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      }, */
      768: {
        direction: "vertical",
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
});

new Swiper('.reviews__slider', {
  
  spaceBetween: 0,
  slidesPerView: 1,
  
  /* loop: true, */
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    600: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    /* 767: {
      direction: "vertical",
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    }, */
  }
});


let featuresSlider

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/


const hiddenToggleList = document.querySelectorAll('._hiddenToggle');

function hiddenToggle(id) {
    let elem    = document.querySelector(id),
        btn     = document.querySelector(`[href="${id}"]`);
    return {
        show: function () {

            if(elem && !elem.classList.contains('_active')) {
                btn.classList.remove('_visible');
                elem.querySelectorAll('._hiddenItem').forEach(element => {
                  element.style.display = 'block';
                })

            }
        },

        hide: function() {
          
            if(elem && !elem.classList.contains('_active')) {
              /* console.log(elem.querySelectorAll('._hiddenItem')); */
                btn.classList.add('_visible');
                elem.querySelectorAll('._hiddenItem').forEach(element => {
                  
                  element.style.display = 'none';
                })
            }
        }

    }
}


// =-=-=-=-=-=-=-=-=-=-=-=- <media event> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {},
    windowSize;


let append_992_Items = document.querySelectorAll('[data-append-992-to]'),
    append_992_ItemsList = [],
    append_768_Items = document.querySelectorAll('[data-append-768-to]'),
    append_768_ItemsList = [];

    append_992_Items.forEach(element => {
      append_992_ItemsList.push([element, element.parentNode]);
    })
    /* console.log(append_992_ItemsList); */
    append_768_Items.forEach(element => {
      append_768_ItemsList.push([element, element.parentNode]);
    })

      function resizeCheckFunc(size, minWidth, maxWidth) {
        

        if(windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
            resizeCheck[String(size)] = false;
            maxWidth(); // < size
            
        }
        if(windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
            resizeCheck[String(size)] = true;
            minWidth(); // > size
            
        }

      }
      


      function resize() {
        
      windowSize = window.innerWidth;
      

      resizeCheckFunc(769, 
        function () {  // screen > 768px
          
          for(let i = 0; i<append_768_ItemsList.length; i++) {
            let appendParent = document.querySelector(append_768_ItemsList[i][0].dataset['append-768To']);
            appendParent.append(append_768_ItemsList[i][0]);
          }

          if(featuresSlider) featuresSlider.destroy(true,true);

          hiddenToggle("#faq-list").show();
          
        },
        function () {  // screen < 768px

          hiddenToggle("#faq-list").hide();
          featuresSlider = new Swiper('.features__slider', {
  
            spaceBetween: 0,
            slidesPerView: 1,
            
            grid: {
              rows: 2,
            },
          
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
          });
          
          for(let i = 0; i<append_768_ItemsList.length; i++) {
            let appendParent = append_768_ItemsList[i][1];
            appendParent.append(append_768_ItemsList[i][0]); 
          }

      });
      resizeCheckFunc(992, 
        function () {  // screen > 992px

          for(let i = 0; i<append_992_ItemsList.length; i++) {
            let appendParent = document.querySelector(append_992_ItemsList[i][0].dataset['append-992To']);
            appendParent.append(append_992_ItemsList[i][0]);
          }
          
        },
        function () {  // screen < 992px
          
          for(let i = 0; i<append_768_ItemsList.length; i++) {
            let appendParent = document.querySelector(append_768_ItemsList[i][0].dataset['append-768To']);
            if(resizeCheck['992'] || append_768_ItemsList[i][0].dataset['append-992To']) {
              appendParent.append(append_768_ItemsList[i][0]);
              
            }
          }
          for(let i = 0; i<append_992_ItemsList.length; i++) {
            let appendParent = append_992_ItemsList[i][1];
            
            if(!resizeCheck['769'] || !append_992_ItemsList[i][0].dataset['append-768To']) {
              appendParent.append(append_992_ItemsList[i][0]);
              
            }
            
          }
      });

      
      
      
    
      
    
    
      }
      
      resize();
      
      window.onresize = resize;
     
// =-=-=-=-=-=-=-=-=-=-=-=- </media event> -=-=-=-=-=-=-=-=-=-=-=-=

