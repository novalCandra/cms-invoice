import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Completely remove the splash screen after the fade out animation (0.5s)
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-accent-yellow border-8 border-black transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative group cursor-wait">
        {/* Decorative background shadow element typical of neo-brutalism */}
        <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>

        {/* Main Logo Container */}
        <div className="relative flex flex-col items-center justify-center bg-white border-4 border-black px-12 py-8">
          <h1 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter">
            Invoix
          </h1>
          <p className="text-xl font-bold font-mono uppercase tracking-widest mt-2 bg-black text-white px-3 py-1">
            CMS System
          </p>
        </div>
      </div>

      {/* Loading Indicators */}
      <div className="flex justify-center items-center gap-3 mt-12">
        <div
          className="w-6 h-6 bg-accent-red border-4 border-black animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-6 h-6 bg-accent-blue border-4 border-black animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-6 h-6 bg-white border-4 border-black animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;
