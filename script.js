// DOM Elements
const header = document.querySelector('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopBtn = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('section');


const container = document.querySelector('.projects-grid');

const projects = [
    {   title: "Portfolio Website",
        description: "A clean and modern portfolio website developed using HTML, CSS, and JavaScript with smooth animations and responsive design" , 
        Image: "./images/project2.png",
        link : "https://muhammedma-2006.github.io/porfolio2.0",
        alt : "project 1"
    },
    {   title: "HOSTEL REVIEW",
        description: "A responsive hostel review website for CUSAT with hostel search, detailed reviews, and user-submitted ratings, built using HTML, CSS, and JavaScript",
        Image: "./images/project1.png",
        link : "http://muhammedma-2006.github.io/hostelreview",
        alt : "project 2"
    },
    {   title: "ROCK PAPER SCISSOR",
        description: "A simple and interactive Rock Paper Scissors game built with HTML, CSS, and JavaScript. Features real-time score tracking, smooth animations.",
        Image: "./images/project3.png",
        link: "https://muhammedma-2006.github.io/rockPaperScissor/",
        alt : "project 3"
    },
    {   title: "CALCULATOR",
        description: "A fully functional calculator web app built using HTML, CSS, and JavaScript. Supports basic arithmetic operations, real-time input display.",
        Image: "./images/project4.png",
        link :"https://muhammedma-2006.github.io/Calculator/",
        alt : "project 4"
    },
    {   title: "STUDENT PORTAL",
        description: "A responsive PHP-based student portal for CUSAT that lets students register, log in, and view internal marks. Built using HTML, CSS, PHP, and MySQL.",
        Image: "./images/project5.png",
        link : "#",
        alt : "project 5"
    }
]

projects.forEach(project=>{
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card','swiper-slide');
    projectCard.innerHTML=`
        <div class="project-image">
            <img src="${project.Image}" alt="${project.alt}">
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a  href="${project.link}" target="_blank" class="view-link">VIEW</a>
                
            </div>
        </div>
    `;
        
    container.appendChild(projectCard);
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

// Check for saved theme
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Scroll Events
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Active nav link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Reveal animations on scroll
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('active');
        }
    });
});

// Scroll to Top Button Click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerHeight = header.offsetHeight;
        const elementPosition = target.offsetTop;
        window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
        });
    });
});

const SkillCon = document.getElementById('skills');
const skills = [
    { name: "HTML", percent: "100" , percentage : 100},
    { name: "CSS", percent: "85"  , percentage :85},
    { name: "JavaScript", percent: "80", percentage :80},
    { name: "C", percent: "85" , percentage : 85},
    { name: "React", percent: "60" , percentage : 60 },
    { name: "Node.js", percent: "50" , percentage : 50 },
    { name: "C++", percent: "60" , percentage : 60 },
];

skills.forEach(skill=>{
        const skillProgress = document.createElement('div');
        skillProgress.classList.add('skill-item');
        skillProgress.innerHTML = `
                                <div class="skill-progress" data-percent="${skill.percentage}">
                                    <svg class="skill-circle" viewBox="0 0 100 100">
                                        <circle class="skill-circle-fill" cx="50" cy="50" r="30"></circle>
                                    </svg>
                                    <span class="skill-text">${skill.percent}%</span>
                                </div>
                                <div class="skill-icon">
                                    <span>${skill.name}</span>
                                </div>`;
        SkillCon.appendChild(skillProgress);
});

const skillCircles = document.querySelectorAll('.skill-circle-fill');
// Initialize Skill Circle Animations
function initSkillCircles() {
    skillCircles.forEach(circle => {
        const parent = circle.closest('.skill-progress');
        const percent = parseFloat(parent.getAttribute('data-percent'));
        const radius = circle.r.baseVal.value;
        console.log('radius');
        const circumference = 2 * Math.PI * radius; // r = 30
        const offset = circumference - (percent / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
        
        // Add to Intersection Observer for animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(parent);
    });
}

// Create particles for hero background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position and size
        const size = Math.random() * 30 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 5;
        const animationDelay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particlesContainer.appendChild(particle);
    }
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initSkillCircles();
    
    // Trigger scroll event to set initial states
    window.dispatchEvent(new Event('scroll'));
});


new Swiper('.card-container', {
    loop: true,
    spaceBetween: 30,
  

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
