
document.addEventListener("DOMContentLoaded", function() {
  // Select all images that are not inside an element with the class 'redimg'
  const images = document.querySelectorAll('img:not(.redimg img)');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});

    window.onscroll = function() {scrollericon()};
    
    
    function scrollericon() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = ((winScroll / height) * 85) ;
    
    
      document.getElementById("square1").style.top = scrolled  + "%";
        
    }

    var selectedSpans = [];
setInterval(function() {
  // Target headertext divs first, then find spans within them
  var headertextDivs = document.querySelectorAll('.headertext');

  headertextDivs.forEach(div => {
      let spans = div.querySelectorAll('span');
      let newSpan = null;

      do {
        var randomIndex = Math.floor(Math.random() * spans.length); // no need for + 1
        newSpan = spans[randomIndex];
      } while (selectedSpans.includes(newSpan));

      selectedSpans.push(newSpan);
      newSpan.style.filter = 'blur(2.5px) opacity(40%)';
      newSpan.style.transition = 'filter 0.7s ease-in-out';

      setTimeout(function() {
        newSpan.style.filter = '';
        newSpan.style.transition = 'filter 0.7s ease-in-out';
        var indexToRemove = selectedSpans.indexOf(newSpan);
        selectedSpans.splice(indexToRemove, 1);
      }, 1200); 
  });

}, 850);
    

function toggleButton(element) {
    element.classList.toggle('active');
    filterCards();
}

// Function to activate all buttons including X
function activateAll(element) {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
      // Ensure the button is activated (add 'active' class if not present)
      if (!button.classList.contains('active')) {
          button.classList.add('active');
      }
  });
  filterCards();
}

function filterCards() {
    // Get all active buttons
    const activeButtons = document.querySelectorAll('.toggle-button.active');
    const activeTags = Array.from(activeButtons).map(btn => btn.innerText.toLowerCase());

    // Get all section cards
    const sectionCards = document.querySelectorAll('.sectioncard');

    sectionCards.forEach(card => {
        // Get all tag elements within the card
        const tagElements = card.querySelectorAll('.tags .tag');
        const cardTags = Array.from(tagElements).map(tag => tag.textContent.toLowerCase());

        // Check if any of the card's tags are not active
        const isVisible = cardTags.some(tag => !activeTags.includes(tag));

        if (isVisible) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initial call to display all cards
filterCards();




document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  const squareWrapper = document.querySelector(".square-wrapper");
  const gradient = document.querySelector(".gradient");

  function initAnimations() {
    // Clear existing ScrollTriggers to prevent duplication or misalignment
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Create ScrollTrigger for resizing and repositioning the square
    gsap.to(squareWrapper, {
      scrollTrigger: {
        trigger: squareWrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onEnter: () => {
          gsap.set(squareWrapper, { position: "fixed", top: "0px", left: "0px" });
        },
        onLeaveBack: ({isActive}) => {
          if (!isActive) {
            gsap.set(squareWrapper, { position: "absolute", width: '100vw', top: "", left: "" });
          }
        }
      },
      x: "20px",
      y: "20px",
      width: "60px",
      height: "60px",
      ease: "none",
      borderRadius: "2px",

    });

    // Create ScrollTrigger for hiding the gradient
    gsap.to(gradient, {
      scrollTrigger: {
        trigger: squareWrapper,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      opacity: 0,
      ease: "none"
    });

    // Refresh ScrollTriggers to ensure proper alignment and triggering
    ScrollTrigger.refresh();
  }

  // Initialize animations
  initAnimations();
   
});


document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  const squareWrapper = document.querySelector(".square-wrapper");
  const burger = document.querySelector(".burger");
  const burgerImage = document.querySelector(".bgw");
  const abstractSection = document.querySelector(".abstract");
  let isBurgerOpen = false;

  // Initial CSS setup for burger div and image
  burger.style.transformOrigin = "top left";
  burger.style.transform = "scale(0)";
  burger.style.opacity = 0;
  burger.style.display = "none";
  burgerImage.style.opacity = 0;

  // Function to show the burger menu with animation
  function showBurger() {
    burger.style.display = "block";
    gsap.to(burger, { scale: 1, opacity: 1, duration: 0.2 });
    gsap.to(burgerImage, { opacity: 1, duration: 0.2 });
    isBurgerOpen = true;
  }

  // Function to hide the burger menu with animation
  function hideBurger() {
    gsap.to(burger, {
        scaleX: 0.357, 
        scaleY: 0.278,      
        duration: 0.2,
      onComplete: () => {
        burger.style.display = "none";
      }
    });
    gsap.to(burgerImage, { opacity: 0, duration: 0.2 });
    isBurgerOpen = false;
  }

  // Function to handle squareWrapper click
  function handleSquareClick() {
    if (isBurgerOpen) {
      hideBurger();
    } else {
      showBurger();
    }
  }

  // Add click event listener to the squareWrapper
  squareWrapper.addEventListener("click", function() {
    // Check if the current scroll position is below the abstract section
    const abstractRect = abstractSection.getBoundingClientRect();
    const scrollPosition = window.scrollY + window.innerHeight;
    const abstractBottom = abstractRect.bottom + window.scrollY;

    if (scrollPosition > abstractBottom) {
      handleSquareClick();
    }
  });

  // Function to hide burger menu on scroll
  function hideBurgerOnScroll() {
    if (isBurgerOpen) {
      hideBurger();
    }
  }

  // Add scroll event listener to window
  window.addEventListener("scroll", hideBurgerOnScroll);
});

