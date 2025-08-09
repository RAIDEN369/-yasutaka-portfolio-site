document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking hamburger menu...');
    
    // Section switching functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const menuLinks = document.querySelectorAll('.menu-link');
    const pageLogos = document.querySelectorAll('.page-logo');
    const sections = document.querySelectorAll('.section');
    const logoLink = document.querySelector('.logo-link');
    
    // Hamburger menu elements
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    console.log('Hamburger menu element:', hamburgerMenu);
    console.log('Hamburger menu display style:', getComputedStyle(hamburgerMenu).display);
    console.log('Hamburger menu visibility:', getComputedStyle(hamburgerMenu).visibility);

    // Function to show specific section
    function showSection(targetSection) {
        console.log('Switching to section:', targetSection); // Debug log
        
        // Hide all sections completely
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
            section.style.zIndex = '1';
        });
        
        // Show target section
        const target = document.getElementById(targetSection);
        if (target) {
            target.style.display = 'block';
            target.style.zIndex = '100';
            target.classList.add('active');
            console.log('Section activated:', targetSection); // Debug log
        } else {
            console.error('Section not found:', targetSection); // Debug log
        }
        
    }
    
    // Show main container after intro screen
    setTimeout(() => {
        document.querySelector('.main-container').classList.add('visible');
        
        // Force remove all active classes first
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Then activate home section
        setTimeout(() => {
            showSection('home');
        }, 100);
    }, 5000); // 5 seconds total (2s delay + 3s animation)

    // Navigation link click handlers (bottom nav)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Menu link click handlers
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            // Close menu after selection
            closeMenu();
        });
    });
    
    // Hamburger menu toggle
    function openMenu() {
        hamburgerIcon.classList.add('active');
        menuOverlay.classList.add('active');
    }
    
    function closeMenu() {
        hamburgerIcon.classList.remove('active');
        menuOverlay.classList.remove('active');
    }
    
    // Hamburger icon click handler
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', function() {
            if (menuOverlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
    }

    // Logo click handler - return to home (bottom nav)
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('home');
        });
    }
    
    // Page logo click handlers - return to home
    pageLogos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            // Close menu if open
            if (menuOverlay && menuOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Image Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    console.log('Total slides:', slides.length); // Debug log

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        console.log('Showing slide:', index); // Debug log
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Start slideshow
        slideInterval = setInterval(nextSlide, 3000);
        console.log('Slideshow started'); // Debug log
    }

    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            console.log('Slideshow stopped'); // Debug log
        }
    }

    // Initialize slideshow only if we have slides
    if (slides.length > 0) {
        // Make sure first slide is active
        showSlide(0);
        
        // Start slideshow after a short delay
        setTimeout(() => {
            startSlideshow();
        }, 1000);
        
        // Pause on hover
        const imageSlider = document.querySelector('.image-slider');
        if (imageSlider) {
            imageSlider.addEventListener('mouseenter', stopSlideshow);
            imageSlider.addEventListener('mouseleave', startSlideshow);
        }
    } else {
        console.error('No slides found');
    }

    // Manual controls for testing
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            startSlideshow(); // Restart after manual control
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            startSlideshow(); // Restart after manual control
        }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].clientX;
        });

        sliderWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                }
                startSlideshow();
            }
        });
    }
});