"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCode, FiCpu, FiServer } from 'react-icons/fi';
import { SiTypescript, SiReact, SiNodedotjs, SiPython, SiDjango, SiPostgresql } from 'react-icons/si';
import dynamic from 'next/dynamic';

// Dynamically load motion components to prevent SSR issues
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionAnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });

const TechFlappy = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500, scale: 1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [score, setScore] = useState(0);
  const [droneY, setDroneY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const gameLoopRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Tech stack configuration
  const techStack = [
    { icon: <SiTypescript className="text-blue-400" />, label: 'TypeScript' },
    { icon: <SiReact className="text-cyan-400" />, label: 'React' },
    { icon: <SiNodedotjs className="text-green-400" />, label: 'Node.js' },
    { icon: <SiPython className="text-yellow-400" />, label: 'Python' },
    { icon: <SiDjango className="text-emerald-400" />, label: 'Django' },
    { icon: <SiPostgresql className="text-blue-300" />, label: 'PostgreSQL' },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Responsive canvas setup
  useEffect(() => {
    if (!hasMounted) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scale = Math.min(1, rect.width / 800);
        setDimensions({
          width: rect.width,
          height: 500 * scale,
          scale
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [hasMounted]);

  // Game engine
  useEffect(() => {
    if (!hasMounted || !isPlaying || !isExpanded || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const { width, height, scale } = dimensions;
    const obstacleWidth = 60 * scale;
    const gravity = 0.5 * scale;
    const jumpForce = -8 * scale;

    const gameLoop = () => {
      // Physics update
      setVelocity(v => v + gravity);
      setDroneY(y => Math.max(0, Math.min(y + velocity, height - 30 * scale)));

      // Obstacle management
      setObstacles(prev => {
        let updated = prev.filter(obs => obs.x > -obstacleWidth);
        updated.forEach(obs => obs.x -= 2 * scale);
        
        if (updated.length === 0 || updated[updated.length - 1].x < width * 0.6) {
          const gap = 150 * scale;
          const minHeight = 50 * scale;
          const maxHeight = height - gap - minHeight;
          const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
          
          updated.push({
            x: width,
            topHeight,
            bottomHeight: height - topHeight - gap,
            type: 'server'
          });
        }

        if (Math.random() < 0.015) {
          updated.push({
            x: width,
            y: Math.random() * (height - 40 * scale),
            type: 'powerup',
            tech: techStack[Math.floor(Math.random() * techStack.length)]
          });
        }

        return updated;
      });

      // Collision detection
      const droneRect = { x: 100 * scale, y: droneY, size: 30 * scale };
      const collision = obstacles.some(obs => {
        if (obs.type === 'powerup') {
          const dx = obs.x - droneRect.x;
          const dy = obs.y - droneRect.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 35 * scale) {
            setScore(s => s + 10);
            return false;
          }
        } else {
          return (
            droneRect.x < obs.x + obstacleWidth &&
            droneRect.x + droneRect.size > obs.x &&
            (droneRect.y < obs.topHeight || 
             droneRect.y + droneRect.size > height - obs.bottomHeight)
          );
        }
      });

      if (collision || droneY >= height - 30 * scale) {
        setIsPlaying(false);
        cancelAnimationFrame(gameLoopRef.current);
      } else {
        setScore(s => s + 1);
      }

      // Rendering
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw binary background
      ctx.fillStyle = '#1e293b33';
      ctx.font = `${12 * scale}px monospace`;
      for(let i = 0; i < width; i += 60 * scale) {
        for(let j = 0; j < height; j += 30 * scale) {
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', i, j);
        }
      }

      // Draw drone
      ctx.fillStyle = '#00ff99';
      ctx.beginPath();
      ctx.arc(droneRect.x, droneRect.y + 15 * scale, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00ff99';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(droneRect.x - 15 * scale, droneRect.y + 15 * scale);
      ctx.lineTo(droneRect.x + 15 * scale, droneRect.y + 15 * scale);
      ctx.moveTo(droneRect.x, droneRect.y);
      ctx.lineTo(droneRect.x, droneRect.y + 30 * scale);
      ctx.stroke();

      // Draw obstacles
      obstacles.forEach(obs => {
        if (obs.type === 'server') {
          ctx.fillStyle = '#334155';
          ctx.fillRect(obs.x, 0, obstacleWidth, obs.topHeight);
          ctx.fillRect(obs.x, height - obs.bottomHeight, obstacleWidth, obs.bottomHeight);

          ctx.fillStyle = '#00ff99';
          for(let i = 10 * scale; i < obs.topHeight; i += 20 * scale) {
            ctx.beginPath();
            ctx.arc(obs.x + 20 * scale, i, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (obs.type === 'powerup') {
          ctx.fillStyle = '#ffffff33';
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, 20 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = `${12 * scale}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText('+10', obs.x, obs.y + 5 * scale);
        }
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    // Controls
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setVelocity(jumpForce);
      }
    };

    const handleTouch = (e) => {
      e.preventDefault();
      setVelocity(jumpForce);
    };

    window.addEventListener('keydown', handleKeyPress);
    canvasRef.current.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      canvasRef.current?.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [hasMounted, isPlaying, obstacles, droneY, velocity, isExpanded, dimensions, techStack]);

  const startGame = () => {
    const { height, scale } = dimensions;
    setDroneY(height / 2 - 15 * scale);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
    setIsPlaying(true);
  };

  if (!hasMounted) return null;

  return (
    <MotionDiv
      className="relative mt-16 p-4 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      ref={containerRef}
    >
      <div className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-white/50">
            Code Deployment Challenge
          </h1>
          <p className="text-sm text-white/60 mt-1">Navigate through server infrastructure</p>
        </div>
        <MotionDiv
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="p-2 rounded-full bg-white/5 group-hover:bg-primary-accent/20 transition-colors"
        >
          <FiChevronDown className="text-2xl md:text-4xl text-primary-accent" />
        </MotionDiv>
      </div>

      <MotionAnimatePresence>
        {isExpanded && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="relative">
                <canvas 
                  ref={canvasRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  className="w-full h-auto rounded-lg border border-white/10 bg-primary/5 touch-pan-y"
                  style={{ touchAction: 'none' }}
                  tabIndex="0"
                  onKeyDown={(e) => e.code === 'Space' && e.preventDefault()}
                />
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="flex flex-wrap justify-center gap-3 mb-4">
                        {techStack.map((tech, i) => (
                          <div key={i} className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                            {tech.icon}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={startGame}
                        className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-accent text-black font-bold hover:bg-white transition-colors text-sm md:text-base"
                      >
                        {score > 0 ? `Retry Deployment (${score})` : 'Initialize System'}
                      </button>
                      <p className="mt-4 text-white/60 text-sm md:text-base">
                        {typeof window !== 'undefined' && window.innerWidth < 768 ? 'Tap to ascend' : 'Press SPACE to adjust altitude'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex flex-wrap justify-between items-center text-white/80 text-sm md:text-base gap-4">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <FiServer className="text-primary-accent" />
                  <span>Deployed Modules: {score}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <FiCpu className="text-primary-accent" />
                  <span>Tech Stack: {techStack.length}</span>
                </div>
              </div>

              {score > 100 && (
                <MotionDiv 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center"
                >
                  <FiCode className="inline-block text-2xl mb-2 text-green-400" />
                  <p className="text-green-400">
                    New Project Unlocked: {techStack[Math.floor(score/100) % techStack.length].label}
                  </p>
                </MotionDiv>
              )}
            </div>
          </MotionDiv>
        )}
      </MotionAnimatePresence>
    </MotionDiv>
  );
};

export default dynamic(() => Promise.resolve(TechFlappy), { ssr: false });