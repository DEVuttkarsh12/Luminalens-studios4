import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProjectLandingPage from './ProjectLandingPage';

// Local asset imports
import Cyber1 from '../assets/character design/Cyber_1.png';
import Chap1 from '../assets/character design/Chap_1.png';
import Vehicle1 from '../assets/3d enviroment/OKAYYYY_666.png';
import Vehicle2 from '../assets/3d enviroment/SS1_POST.png';
import Props1 from '../assets/3d animation/1_OldTemple.jpg';
import Props2 from '../assets/3d animation/Hell_2.png';
import Product1 from '../assets/product animation adn renders/Product_Study.png';
import Product2 from '../assets/product animation adn renders/2_FINAL_chair render.png';
import Product3 from '../assets/product animation adn renders/C1.png';
import Hair1 from '../assets/human hairs/1.png';
import Hair2 from '../assets/human hairs/Color Correction-1766056926000.png';

const projects = [
    {
        id: 1,
        title: '3D Objects & Props',
        category: '3D Objects / Props',
        description: 'Detailed 3D prop modeling and environment assets, showcasing high-fidelity textures and complex structural design from ancient relics to futuristic artifacts.',
        img: Props1,
        slides: [
            {
                src: Props1,
                title: 'The Old Temple',
                description: 'An atmospheric study of ancient architecture. This piece focused on modular environment design, stone textures, and dramatic lighting to evoke a sense of history and mystery.'
            },
            {
                src: Props2,
                title: 'Infernal Gate — Prop Design',
                description: 'A dark, high-detail prop design exploring aggressive silhouettes and emissive material effects. This artifact was created to serve as a focal point in a cinematic fantasy environment.'
            }
        ]
    },
    {
        id: 2,
        title: 'Organic Mech',
        category: 'Character Design',
        description: 'Exploring the intersection of biology and machinery through meticulously crafted characters that blur the line between organic and synthetic.',
        img: Cyber1,
        slides: [
            {
                src: Cyber1,
                title: 'Cyberpunk Enforcer',
                description: 'A heavily armoured street enforcer designed for the neon-lit underbelly of a dystopian megacity. Every plate and joint was sculpted to convey raw mechanical power fused with organic musculature.'
            },
            {
                src: Chap1,
                title: 'Chap — Retro Mech',
                description: 'A retro-futuristic mech character blending vintage industrial aesthetics with modern rendering techniques. Chap bridges the gap between nostalgia and cutting-edge 3D artistry.'
            }
        ]
    },
    {
        id: 3,
        title: 'Void Ritual',
        category: 'VFX / CGI',
        description: 'A cinematic visual effect sequence capturing the essence of dark energy and abstract motion through custom particle systems. Experience the ethereal beauty of the void through simulated physics and light.',
        img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1954&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1954&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
        ]
    },
    {
        id: 4,
        title: 'Futuristic Vehicles',
        category: '3D Vehicles / Environments',
        description: 'High-fidelity 3D modeling and rendering of futuristic vehicles integrated into complex, atmospheric environments. This project focuses on the synergy between hard-surface modeling and cinematic lighting.',
        img: Vehicle2,
        slides: [
            {
                src: Vehicle1,
                title: 'Interceptor — Concept Vehicle',
                description: 'A high-speed interceptor designed for urban pursuit. This piece explores intricate mechanical detailing and material realism, showcasing a blend of aggressive aerodynamics and functional engineering.'
            },
            {
                src: Vehicle2,
                title: 'The Outpost — Environment',
                description: 'A cinematic wide shot featuring the Interceptor stationed at a remote industrial outpost. This scene demonstrates advanced environmental storytelling through atmospheric fog, lighting, and texture work.'
            }
        ]
    },
    {
        id: 5,
        title: 'Product Art & Animation',
        category: 'Motion Design / 3D',
        description: 'Premium 3D product renders and animations focusing on elegant forms, realistic materials, and cinematic presentation. This project highlights the precision of 3D craft in modern marketing.',
        img: Product2,
        slides: [
            {
                src: Product1,
                title: 'Abstract Aesthetics',
                description: 'An exploration of abstract forms and procedural materials. This render captures the interplay between complex geometry and refractive light in a minimalist composition.'
            },
            {
                src: Product2,
                title: 'Premium Lounge Chair',
                description: 'A photorealistic product render emphasizing material tactile quality—from the fine leather grain to the brushed metal frame. Crafted for high-end furniture visualization.'
            },
            {
                src: Product3,
                title: 'Minimalist Device Study',
                description: 'A sleek, clean study of a futuristic electronic device. This piece focuses on subtle curved surfaces, precise parting lines, and soft, studio-quality lighting.'
            }
        ]
    },
    {
        id: 6,
        title: 'Realistic Human Hair',
        category: 'CGI / Character Art',
        description: 'Hyper-realistic grooming and hair simulation, focusing on intricate detail, natural flow, and physically accurate lighting. This project showcases advanced techniques in digital hair simulation.',
        img: Hair1,
        slides: [
            {
                src: Hair1,
                title: 'Hair Detail — Flow & Groom',
                description: 'A study in realistic hair grooming, focusing on the natural distribution and flow of individual strands. This render demonstrates high-fidelity hair simulation with complex layering.'
            },
            {
                src: Hair2,
                title: 'Color & Lighting Variant',
                description: 'Exploring different lighting setups and color corrections to highlight the subsurface scattering and metallic-like sheen of high-quality digital hair.'
            }
        ]
    },
    {
        id: 7,
        title: 'Social Media Mastery',
        category: 'Social Media Handling',
        description: 'Elevating brand presence through strategic content creation, community engagement, and data-driven growth strategies. We turn followers into loyal advocates.',
        img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
        slides: [
            {
                src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
                title: 'Content Strategy',
                description: 'Developing a cohesive visual language and voice that resonates across all platforms, from TikTok to LinkedIn.'
            },
            {
                src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
                title: 'Growth Analytics',
                description: 'Leveraging real-time data to optimize performance and maximize reach through targeted campaigns and organic engagement.'
            }
        ]
    },
    {
        id: 8,
        title: 'Next-Gen Web Dev',
        category: 'Web Development',
        description: 'Building high-performance, immersive web experiences that combine cutting-edge technology with intuitive design. From complex apps to stunning portfolios.',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
        slides: [
            {
                src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
                title: 'Performance Optimization',
                description: 'Ensuring lightning-fast load times and smooth interactions through modern frameworks and clean architecture.'
            },
            {
                src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                title: 'Immersive Interfaces',
                description: 'Creating unique digital experiences using 3D, motion, and interactive elements that captivate users from the first click.'
            }
        ]
    }
];

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

    const handleNextProject = () => {
        if (!selectedProject) return;
        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setSelectedProject(projects[nextIndex]);
    };

    return (
        <section ref={targetRef} id="work" className="section" style={{
            background: 'transparent',
            height: '450vh', /* Increased for more projects */
            position: 'relative',
            padding: 0
        }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden'
            }}>
                <div className="container portfolio-heading-container" style={{
                    position: 'absolute',
                    top: '8vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                    >
                        <span style={{
                            color: '#fff',
                            fontWeight: 700,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Latest Work
                        </span>
                        <h2 className="text-gradient-purple" style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                            fontWeight: 900,
                            lineHeight: 1
                        }}>
                            What We’ve Built
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    className="horizontal-row"
                    style={{ x, display: 'flex', gap: '8vw', paddingLeft: 'min(15vw, 25vw)', marginTop: '10vh' }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                    {/* Extra space at the end */}
                    <div style={{ minWidth: '20vw' }}></div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {selectedProject && (
                        <ProjectLandingPage
                            key={selectedProject.id}
                            project={selectedProject}
                            isOpen={!!selectedProject}
                            onClose={() => setSelectedProject(null)}
                            onNext={handleNextProject}
                        />
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    #work { height: auto !important; padding: 120px 0 80px 0 !important; }
                    #work > div { position: relative !important; height: auto !important; display: block !important; overflow: visible !important; }
                    .horizontal-row { 
                        flex-direction: column !important; 
                        padding: 0 5% !important; 
                        gap: 20px !important; 
                        transform: none !important; 
                        margin-top: 20px !important;
                    }
                    .horizontal-row + div { display: none; } /* Hide the extra spacer on mobile */
                    
                    /* Fix heading overlap with robust selector */
                    .portfolio-heading-container {
                        position: relative !important;
                        top: 0 !important;
                        left: 0 !important;
                        transform: none !important;
                        margin-bottom: 60px !important;
                        padding: 0 20px !important;
                        pointer-events: auto !important; /* Re-enable pointer events for possible child links */
                    }
                }

                @media (max-width: 480px) {
                    #work { padding: 80px 0 40px 0 !important; }
                    .vertical-spacer { display: none !important; }
                    .horizontal-row {
                        margin-top: 30px !important;
                        gap: 30px !important;
                    }
                    .portfolio-heading-container {
                        margin-bottom: 50px !important;
                    }
                    .portfolio-heading-container h2 {
                        font-size: clamp(2rem, 10vw, 2.6rem) !important;
                    }
                    .portfolio-heading-container span {
                        font-size: 0.7rem !important;
                    }
                }
            `}</style>
        </section>
    );
}

function ProjectCard({ project, index, onClick }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            className="portfolio-card-container"
            ref={cardRef}
            style={{
                minWidth: '70vw',
                height: '60vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '15vh',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <style>{`
                @media (max-width: 768px) {
                    .portfolio-card-container { 
                        min-width: 100% !important; 
                        height: 480px !important; 
                        margin-top: 0 !important;
                    }
                }
                @media (max-width: 480px) {
                    .portfolio-card-container {
                        height: 400px !important;
                    }
                    .portfolio-card-container h3 {
                        font-size: 2rem !important;
                    }
                    .portfolio-card-container p {
                        font-size: 0.85rem !important;
                    }
                    .portfolio-card-container div[style*="fontSize: '10rem'"] {
                        font-size: 6rem !important;
                        top: 20px !important;
                        right: 30px !important;
                    }
                }
            `}</style>
            <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <motion.img
                    src={project.img}
                    alt={project.title}
                    whileHover={{ scale: 1.05, filter: 'grayscale(0%) brightness(1)' }}
                    transition={{ duration: 0.8 }}
                    style={{
                        width: '100%',
                        height: '120%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: yParallax,
                        filter: 'grayscale(20%) brightness(0.7)'
                    }}
                />

                {/* Overlay Content */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    padding: 'clamp(30px, 5vw, 60px)',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    zIndex: 2
                }}>
                    <span style={{
                        color: '#fff',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        letterSpacing: '0.4em',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        opacity: 0.9
                    }}>
                        {project.category}
                    </span>
                    <h3 className="text-premium" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '20px',
                        color: '#fff'
                    }}>
                        {project.title}
                    </h3>
                    <p style={{
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '600px',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        fontWeight: 300
                    }}>
                        {project.description}
                    </p>
                </div>

                {/* Numbering */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '60px',
                    fontSize: '10rem',
                    fontWeight: 400,
                    opacity: 0.05,
                    color: '#fff',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
            </motion.div>
        </div>
    );
}
