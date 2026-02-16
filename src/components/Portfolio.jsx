import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'Neon Cyberpunk',
        category: '3D Illustration',
        description: 'A deep dive into futuristic urban landscapes, blending neon aesthetics with complex structural modeling for a premium sci-fi feel.',
        img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Organic Mech',
        category: 'Character Design',
        description: 'Exploring the intersection of biology and machinery. This project focuses on intricate detailing and realistic surface textures of synthetic organisms.',
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Void Ritual',
        category: 'VFX / CGI',
        description: 'A cinematic visual effect sequence capturing the essence of dark energy and abstract motion through custom particle systems.',
        img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1954&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Glitch Dimension',
        category: '3D Environment',
        description: 'Breaking the laws of virtual reality with distorted geometries and digital anomalies, creating an immersive, unstable environment.',
        img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop'
    },
];

export default function Portfolio() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]); // Refined percentage for 4 items

    return (
        <section ref={targetRef} id="work" className="section" style={{
            background: 'transparent',
            height: '350vh', /* Slightly reduced to make it faster/tighter */
            position: 'relative',
            padding: 0
        }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column', // Allow header to sit above
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden'
            }}>
                <div className="container" style={{
                    position: 'absolute',
                    top: '8vh', // Pinned higher up
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
                            color: 'var(--primary-glow)',
                            fontWeight: 700,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
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

                <motion.div style={{ x, display: 'flex', gap: '8vw', paddingLeft: 'min(15vw, 25vw)', marginTop: '10vh' }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                    {/* Extra space at the end */}
                    <div style={{ minWidth: '20vw' }}></div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    #work { height: auto !important; padding: 60px 0 !important; }
                    #work > div { position: relative !important; height: auto !important; display: block !important; overflow: visible !important; }
                    .horizontal-row { flex-direction: column !important; padding: 0 20px !important; gap: 60px !important; transform: none !important; }
                }
            `}</style>
        </section>
    );
}

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
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
        >
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
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.4em',
                        marginBottom: '15px',
                        textTransform: 'uppercase'
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
