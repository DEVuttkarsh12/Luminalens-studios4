import { motion } from 'framer-motion';
import { Box, User, Zap, Palette, Share2, Play, Layout } from 'lucide-react';

const services = [
    {
        title: '3D Design & Visualisation',
        desc: 'High-quality 3D design and visualisation for products, spaces, and digital experiences. Used to explore form, scale, and realism across platforms.',
        icon: <Box size={32} />
    },
    {
        title: 'Character Design & Illustration',
        desc: 'Original character design and illustration for brands, campaigns, and storytelling. From early concepts to fully developed character styles.',
        icon: <User size={32} />
    },
    {
        title: 'CGI & VFX',
        desc: 'CGI and visual effects created to enhance stories and brand communication. From subtle effects to detailed, high-impact visuals.',
        icon: <Zap size={32} />
    },
    {
        title: 'Branding & Visual Identity Design',
        desc: 'Branding and visual identity design that stays consistent and recognisable. Logos, brand systems, and visual guidelines built for long-term use.',
        icon: <Palette size={32} />
    },
    {
        title: 'Social Media Design & Content Creation',
        desc: 'Social media design and content creation for everyday brand presence. Platform-specific visuals, motion content, and creative formats.',
        icon: <Share2 size={32} />
    },
    {
        title: 'Motion Graphics & Animation',
        desc: 'Motion graphics and animation designed to add clarity and movement. Explainers, transitions, and animated brand elements.',
        icon: <Play size={32} />
    },
    {
        title: 'Campaign Design & Visual Systems',
        desc: 'Campaign design and visual systems that work across channels. Connecting individual assets into one cohesive visual language.',
        icon: <Layout size={32} />
    }
];

export default function Services() {
    return (
        <section id="services" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '5rem', textAlign: 'center' }}
                >
                    <span style={{ color: 'var(--primary-glow)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase' }}>Capabilities</span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginTop: '1rem', fontWeight: 900 }}>What We Do Best</h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px',
                }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card-premium"
                            style={{
                                padding: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '25px',
                                minHeight: '320px',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{
                                color: 'var(--primary-glow)',
                                background: 'rgba(127, 58, 161, 0.1)',
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{service.desc}</p>

                            <div style={{
                                position: 'absolute',
                                top: '30px',
                                right: '30px',
                                fontSize: '3rem',
                                fontWeight: 900,
                                opacity: 0.03,
                                fontVariantNumeric: 'tabular-nums',
                                color: '#fff'
                            }}>
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
