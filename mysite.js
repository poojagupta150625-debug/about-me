// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const viewProjectButtons = document.querySelectorAll('.view-project');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const messageForm = document.getElementById('messageForm');
const successToast = document.getElementById('successToast');
const viewProjectsBtn = document.getElementById('viewProjects');
const contactBtn = document.getElementById('contactBtn');

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
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal
const projectData = {
    1: {
        title: "Portfolio Website",
        description: "A fully responsive portfolio website showcasing my skills and projects. Features modern design, smooth animations, and interactive elements.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: ["Responsive Design", "Dark/Light Theme", "Interactive Elements", "Project Filtering"],
        link: "#"
    },
    2: {
        title: "Business Landing Page",
        description: "A modern business website with animations, contact form functionality, and optimized performance for better user experience.",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        features: ["Animated Elements", "Contact Form", "Performance Optimized", "SEO Friendly"],
        link: "#"
    },
    3: {
        title: "E-Commerce Template",
        description: "Full-featured online store template with product filtering, shopping cart functionality, and payment integration.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
        features: ["Product Filtering", "Shopping Cart", "Responsive Design", "User Authentication"],
        link: "#"
    }
};

viewProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p class="modal-description">${project.description}</p>
            
            <h3>Technologies Used</h3>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <h3>Key Features</h3>
            <ul class="features-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="modal-buttons">
                <a href="${project.link}" class="btn btn-primary" target="_blank">View Live Demo</a>
                <button class="btn btn-secondary close-modal-btn">Close</button>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Close modal with close button inside modal
        document.querySelector('.close-modal-btn')?.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});

// Close modal with X button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form Submission
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success toast
        successToast.classList.add('show');
        
        // Reset form
        messageForm.reset();
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 3000);
        
        // In a real app, you would send data to server here
        console.log('Form submitted!');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// View Projects Button
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Contact Button
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        window.open('https://www.fiverr.com/pooja.gupta_15', '_blank');
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Initialize skill bar animations
document.querySelectorAll('.skill-level').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 500);
});
