import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Offerings from './components/Offerings';
import Contact, { Footer } from './components/Contact';
import Background from './components/Background';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import './index.css';

function App() {
  const [phase, setPhase] = useState('loading'); // 'loading', 'video', 'reveal', 'site'

  return (
    <main>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <Loader key="loader" onFinished={() => setPhase('video')} />
        )}
      </AnimatePresence>

      {(phase === 'video' || phase === 'reveal' || phase === 'site') && (
        <Background
          phase={phase}
          onVideoEnded={() => setPhase('reveal')}
        />
      )}

      <AnimatePresence>
        {(phase === 'reveal' || phase === 'site') && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ width: '100%', position: 'relative', zIndex: 1 }}
          >
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Offerings />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
