import React, { useEffect, useState } from 'react';

interface BadgeNotificationProps {
  badge: string;
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Wait for fade out
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[200] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      <div className="animate-badge-pop bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(251,191,36,0.8)] border-2 border-white/30 backdrop-blur-md flex items-center gap-3 max-w-[90vw]">
        <span className="text-2xl md:text-3xl filter drop-shadow-md animate-bounce">🏆</span>
        <div>
          <h4 className="font-black text-[10px] md:text-xs uppercase tracking-widest text-yellow-100">Achievement Unlocked</h4>
          <p className="font-bold text-sm md:text-lg text-white drop-shadow-sm leading-tight">{badge}</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
