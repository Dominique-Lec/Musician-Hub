import { useTheme } from '../contexts/ThemeContext';

const Logo = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
        <span className="text-white font-bold text-lg">M</span>
      </div>
      <span className="font-bold text-xl text-light dark:text-light light:text-dark transition-colors duration-200">
        MusicianHub
      </span>
    </div>
  );
};

export default Logo;
