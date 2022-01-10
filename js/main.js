
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



let thisTarget;
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
      767: {
        direction: "vertical",
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
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
          
        },
        function () {  // screen < 768px

          
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

