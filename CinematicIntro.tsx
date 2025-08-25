import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface Scene {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
}

const scenes: Scene[] = [
  {
    id: 'forgotten-self',
    title: 'The Forgotten Self',
    subtitle: 'Behind every mask lies truth',
    description: 'In a world of endless facades, we lose sight of who we truly are.',
    background: 'from-gray-900 via-gray-800 to-gray-900',
  },
  {
    id: 'elemental-call',
    title: 'The Elemental Call',
    subtitle: 'Four forces guide us home',
    description: 'Fire ignites passion, Water flows with wisdom, Air brings clarity, Earth grounds us.',
    background: 'from-orange-900 via-blue-900 via-indigo-200 to-green-900',
  },
  {
    id: 'invitation',
    title: 'Try Another Face',
    subtitle: 'Your authentic self awaits',
    description: 'Step beyond the masks. Discover the element that resonates with your soul.',
    background: 'from-purple-900 via-blue-900 to-indigo-900',
  },
];

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, onSkip }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else {
        onComplete();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying, onComplete]);

  const handleSkip = () => {
    setIsPlaying(false);
    onSkip();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${scenes[currentScene].background}`}
        />
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {currentScene === scenes.length - 1 ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src="/file_000000009c24624693dc549194d4cb7a.png" 
                      alt="Try Another Face" 
                      className="h-32 md:h-48 w-auto mb-4"
                    />
                    <span className="text-4xl md:text-6xl">{scenes[currentScene].title}</span>
                  </div>
                ) : (
                  scenes[currentScene].title
                )}
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-3xl mb-8 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {scenes[currentScene].subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {scenes[currentScene].description}
              </motion.p>

              {currentScene === scenes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  className="mt-12"
                >
                  <Button
                    size="lg"
                    onClick={onComplete}
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-xl"
                  >
                    Begin Your Journey
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleSkip}
        className="absolute top-8 right-8 z-20 text-white/60 hover:text-white transition-colors"
      >
        Skip Introduction
      </motion.button>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index <= currentScene ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};