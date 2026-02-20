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
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[200] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      <div className="animate-badge-pop bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(251,191,36,0.8)] border-4 border-white/30 backdrop-blur-md flex items-center gap-4">
        <span className="text-4xl filter drop-shadow-md animate-bounce">🏆</span>
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest text-yellow-100">Achievement Unlocked</h4>
          <p className="font-bold text-xl text-white drop-shadow-sm">{badge}</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
