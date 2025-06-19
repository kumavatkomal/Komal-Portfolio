// Global variables
let scene, camera, renderer, particleSystem, hero3D, about3D, contact3D;
let mouse = { x: 0, y: 0 };

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    initializeNavigation();
    initializeParticles();
    initialize3DScenes();
    initializeScrollAnimations();
    initializeCounters();
    initializeFormHandling();
    initializeInteractivity();
    initializeTechIcons();
});

// Loading Screen Animation
function initializeLoading() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 3000);
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Change nav background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.2)';
        }
    });
}

// Particles.js initialization
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Initialize 3D scenes
function initialize3DScenes() {
    initializeHero3D();
    initializeAbout3D();
    initializeContact3D();
}

// Hero 3D Scene
function initializeHero3D() {
    const container = document.getElementById('hero-3d');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating geometric shapes
    const geometry1 = new THREE.BoxGeometry(2, 2, 2);
    const geometry2 = new THREE.SphereGeometry(1.5, 32, 32);
    const geometry3 = new THREE.ConeGeometry(1, 2, 8);
    
    const material1 = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const material2 = new THREE.MeshBasicMaterial({
        color: 0x764ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const material3 = new THREE.MeshBasicMaterial({
        color: 0xf093fb,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const cube = new THREE.Mesh(geometry1, material1);
    const sphere = new THREE.Mesh(geometry2, material2);
    const cone = new THREE.Mesh(geometry3, material3);
    
    cube.position.set(-5, 2, -5);
    sphere.position.set(5, -2, -3);
    cone.position.set(0, 3, -8);
    
    scene.add(cube);
    scene.add(sphere);
    scene.add(cone);
    
    camera.position.z = 5;
    
    // Animation loop
    function animateHero() {
        requestAnimationFrame(animateHero);
        
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        sphere.rotation.x += 0.005;
        sphere.rotation.z += 0.01;
        
        cone.rotation.y += 0.02;
        
        // Mouse interaction
        cube.position.x = -5 + mouse.x * 0.001;
        sphere.position.x = 5 - mouse.x * 0.001;
        cone.position.y = 3 + mouse.y * 0.001;
        
        renderer.render(scene, camera);
    }
    
    animateHero();
}

// About 3D Scene
function initializeAbout3D() {
    const container = document.getElementById('about-3d');
    if (!container) return;
    
    const aboutScene = new THREE.Scene();
    const aboutCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const aboutRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    aboutRenderer.setSize(container.offsetWidth, container.offsetHeight);
    aboutRenderer.setClearColor(0x000000, 0);
    container.appendChild(aboutRenderer.domElement);
    
    // Create a rotating torus
    const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    aboutScene.add(torus);
    
    aboutCamera.position.z = 8;
    
    function animateAbout() {
        requestAnimationFrame(animateAbout);
        
        torus.rotation.x += 0.02;
        torus.rotation.y += 0.01;
        
        aboutRenderer.render(aboutScene, aboutCamera);
    }
    
    animateAbout();
}

// Contact 3D Scene
function initializeContact3D() {
    const container = document.getElementById('contact-3d');
    if (!container) return;
    
    const contactScene = new THREE.Scene();
    const contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const contactRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    contactRenderer.setSize(window.innerWidth, window.innerHeight);
    contactRenderer.setClearColor(0x000000, 0);
    container.appendChild(contactRenderer.domElement);
    
    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x667eea,
        transparent: true,
        opacity: 0.8
    });
    
    const contactParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    contactScene.add(contactParticles);
    
    contactCamera.position.z = 20;
    
    function animateContact() {
        requestAnimationFrame(animateContact);
        
        contactParticles.rotation.y += 0.002;
        contactParticles.rotation.x += 0.001;
        
        contactRenderer.render(contactScene, contactCamera);
    }
    
    animateContact();
}

// GSAP Scroll Animations
function initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Profile hero entrance animations
    gsap.from('.profile-3d-container', {
        duration: 1.5,
        scale: 0,
        rotation: 180,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.3
    });
    
    gsap.from('.profile-name', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.8
    });
    
    gsap.from('.profile-title', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.1
    });
    
    gsap.from('.btn-small-3d', {
        duration: 0.8,
        scale: 0,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 1.4
    });
    
    gsap.from('.orb', {
        duration: 1,
        scale: 0,
        rotation: 360,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1.2
    });
    
    // Section animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Floating cards animation
    gsap.utils.toArray('.floating-card').forEach(card => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                rotationY: -30
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Stat cards animation
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 80,
                scale: 0.8,
                rotationX: -30
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1,
                delay: index * 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                rotationY: index % 2 === 0 ? -20 : 20
            },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Timeline animation
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: index % 2 === 0 ? 100 : -100,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Experience cards animation
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 60,
                rotationZ: -10
            },
            {
                opacity: 1,
                y: 0,
                rotationZ: 0,
                duration: 1,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Achievement cards animation
    gsap.utils.toArray('.achievement-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                scale: 0,
                rotation: 180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Contact form animation
    gsap.fromTo('.contact-form-container',
        {
            opacity: 0,
            x: 100,
            rotationY: 30
        },
        {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-form-container',
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60 FPS
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form handling
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate form submission
            gsap.to(form, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Simulate form submission
            setTimeout(() => {
                alert('Message sent successfully! (This is a demo)');
                form.reset();
            }, 500);
        });
    }
}

// Interactive elements
function initializeInteractivity() {
    // Mouse tracking for 3D effects
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX - window.innerWidth / 2;
        mouse.y = e.clientY - window.innerHeight / 2;
    });
    
    // Skill items hover effects
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.2,
                rotation: Math.random() * 20 - 10,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        skill.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.btn-3d').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -5,
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Project card 3D effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(this, {
                rotationY: x / 10,
                rotationX: -y / 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Profile photo 3D interaction
    const profileContainer = document.querySelector('.profile-3d-container');
    if (profileContainer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            gsap.to('.photo-wrapper', {
                rotationY: x * 15,
                rotationX: -y * 15,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            gsap.to('.photo-wrapper', {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Small 3D buttons interaction
    document.querySelectorAll('.btn-small-3d').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                scale: 1.1,
                rotationY: 10,
                rotationX: 10,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Button press animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Handle different button actions
            if (this.classList.contains('btn-linkedin')) {
                window.open('https://linkedin.com', '_blank');
            } else if (this.classList.contains('btn-cv')) {
                // Show download notification
                showNotification('📄 CV Download Started!', 'success');
            } else if (this.classList.contains('btn-github')) {
                window.open('https://github.com', '_blank');
            }
        });
    });
    
    // Name and title hover effects
    const profileName = document.querySelector('.profile-name');
    const profileTitle = document.querySelector('.profile-title');
    
    if (profileName) {
        profileName.addEventListener('mouseenter', function() {
            gsap.to('.name-text', {
                scale: 1.05,
                rotationY: 3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        profileName.addEventListener('mouseleave', function() {
            gsap.to('.name-text', {
                scale: 1,
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
    
    if (profileTitle) {
        profileTitle.addEventListener('mouseenter', function() {
            gsap.to('.title-text', {
                scale: 1.02,
                y: -2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        profileTitle.addEventListener('mouseleave', function() {
            gsap.to('.title-text', {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

// Tech Icons Interactivity
function initializeTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    const techSphere = document.querySelector('.tech-sphere');
    
    // Add click and hover effects for tech icons
    techIcons.forEach((icon, index) => {
        const techName = icon.getAttribute('data-tech');
        
        // Hover effect with tilt
        icon.addEventListener('mouseenter', function() {
            this.style.transform += ' rotateX(15deg) rotateY(15deg) scale(1.2)';
            this.style.zIndex = '100';
            
            // Add ripple effect
            createRippleEffect(this);
            
            // Show tech info tooltip
            showTechTooltip(this, techName);
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' rotateX(15deg) rotateY(15deg) scale(1.2)', '');
            this.style.zIndex = '1';
            
            // Hide tooltip
            hideTechTooltip();
        });
        
        // Click effect
        icon.addEventListener('click', function() {
            // Create explosion effect
            createTechExplosion(this, techName);
            
            // Temporary pause rotation
            if (techSphere) {
                techSphere.style.animationPlayState = 'paused';
                setTimeout(() => {
                    techSphere.style.animationPlayState = 'running';
                }, 1000);
            }
        });
    });
    
    // Mouse parallax effect for the sphere
    if (techSphere) {
        document.addEventListener('mousemove', function(e) {
            const rect = techSphere.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = (e.clientX - centerX) / rect.width;
            const mouseY = (e.clientY - centerY) / rect.height;
            
            const rotateY = mouseX * 20;
            const rotateX = -mouseY * 20;
            
            techSphere.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX + 10}deg)`;
        });
        
        // Reset sphere rotation when mouse leaves
        document.addEventListener('mouseleave', function() {
            techSphere.style.transform = 'rotateY(0deg) rotateX(10deg)';
        });
    }
}

// Create ripple effect on tech icon hover
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'rippleExpand 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Show tech tooltip
function showTechTooltip(element, techName) {
    let tooltip = document.getElementById('tech-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tech-tooltip';
        tooltip.style.position = 'fixed';
        tooltip.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '8px';
        tooltip.style.fontSize = '14px';
        tooltip.style.fontWeight = '600';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.backdropFilter = 'blur(10px)';
        tooltip.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        tooltip.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        tooltip.style.transition = 'all 0.3s ease';
        document.body.appendChild(tooltip);
    }
    
    const techDescriptions = {
        'GitHub': 'Version Control & Collaboration',
        'React': 'Frontend JavaScript Library',
        'AI': 'Artificial Intelligence',
        'Python': 'Programming Language',
        'ML': 'Machine Learning',
        'NLP': 'Natural Language Processing',
        'Git': 'Distributed Version Control',
        'Postman': 'API Development Tool',
        'DSA': 'Data Structures & Algorithms',
        'DL': 'Deep Learning',
        'CV': 'Computer Vision',
        'JS': 'JavaScript Programming'
    };
    
    tooltip.innerHTML = `<strong>${techName}</strong><br><span style="font-size: 12px; opacity: 0.9;">${techDescriptions[techName] || 'Technology'}</span>`;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 50);
}

// Hide tech tooltip
function hideTechTooltip() {
    const tooltip = document.getElementById('tech-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
    }
}

// Create tech explosion effect
function createTechExplosion(element, techName) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple explosion particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.8)';
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.animation = `explodeParticle 1s ease-out forwards`;
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // Add flash effect to the clicked icon
    element.style.background = 'linear-gradient(135deg, rgba(240, 147, 251, 1), rgba(255, 255, 255, 0.8))';
    element.style.boxShadow = '0 0 30px rgba(240, 147, 251, 0.8), 0 0 60px rgba(102, 126, 234, 0.6)';
    
    setTimeout(() => {
        element.style.background = '';
        element.style.boxShadow = '';
    }, 300);
}

// Add CSS for explosion animation
const explosionCSS = `
@keyframes explodeParticle {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0);
        opacity: 0;
    }
}

@keyframes rippleExpand {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        width: 120px;
        height: 120px;
        opacity: 0;
    }
}
`;

// Add the CSS to the document
const explosionStyle = document.createElement('style');
explosionStyle.textContent = explosionCSS;
document.head.appendChild(explosionStyle);

// Create dynamic background for coding chart
function initializeCodingChart() {
    const chartContainer = document.getElementById('coding-chart');
    if (!chartContainer) return;
    
    // Simple animated chart representation
    const chartScene = new THREE.Scene();
    const chartCamera = new THREE.PerspectiveCamera(75, chartContainer.offsetWidth / chartContainer.offsetHeight, 0.1, 1000);
    const chartRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    chartRenderer.setSize(chartContainer.offsetWidth, chartContainer.offsetHeight);
    chartRenderer.setClearColor(0x000000, 0);
    chartContainer.appendChild(chartRenderer.domElement);
    
    // Create animated bars
    const bars = [];
    for (let i = 0; i < 12; i++) {
        const geometry = new THREE.BoxGeometry(0.5, Math.random() * 3 + 1, 0.5);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(i / 12, 0.8, 0.6),
            transparent: true,
            opacity: 0.8
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (i - 6) * 1;
        bar.position.y = bar.geometry.parameters.height / 2;
        bars.push(bar);
        chartScene.add(bar);
    }
    
    chartCamera.position.set(0, 3, 8);
    chartCamera.lookAt(0, 0, 0);
    
    function animateChart() {
        requestAnimationFrame(animateChart);
        
        bars.forEach((bar, index) => {
            bar.rotation.y += 0.01;
            bar.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5 + bar.geometry.parameters.height / 2;
        });
        
        chartRenderer.render(chartScene, chartCamera);
    }
    
    // Initialize chart when in view
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart();
                chartObserver.unobserve(entry.target);
            }
        });
    });
    
    chartObserver.observe(chartContainer);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize coding chart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeCodingChart, 1000);
});

// Add smooth page transitions
function initializePageTransitions() {
    // Add entrance animation to body
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
}

// Call page transitions
initializePageTransitions();
