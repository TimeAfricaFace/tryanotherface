import React from 'react';
import type { Element } from '../../types';

type Props = { onSelect: (el: Element) => void };

const choices: Element[] = ['fire','water','earth','air'] as unknown as Element[];

const ElementSelection: React.FC<Props> = ({ onSelect }) => (
  <div className="p-6 grid grid-cols-2 gap-3 text-white">
    {choices.map((c, i) => (
      <button key={i} onClick={() => onSelect(c)} className="px-3 py-2 rounded bg-purple-700 hover:bg-purple-600">
        {String(c)}
      </button>
    ))}
  </div>
);

export default ElementSelection;
