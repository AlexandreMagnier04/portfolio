
document.addEventListener('DOMContentLoaded', function () {

    initMenuMobile();
    initScrollAnimation();
    initCodeBackground();
    initTypingEffect();
    initTerminals();
    initProjectsCarousel();
    initProjectFilter();
    initProjectGallery();
    initScreenshotsCarousel();

    document.body.classList.add('loaded');
});


function initMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('#header-nav');

    if (menuToggle && headerNav) {

        menuToggle.addEventListener('click', function () {
            headerNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    headerNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
}

function initScrollAnimation() {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function initProjectsCarousel() {
    const projectsCarousel = document.querySelector('.projects-carousel');
    if (projectsCarousel) {
        const projectCards = projectsCarousel.querySelectorAll('.project-card');

        if (projectCards.length > 1 && window.innerWidth > 768) {

            try {
                let slider = tns({
                    container: '.projects-carousel',
                    items: 1,
                    slideBy: 'page',
                    autoplay: false,
                    controls: true,
                    nav: false,
                    controlsContainer: '.carousel-controls',
                    prevButton: '.prev-btn',
                    nextButton: '.next-btn',
                    responsive: {
                        576: {
                            items: 2,
                            gutter: 20
                        },
                        992: {
                            items: 3,
                            gutter: 30
                        }
                    },
                    speed: 400,
                    loop: true
                });

                slider.events.on('transitionStart', function () {
                    const activeSlides = projectsCarousel.querySelectorAll('.tns-slide-active');
                    activeSlides.forEach(slide => {
                        slide.style.opacity = '1';
                        slide.style.transform = 'scale(1)';
                    });
                });
            } catch (e) {
                console.warn('Tiny-slider not loaded or error:', e);

                const carouselControls = document.querySelector('.carousel-controls');
                if (carouselControls) {
                    carouselControls.style.display = 'none';
                }

                projectCards.forEach(card => {
                    card.style.width = '100%';
                    card.style.margin = '10px 0';
                });
            }
        } else {
            const carouselControls = document.querySelector('.carousel-controls');
            if (carouselControls) {
                carouselControls.style.display = 'none';
            }

            projectCards.forEach(card => {
                card.style.width = '100%';
                card.style.margin = '10px 0';
            });
        }
    }
}

function initScreenshotsCarousel() {
    const screenshotsCarousel = document.querySelector('.screenshots-carousel');
    if (screenshotsCarousel) {
        try {
            let screenshotSlider = tns({
                container: '.screenshots-carousel',
                items: 1,
                slideBy: 'page',
                autoplay: false,
                controls: true,
                nav: false,
                controlsContainer: '.carousel-controls',
                prevButton: '.prev-btn',
                nextButton: '.next-btn',
                responsive: {
                    768: {
                        items: 2,
                        gutter: 20
                    },
                    992: {
                        items: 1,
                        gutter: 0,
                        center: true
                    }
                },
                speed: 400,
                loop: true
            });
        } catch (e) {
            console.warn('Error initializing screenshot carousel:', e);
        }
    }
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    card.classList.remove('fade-in');

                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.classList.add('fade-in');
                            card.classList.add('animate');
                        }, 10);
                    } else {

                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
}

function initCodeBackground() {
    const codeBackground = document.getElementById('code-background');
    if (codeBackground) {

        const codeSnippets = [
            'function createPortfolio() { return success; }',
            'const skills = ["HTML", "CSS", "JavaScript", "Python"];',
            'import { experience } from \'./career\';',
            'class Developer extends Person { /* ... */ }',
            'const passion = true; const hardwork = true;',
            'if (coffee.isEmpty) { refill(); }',
            '.portfolio { display: grid; }',
            'async function loadProjects() { /* ... */ }',
            'export default Portfolio;',
            '// TODO: Add more awesome projects',
            'git commit -m "Updated portfolio"',
            'npm install creativity --save',
            '<!-- Building the future with code -->',
            'for (let i = 0; i < passion.length; i++) { }',
            'document.querySelector(\'.skills\').classList.add(\'growing\');',
            'const frontendDev = { html: true, css: true, js: true };',
            '/* Always learning new technologies */',
            'while(true) { learn(newTechnology); }',
            '@media (max-width: 768px) { .responsive { display: flex; } }',
            'try { newProject(); } catch (error) { fixBugs(); }',
            'export class Portfolio implements Developer {}'
        ];

        const numLines = Math.max(20, Math.floor(window.innerHeight / 50));


        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'code-line';

            line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];


            line.style.left = `${Math.random() * 100}%`;
            line.style.top = `${Math.random() * 100}%`;
            line.style.opacity = `${Math.random() * 0.1 + 0.05}`;


            const duration = Math.random() * 25 + 10;
            line.style.animationDuration = `${duration}s`;


            line.style.animationDelay = `${Math.random() * 5}s`;


            if (Math.random() > 0.5) {
                line.style.animationName = 'scrollCodeUp';
            } else {
                line.style.animationName = 'scrollCode';
            }

            codeBackground.appendChild(line);
        }


        setInterval(() => {

            if (codeBackground.children.length > numLines * 1.5) {
                codeBackground.removeChild(codeBackground.firstChild);
            }


            const line = document.createElement('div');
            line.className = 'code-line';
            line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            line.style.left = `${Math.random() * 100}%`;
            line.style.top = `${Math.random() > 0.5 ? '-50px' : '100%'}`;
            line.style.opacity = `${Math.random() * 0.1 + 0.05}`;
            const duration = Math.random() * 25 + 10;
            line.style.animationDuration = `${duration}s`;
            line.style.animationName = Math.random() > 0.5 ? 'scrollCodeUp' : 'scrollCode';

            codeBackground.appendChild(line);
        }, 3000);
    }
}


function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent.trim();
        element.textContent = '';
        element.style.borderRight = '0.1em solid var(--accent-light-blue)';
        element.style.animation = 'blinkCursor 1s step-end infinite';

        let i = 0;
        const speed = 80;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);

                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }, speed);
    });
}


function initTerminals() {

    console.log('Terminal initialization would go here');
}


function initProjectGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image">
                <div class="modal-controls">
                    <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('.modal-image');
        const closeModal = modal.querySelector('.close-modal');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');

        let currentIndex = 0;


        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });


        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });


        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });


        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });


        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);


        function showPrevImage() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            const prevImg = galleryItems[currentIndex].querySelector('img');
            modalImg.src = prevImg.src;
            modalImg.alt = prevImg.alt;
        }


        function showNextImage() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            const nextImg = galleryItems[currentIndex].querySelector('img');
            modalImg.src = nextImg.src;
            modalImg.alt = nextImg.alt;
        }


        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                currentIndex = index;
                modal.style.display = 'block';
            });
        });
    }
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});


window.addEventListener('load', function () {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(function () {
            loader.classList.add('hidden');
        }, 500);
    }
});


function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scrollCode {
            from { transform: translateY(-100%); }
            to { transform: translateY(1000%); }
        }
        
        @keyframes scrollCodeUp {
            from { transform: translateY(1000%); }
            to { transform: translateY(-100%); }
        }
        
        @keyframes blinkCursor {
            from, to { border-right-color: transparent; }
            50% { border-right-color: var(--accent-light-blue); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s, transform 0.5s;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Animation de chargement de la page */
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

addAnimationStyles();