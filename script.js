// script.js (module)
import { db } from './auth.js';
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ---------------- Projects data (same as before) ---------------- */
const projects = [
    {
        id: 1,
        title: "Health-Test-Genius",
        year: 2023,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/health-collage.png",
        description: "The Health Test Genius project, built with Angular and Firebase, is a fast, scalable, and user-friendly platform that helps people compare health tests easily. With a responsive design, real-time data handling, and optimized performance, it makes healthcare information accessible and clear.",
        technologies: ["Angular", "Firebase", "TypeScript"],
        liveUrl: "https://health-test-genius.vercel.app/",
        category: "development"
    },
    {
        id: 2,
        title: "Wattify - Dashboard",
        year: 2025,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/wattify-collage.png",
        description: "The Wattify project features an advanced real-time monitoring dashboard that tracks electricity consumption across appliances, built with a focus on performance and user interaction. With interface and optimized backend, it helps users understand and manage their energy usage more effectively.",
        technologies: ["React", "Node.js", "Real-time", "Dashboard"],
        liveUrl: "https://wattify-fyp.vercel.app/",
        category: "development"
    },
    {
        id: 3,
        title: "Flash-Gaming-Platform",
        year: 2025,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/flash-collage.jpg",
        description: "The Flash project is a modern gaming platform built with Angular and Firebase, designed for speed, scalability, and real-time performance. It delivers an engaging user experience with optimized gameplay features, secure data handling, and smooth cross-platform accessibility.",
        technologies: ["Angular", "Firebase", "WebSockets", "Gaming"],
        liveUrl: "https://flash-gaming-web.vercel.app/",
        category: "development"
    },
    {
        id: 4,
        title: "PNG-Image-Converter",
        year: 2025,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/png-collage.jpg",
        description: "The PNG-Image-Converter is a project built with Rust and WebAssembly, focused on high-speed and secure image processing directly in the browser. It allows seamless conversion of images into PNG format while ensuring efficiency and reliability.",
        technologies: ["Rust", "WebAssembly", "Image Processing"],
        liveUrl: "https://png-image-converter-git-main-ammadhussains-projects.vercel.app/",
        category: "development"
    },
    {
        id: 5,
        title: "Edge-Ledger-Web",
        year: 2022,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/edge-collage.jpg",
        description: "The Edge-Ledger-Web is a project created using HTML, CSS, and JavaScript, designed to provide a clean, modern, and fully responsive company website. It demonstrates skills in frontend development by combining structure, styling, and interactivity to deliver a user-friendly interface.",
        technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
        liveUrl: "https://edge-ledger-web.vercel.app/",
        category: "visual-design"
    },
    {
        id: 6,
        title: "Eazy-Gadgets-Store",
        year: 2025,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/eazy-collage.jpg",
        description: "The Eazy-Gadgets-Store is an e-commerce website built using WordPress, Elementor, and WooCommerce with integrated payment gateway support. It showcases a modern and responsive online store design, featuring dynamic product listings, smooth navigation, and secure checkout functionality.",
        technologies: ["WordPress", "WooCommerce", "Elementor", "E-commerce"],
        liveUrl: "https://eazy-gadgets.com/",
        category: "visual-design"
    },
    {
        id: 7,
        title: "Gideon-AI",
        year: 2022,
        imageUrl: "https://ammadhussain-fullstack-dev.netlify.app/wp-content/uploads/2025/08/gideon-collage.jpg",
        description: "The Gideon Artificial Intelligence website is a WordPress-based research platform focused on AI tools and technology insights. It was designed to provide structured information, articles, and resources related to artificial intelligence advancements.",
        technologies: ["WordPress", "AI", "Research", "CMS"],
        liveUrl: null,
        category: "visual-design"
    }
];

/* ---------------- Render projects ---------------- */
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    if (filteredProjects.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = filteredProjects.map(project => `
        <article class="project-card">
            <div class="project-image">
                <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
                <div class="project-year">${project.year}</div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <p class="project-description">${project.description}</p>
                ${project.liveUrl ? `
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <span>View Live Project</span>
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                ` : ''}
            </div>
        </article>
    `).join('');
}

/* ---------------- Filter functionality ---------------- */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

/* ---------------- Smooth scroll for anchor links ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ---------------- Scroll animations ---------------- */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

function observeCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

/* Observe CTA */
const ctaContent = document.querySelector('.cta-content');
if (ctaContent) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    ctaObserver.observe(ctaContent);
}

/* Re-render projects with animation support */
const originalRenderProjects = renderProjects;
renderProjects = function(filter = 'all') {
    originalRenderProjects(filter);
    // Re-observe after rendering
    setTimeout(observeCards, 50);
};

/* Initialize */
renderProjects();
observeCards();

/* ---------------- Contact form handling ---------------- */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            return;
        }

        // Basic email pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formStatus.textContent = 'Please enter a valid email.';
            return;
        }

        // Disable UI while submitting
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';

        try {
            // Save to Firestore collection "messages"
            const colRef = collection(db, 'messages');
            await addDoc(colRef, {
                name,
                email,
                subject,
                message,
                createdAt: serverTimestamp()
            });

            // Success UI
            formStatus.style.color = 'var(--success)';
            formStatus.textContent = 'Message sent — thank you! I will get back to you soon.';
            contactForm.reset();
        } catch (err) {
            console.error('Error saving message:', err);
            formStatus.style.color = '#ff7b7b';
            formStatus.textContent = 'Sorry — something went wrong. Please try again later.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            // reset status color after a while
            setTimeout(() => {
                formStatus.style.color = '';
            }, 5000);
        }
    });
}
