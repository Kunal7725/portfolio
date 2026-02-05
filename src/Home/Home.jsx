import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { portfolioData } from '../Data/mock';
import {
    Code2,
    Palette,
    FileCode,
    Atom,
    Server,
    Database,
    Github,
    Linkedin,
    Twitter,
    Mail,
    ExternalLink,
    Download,
    Menu,
    X,
    CheckCircle2
} from 'lucide-react';

const iconMap = {
    Code2,
    Palette,
    FileCode,
    Atom,
    Server,
    Database
};

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visibleSections, setVisibleSections] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Intersection observer for scroll animations
            const sections = document.querySelectorAll('.animate-on-scroll');
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.8;
                if (isVisible) {
                    section.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="portfolio-container">
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <div className="nav-logo" onClick={() => scrollToSection('home')}>
                        <Code2 className="logo-icon" />
                        <span>{portfolioData.name}</span>
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a onClick={() => scrollToSection('home')}>Home</a>
                        <a onClick={() => scrollToSection('projects')}>Projects</a>
                        <a onClick={() => scrollToSection('about')}>About</a>
                        <a onClick={() => scrollToSection('contact')}>Contact</a>
                    </div>

                    <div className="nav-actions">
                        <Button className="download-btn" onClick={() => window.open(portfolioData.resumeLink, '_blank')}>
                            <Download className="btn-icon" />
                            Download CV
                        </Button>
                        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <div className="hero-text animate-on-scroll">
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">{portfolioData.name}</span>
                        </h1>
                        <h2 className="hero-subtitle">{portfolioData.title}</h2>
                        <p className="hero-description">{portfolioData.description}</p>
                        <div className="hero-buttons">
                            <Button className="primary-btn" onClick={() => scrollToSection('projects')}>
                                View Projects
                            </Button>
                            <Button variant="outline" className="secondary-btn" onClick={() => scrollToSection('contact')}>
                                Contact Me
                            </Button>
                        </div>
                    </div>

                    <div className="hero-image animate-on-scroll">
                        <div className="image-container">
                            <img
                                src="/images/ppp.png"
                                alt="Profile"
                                className="profile-img"
                            />
                            <div className="floating-icon icon-1">
                                <Atom size={32} />
                            </div>
                            <div className="floating-icon icon-2">
                                <FileCode size={32} />
                            </div>
                            <div className="floating-icon icon-3">
                                <Database size={32} />
                            </div>
                            <div className="floating-icon icon-4">
                                <Server size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">My Projects</h2>
                        <p className="section-subtitle">Here are some of the recent projects I've worked on.</p>
                    </div>

                    <div className="projects-grid">
                        {portfolioData.projects.map((project, index) => (
                            <Card key={project.id} className="project-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <Button className="overlay-btn" onClick={() => window.open(project.liveDemo, '_blank')}>
                                            <ExternalLink size={20} />
                                            View Live
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="tech-tags">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="project-footer">
                                    <Button className="project-btn" onClick={() => window.open(project.liveDemo, '_blank')}>
                                        <ExternalLink size={18} />
                                        Live Demo
                                    </Button>
                                    <Button variant="outline" className="project-btn" onClick={() => window.open(project.github, '_blank')}>
                                        <Github size={18} />
                                        GitHub
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="tech-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">Tech Stack</h2>
                    </div>
                    <div className="tech-grid animate-on-scroll">
                        {portfolioData.techStack.map((tech) => {
                            const IconComponent = iconMap[tech.icon];
                            return (
                                <div key={tech.name} className="tech-item">
                                    <IconComponent size={40} />
                                    <span>{tech.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="section-container">
                    <div className="about-content">
                        <div className="about-image animate-on-scroll">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                                alt="About me"
                                className="about-img"
                            />
                        </div>
                        <div className="about-text animate-on-scroll">
                            <h2 className="section-title">About Me</h2>
                            <p className="about-description">{portfolioData.about.description}</p>
                            <ul className="about-highlights">
                                {portfolioData.about.highlights.map((highlight, index) => (
                                    <li key={index}>
                                        <CheckCircle2 className="check-icon" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">Contact Me</h2>
                        <p className="section-subtitle">Let's work together on your next project</p>
                    </div>
                    <div className="contact-content animate-on-scroll">
                        <div className="contact-info">
                            <a href={`mailto:${portfolioData.email}`} className="contact-email">
                                <Mail size={24} />
                                {portfolioData.email}
                            </a>
                            <div className="social-links">
                                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Linkedin size={28} />
                                </a>
                                <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Github size={28} />
                                </a>
                                <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                    <Twitter size={28} />
                                </a>
                            </div>
                        </div>
                        <Button className="contact-btn" onClick={() => window.location.href = `mailto:${portfolioData.email}`}>
                            <Mail className="btn-icon" />
                            Send Message
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2023 {portfolioData.name}. All rights reserved.</p>
                    <div className="footer-social">
                        <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                        <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                        <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;