document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const images2 = document.querySelectorAll(".red-image");

    images2.forEach((image) => {
      gsap.to(image, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none",
        scrollTrigger: {
          scrub: true,
        }
      });
    });
  });


document.addEventListener("DOMContentLoaded", function() {
  var galleries = document.querySelectorAll('.gallery');
  var modal = document.querySelector('.lightbox');
  var modalImagesContainer = modal.querySelector('.lightboximg');
  var body = document.body;

  // Add click event listeners to all gallery images
  galleries.forEach(function(gallery) {
    var images = gallery.querySelectorAll('img');
    images.forEach(function(image, index) {
      image.addEventListener('click', function() {
        openModal(images, index);
      });
    });
  });

  function openModal(images, clickedIndex) {
    modalImagesContainer.innerHTML = ''; // Clear previous images

    // Append the images three times to create the seamless looping effect
    for (let i = 0; i < 3; i++) {
      images.forEach(function(img) {
        var clonedImage = document.createElement('img');
        clonedImage.src = img.src;
        clonedImage.alt = img.alt;
        modalImagesContainer.appendChild(clonedImage);
      });
    }

    modal.style.display = 'flex';
    body.style.overflow = 'hidden'; // Prevent body scrolling

    // Calculate the width of one set and the position to center the clicked image
    var singleSetWidth = modalImagesContainer.scrollWidth / 3;
    var imageWidth = singleSetWidth / images.length;
    var initialScrollPosition = singleSetWidth + clickedIndex * imageWidth - (modalImagesContainer.clientWidth / 2) + (imageWidth / 2);

    // Set initial scroll position to center the clicked image
    modalImagesContainer.scrollLeft = initialScrollPosition;

    // Scroll event listener for bidirectional looping
    modalImagesContainer.addEventListener('scroll', checkScrollLoop);
  }

  function closeModal() {
    modal.style.display = 'none';
    body.style.overflow = ''; // Restore body scrolling
    modalImagesContainer.removeEventListener('scroll', checkScrollLoop); // Remove event listener when modal is closed
  }


  function checkScrollLoop() {
    var singleSetWidth = modalImagesContainer.scrollWidth / 3;

    if (modalImagesContainer.scrollLeft >= 2 * singleSetWidth) {
      // If scrolled past the second set, reset to the start of the middle set
      modalImagesContainer.scrollLeft -= singleSetWidth;
    } else if (modalImagesContainer.scrollLeft <= singleSetWidth) {
      // If scrolled past the first set, reset to the start of the middle set
      modalImagesContainer.scrollLeft += singleSetWidth;
    }
  }



  // Close the modal when clicking anywhere outside the images
  modal.addEventListener('click', function(event) {
    if (event.target === modal,modalImagesContainer) {
      closeModal();
    }
  });


});


document.addEventListener("DOMContentLoaded", function() {
  const readMoreLinks = document.querySelectorAll(".seemore");

  readMoreLinks.forEach(link => {
      link.addEventListener("click", function() {
          const sectionContent = this.parentElement.querySelector(".sectioncontent");
          const readMoreText = this.querySelector("p");

          sectionContent.classList.toggle("show");

          if (sectionContent.classList.contains("show")) {
              readMoreText.innerHTML = "Read Less <";
          } else {
              readMoreText.innerHTML = "Read More <span class='arrow'>></span>";
          }
      });
  });
});


