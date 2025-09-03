import React from 'react';

type Props = { onComplete: () => void; onSkip: () => void };

const CinematicIntro: React.FC<Props> = ({ onComplete, onSkip }) => (
  <div className="p-6 text-white">
    <p className="mb-4">CinematicIntro placeholder</p>
    <div className="flex gap-3">
      <button onClick={onSkip} className="px-3 py-2 rounded bg-gray-700">Skip</button>
      <button onClick={onComplete} className="px-3 py-2 rounded bg-blue-600">Continue</button>
    </div>
  </div>
);

export default CinematicIntro;
