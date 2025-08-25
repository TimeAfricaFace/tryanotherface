import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplet, Wind, Mountain } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Element } from '../../types';
import { getElementWisdom } from '../../theme/elements';

const elementIcons = {
  fire: Flame,
  water: Droplet,
  air: Wind,
  earth: Mountain,
};

const elements = (['fire', 'water', 'air', 'earth'] as Element[]).map(type => {
  const wisdom = getElementWisdom(type);
  return {
    type,
    icon: elementIcons[type],
    name: wisdom.name,
    sanskrit: wisdom.sanskrit,
    chinese: wisdom.chinese,
    description: wisdom.lifePath.purpose,
    keywords: wisdom.qualities.positive.slice(0, 4),
    direction: wisdom.direction,
    season: wisdom.season,
    deity: wisdom.traditions.vedic.deity,
  };
});

interface ElementSelectionProps {
  onSelect: (element: Element) => void;
}

export const ElementSelection: React.FC<ElementSelectionProps> = ({ onSelect }) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  const handleSelect = (element: Element) => {
    setSelectedElement(element);
  };

  const handleConfirm = () => {
    if (selectedElement) {
      onSelect(selectedElement);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-8">
            <img 
              src="/file_000000009c24624693dc549194d4cb7a.png" 
              alt="Try Another Face" 
              className="h-24 w-auto mx-auto mb-6"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your Element
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Your element reflects your inner nature and guides your journey. 
            Select the one that resonates most deeply with your authentic self.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {elements.map((element, index) => {
            const Icon = element.icon;
            const wisdom = getElementWisdom(element.type);
            const isSelected = selectedElement === element.type;
            const isHovered = hoveredElement === element.type;

            return (
              <motion.div
                key={element.type}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredElement(element.type)}
                onHoverEnd={() => setHoveredElement(null)}
                onClick={() => handleSelect(element.type)}
                className={`relative cursor-pointer p-8 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-300 ${
                  isSelected
                    ? `border-current bg-gradient-to-br ${wisdom.gradient}/20`
                    : 'border-white/20 hover:border-white/40'
                }`}
                style={{
                  borderColor: isSelected ? wisdom.primary : undefined,
                }}
              >
                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-full mb-4 bg-gradient-to-br ${wisdom.gradient}`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {element.name}
                  </h3>
                  
                  <div className="text-sm text-white/60 mb-3">
                    <p>{element.sanskrit} • {element.chinese}</p>
                    <p>{element.direction} • {element.season}</p>
                  </div>
                  
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {element.description}
                  </p>
                  
                  <div className="text-xs text-white/50 mb-4 italic">
                    "{element.deity}"
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {element.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg"
                  >
                    <div 
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${wisdom.gradient}`}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedElement ? 1 : 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedElement}
            element={selectedElement || undefined}
            className="px-12 py-4 text-lg shadow-2xl"
          >
            Embrace Your Element
          </Button>
          
          {selectedElement && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 mt-4 text-center max-w-md mx-auto"
            >
              You have chosen the path of {getElementWisdom(selectedElement).name}. 
              Your journey of {getElementWisdom(selectedElement).lifePath.lesson.toLowerCase()} begins now.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default ElementSelection;
