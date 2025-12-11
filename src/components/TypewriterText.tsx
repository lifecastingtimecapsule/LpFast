import { useEffect } from "react";


interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 100, 
  className = "", 
  style,
  onComplete 
}: TypewriterTextProps) {
  const characters = text.split('');

  useEffect(() => {
    // 全ての文字が表示された後にonCompleteを呼ぶ
    if (onComplete) {
      const totalDuration = delay + (characters.length * speed);
      const timeout = setTimeout(onComplete, totalDuration);
      return () => clearTimeout(timeout);
    }
  }, [delay, speed, characters.length, onComplete]);

  return (
    null
  );
}
