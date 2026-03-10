import React, { useState } from 'react';

interface ReverieSliderProps {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  unit?: string;
  color?: string;
  className?: string;
}

export function ReverieSlider({ 
  label, 
  min = 0, 
  max = 100,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  unit = '',
  color = '#6A7FDB',
  className = ''
}: ReverieSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label and value */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-[#A9B8FF]">
          {label}
        </label>
        <span className="text-sm font-medium text-[#F6D6FF]" style={{
          textShadow: `0 0 10px ${color}60`
        }}>
          {value}{unit}
        </span>
      </div>
      
      {/* Slider container */}
      <div className="relative">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
          {/* Progress fill with gradient */}
          <div 
            className="h-full rounded-full transition-all duration-150 ease-out relative"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
              boxShadow: `0 0 15px ${color}80`
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}40)`,
              }}
            />
          </div>
        </div>
        
        {/* Input range */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="relative w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
          style={{
            WebkitAppearance: 'none',
          }}
        />
        
        {/* Custom thumb styling via inline style */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${color};
            cursor: pointer;
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 20px ${color}80;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.15), 0 0 25px ${color};
          }
          
          input[type="range"]::-webkit-slider-thumb:active {
            transform: scale(1.05);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border: none;
            border-radius: 50%;
            background: ${color};
            cursor: pointer;
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 20px ${color}80;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.15), 0 0 25px ${color};
          }
          
          input[type="range"]::-moz-range-thumb:active {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </div>
  );
}
