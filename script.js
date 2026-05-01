document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Custom Cursor
    // ==========================================
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    
    // Check if device supports hover (ignore on touch devices)
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay using CSS transition
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Add hover effect to clickable elements
        const interactables = document.querySelectorAll("a, button, input, .faq-item, .card");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });
        });
    }

    // ==========================================
    // 2. Mobile Hamburger Menu
    // ==========================================
    const hamburger = document.getElementById("hamburger");
    const navmenu = document.getElementById("navmenu");

    if (hamburger && navmenu) {
        hamburger.addEventListener("click", () => {
            navmenu.classList.toggle("active");
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navmenu.classList.remove("active");
            });
        });
    }

    // ==========================================
    // 3. Sticky Navbar on Scroll
    // ==========================================
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // ==========================================
    // 4. Intersection Observer (Fade Up & Counters)
    // ==========================================
    const fadeElements = document.querySelectorAll(".fade-up");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // If the element contains counters, animate them
                const counters = entry.target.querySelectorAll(".counter");
                if (counters.length > 0) {
                    animateCounters(counters);
                }
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ==========================================
    // 5. Counter Animation Logic
    // ==========================================
    function animateCounters(counters) {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // ==========================================
    // 6. Advanced 3D Tilt Effect on Cards
    // ==========================================
    const cards = document.querySelectorAll(".card");
    
    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -8; 
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
                card.style.transition = "transform 0.5s ease"; 
            });

            card.addEventListener("mouseenter", () => {
                card.style.transition = "none"; 
            });
        });
    }

    // ==========================================
    // 7. FAQ Accordion Logic
    // ==========================================
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        question.addEventListener("click", () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });
            
            // Toggle current item
            item.classList.toggle("active");
        });
    });

    // ==========================================
    // 8. Typing Effect for Hero Heading
    // ==========================================
    const heroHeading1 = document.querySelector(".herocontent h1:nth-of-type(1)");
    const heroHeading2 = document.querySelector(".herocontent h1:nth-of-type(2)");
    
    if (heroHeading1 && heroHeading2) {
        const text1 = heroHeading1.innerText;
        const text2 = heroHeading2.innerText;
        
        heroHeading1.innerText = "";
        heroHeading2.innerText = "";
        heroHeading1.style.borderRight = "none";
        
        let i = 0;
        let j = 0;
        const speed = 60;
        
        function typeWriter1() {
            if (i < text1.length) {
                heroHeading1.innerHTML += text1.charAt(i);
                i++;
                setTimeout(typeWriter1, speed);
            } else {
                setTimeout(typeWriter2, 200);
            }
        }
        
        function typeWriter2() {
            if (j < text2.length) {
                heroHeading2.innerHTML += text2.charAt(j);
                j++;
                setTimeout(typeWriter2, speed);
            }
        }
        
        setTimeout(typeWriter1, 500);
    }
});
