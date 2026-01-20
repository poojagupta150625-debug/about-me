// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const viewProjectButtons = document.querySelectorAll('.view-project');
const projectModal = document.getElementById('projectModal');
const skillModal = document.getElementById('skillModal');
const experienceModal = document.getElementById('experienceModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const messageForm = document.getElementById('messageForm');
const successToast = document.getElementById('successToast');
const viewProjectsBtn = document.getElementById('viewProjects');
const skillInfoButtons = document.querySelectorAll('.skill-info-btn');
const experienceStat = document.getElementById('experienceStat');

// Project Data
const projects = {
    1: {
        title: "Fashion Store E-Commerce",
        description: "A modern, responsive e-commerce website built for fashion retailers. This project includes product listings, shopping cart functionality, user authentication, and payment gateway integration.",
        features: [
            "Product catalog with filtering and search",
            "Shopping cart with quantity management",
            "User authentication system",
            "Responsive design for all devices",
            "Order tracking and history"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage API"],
        demoLink: "#",
        githubLink: "#",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    2: {
        title: "Task Management App",
        description: "A productivity application that helps users organize their daily tasks. Features include drag-and-drop functionality, priority settings, and local data persistence.",
        features: [
            "Create, edit, and delete tasks",
            "Drag and drop task reordering",
            "Priority levels and due dates",
            "Local storage for data persistence",
            "Dark/light theme toggle"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
        demoLink: "#",
        githubLink: "#",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    3: {
        title: "Student Portfolio Website",
        description: "A responsive portfolio template designed specifically for students to showcase their academic projects, skills, and achievements in a professional manner.",
        features: [
            "Responsive design with mobile-first approach",
            "Project showcase gallery",
            "Skills and education section",
            "Contact form with validation",
            "Dark mode support"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "CSS Grid & Flexbox"],
        demoLink: "#",
        githubLink: "#",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
};

// Skill Information Data
const skillInfo = {
    html: {
        title: "HTML5 Expertise",
        description: "I have strong expertise in HTML5, focusing on semantic markup, accessibility standards, and SEO best practices.",
        details: [
            "Semantic HTML5 elements (header, nav, section, article, etc.)",
            "Accessibility (ARIA labels, keyboard navigation)",
            "SEO optimization with proper meta tags and structure",
            "Form validation and input types",
            "Integration with modern web APIs"
        ],
        level: "Advanced",
        projects: "Used in all my web projects"
    },
    css: {
        title: "CSS3 Mastery",
        description: "Proficient in modern CSS including Flexbox, Grid, animations, and responsive design techniques.",
        details: [
            "CSS Grid and Flexbox for complex layouts",
            "CSS custom properties (variables)",
            "Advanced animations and transitions",
            "Responsive design with media queries",
            "CSS preprocessing concepts"
        ],
        level: "Advanced",
        projects: "All responsive designs and animations"
    },
    js: {
        title: "JavaScript Skills",
        description: "Strong understanding of JavaScript fundamentals, DOM manipulation, and modern ES6+ features.",
        details: [
            "ES6+ features (arrow functions, destructuring, etc.)",
            "DOM manipulation and event handling",
            "Async programming (Promises, async/await)",
            "Local storage and API integration",
            "Basic algorithm implementation"
        ],
        level: "Intermediate",
        projects: "Interactive features and functionality"
    },
    webdev: {
        title: "Web Development",
        description: "Comprehensive understanding of frontend development principles and best practices.",
        details: [
            "Responsive web design principles",
            "Cross-browser compatibility",
            "Performance optimization",
            "Code organization and maintainability",
            "Version control with Git"
        ],
        level: "Intermediate",
        projects: "Complete website development"
    }
};

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// View Projects Button Scroll
viewProjectsBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// Experience Stat Click
experienceStat.addEventListener('click', () => {
    experienceModal.style.display = 'flex';
});

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// View Project Details
viewProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projects[projectId];
        
        if (project) {
            const modalBody = document.getElementById('projectModalBody');
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:10px; margin:20px 0;">
                <p>${project.description}</p>
                
                <h3>Key Features</h3>
                <ul style="margin-left:20px; margin-bottom:20px;">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <h3>Technologies Used</h3>
                <div style="display:flex; gap:10px; margin:15px 0; flex-wrap:wrap;">
                    ${project.technologies.map(tech => `<span style="padding:5px 15px; background:var(--light); border:1px solid var(--primary); border-radius:50px; color:var(--primary);">${tech}</span>`).join('')}
                </div>
                
                <div style="display:flex; gap:15px; margin-top:30px;">
                    <a href="${project.demoLink}" class="btn btn-primary" target="_blank">View Live Demo</a>
                    <a href="${project.githubLink}" class="btn btn-secondary" target="_blank">View Code</a>
                </div>
            `;
            projectModal.style.display = 'flex';
        }
    });
});

// Skill Information Modal
skillInfoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const skill = button.getAttribute('data-skill');
        const info = skillInfo[skill];
        
        if (info) {
            const modalBody = document.getElementById('skillModalBody');
            modalBody.innerHTML = `
                <h2>${info.title}</h2>
                <p>${info.description}</p>
                
                <div style="background:${getComputedStyle(document.documentElement).getPropertyValue('--light')}; padding:15px; border-radius:10px; margin:20px 0;">
                    <strong>Proficiency Level:</strong> ${info.level}<br>
                    <strong>Used in:</strong> ${info.projects}
                </div>
                
                <h3>Key Skills & Knowledge</h3>
                <ul style="margin-left:20px;">
                    ${info.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                
                <h3>My Experience</h3>
                <p>I have used ${skill.toUpperCase()} in multiple projects, ranging from simple static websites to complex web applications. I stay updated with the latest features and best practices to write efficient, maintainable code.</p>
                
                <div style="margin-top:30px; text-align:center;">
                    <button class="btn btn-primary" onclick="skillModal.style.display='none'">Close</button>
                </div>
            `;
            skillModal.style.display = 'flex';
        }
    });
});

// Close Modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        projectModal.style.display = 'none';
        skillModal.style.display = 'none';
        experienceModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
    }
    if (e.target === skillModal) {
        skillModal.style.display = 'none';
    }
    if (e.target === experienceModal) {
        experienceModal.style.display = 'none';
    }
});

// Form Submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(messageForm);
    const name = messageForm.querySelector('input[type="text"]').value;
    const email = messageForm.querySelector('input[type="email"]').value;
    const message = messageForm.querySelector('textarea').value;
    
    // Here you would normally send the data to a server
    // For demo purposes, we'll just show a success message
    console.log('Message received:', { name, email, message });
    
    // Show success toast
    successToast.classList.add('show');
    
    // Reset form
    messageForm.reset();
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 3000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const skillLevel = card.querySelector('.skill-level');
        const width = skillLevel.style.width;
        skillLevel.style.width = '0';
        
        setTimeout(() => {
            skillLevel.style.width = width;
        }, 300);
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // If it's the skills section, animate skill bars
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Initialize animations for sections already in view
document.querySelectorAll('.section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }
});

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'var(--shadow)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any additional functionality here
    
    // Animate skill bars when skills section is in view initially
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(animateSkillBars, 500);
    }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        projectModal.style.display = 'none';
        skillModal.style.display = 'none';
        experienceModal.style.display = 'none';
    }
    
    // Navigate modals with Tab key
    if (e.key === 'Tab' && (projectModal.style.display === 'flex' || 
                            skillModal.style.display === 'flex' || 
                            experienceModal.style.display === 'flex')) {
        e.preventDefault();
        // Focus management for accessibility
        const closeButton = document.querySelector('.modal:not([style*="none"]) .close-modal');
        if (closeButton) {
            closeButton.focus();
        }
    }
});
