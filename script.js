document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Testimonial Slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    
    if (testimonialsTrack && testimonialSlides.length > 0) {
        let currentIndex = 0;
        const slideWidth = 100; // percentage
        const totalSlides = testimonialSlides.length;

        // Function to update slider position
        function updateSliderPosition() {
            // For mobile view (1 slide at a time)
            if (window.innerWidth < 768) {
                testimonialsTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            } 
            // For desktop view (3 slides visible, but still scroll one at a time)
            else {
                // Adjust the translation to show 3 slides at once
                const translation = currentIndex * (slideWidth / 3);
                testimonialsTrack.style.transform = `translateX(-${translation}%)`;
            }

            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('bg-green-600');
                    indicator.classList.remove('bg-gray-300');
                } else {
                    indicator.classList.remove('bg-green-600');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }

        // Event listeners for next and previous buttons
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSliderPosition();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSliderPosition();
            });
        }

        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateSliderPosition();
            });
        });

        // Auto-advance the slider every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        }, 5000);

        // Handle window resize to adjust slider
        window.addEventListener('resize', updateSliderPosition);
    }

    // Form submission handling
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show an alert
            alert('Thank you for your interest! We will contact you soon.');
            consultationForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just a '#' link
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});