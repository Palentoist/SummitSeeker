 // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Re-trigger animations for newly visible page
            setTimeout(() => {
                observeElements();
            }, 100);
        }

        // Intersection Observer for scroll animations
        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Contact Form Handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const loading = submitBtn.querySelector('.loading');
            const messageDiv = document.getElementById('form-message');
            
            // Get form data
            const formData = {
                name: form.name.value,
                email: form.email.value,
                subject: form.subject.value || 'Contact Form Submission',
                message: form.message.value
            };
            
            // Show loading state
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual email service)
            setTimeout(() => {
                // Create mailto link with form data
                const mailtoLink = `mailto:summit@seekers.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                    `Summit Seeker: ${formData.name}\nBase Camp Signal: ${formData.email}\n\nExpedition Message:\n${formData.message}`
                )}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                messageDiv.innerHTML = `
                    <div style="background: rgba(0, 255, 255, 0.2); border: 1px solid var(--neon-cyan); color: var(--neon-cyan); border-radius: 10px;">
                        <i class="fas fa-check-circle"></i> Transmission initiated! Your mission briefing is ready to deploy!
                    </div>
                `;
                messageDiv.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                loading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
                
            }, 1500);
        });

        // Smooth scrolling for internal links
        document.addEventListener('click', function(e) {
            if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Gallery item click handler
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                // Add a subtle click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 100);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add floating animation to navigation on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Add hover effect to social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });

        // Add typing effect to hero title
        function typeWriter(element, text, delay = 100) {
            element.innerHTML = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                }
            }
            
            type();
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initial observation
            observeElements();
            
            // Add stagger animation to gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Add entrance animation to nav
            setTimeout(() => {
                document.querySelector('nav').style.opacity = '1';
                document.querySelector('nav').style.transform = 'translateY(0)';
            }, 500);
        });

        // Add custom cursor effect (optional enhancement)
        document.addEventListener('mousemove', function(e) {
            const cursor = document.querySelector('.custom-cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'custom-cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, var(--primary-color), transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.6;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursorElement = document.querySelector('.custom-cursor');
            cursorElement.style.left = e.clientX - 10 + 'px';
            cursorElement.style.top = e.clientY - 10 + 'px';
        });

        // Add click ripple effect
        document.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, var(--primary-color), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: ripple 0.6s ease-out;
                left: ${e.clientX - 5}px;
                top: ${e.clientY - 5}px;
            `;
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);