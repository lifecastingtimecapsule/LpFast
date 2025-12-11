interface ValueCardProps {
  number: string;
  title: string;
  description: string;
}

export function ValueCard({ number, title, description }: ValueCardProps) {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-auto text-center px-6 py-8 bg-white rounded-sm border border-[#E5E0D8]">
      <div className="font-serif text-[2.5rem] md:text-[3rem] text-[#C4A962] opacity-30 mb-4 md:mb-6">
        {number}
      </div>
      <h4 className="font-serif text-[1.2rem] md:text-[1.5rem] mb-3 md:mb-4 text-[#2C2C2C] tracking-wide">
        {title}
      </h4>
      <p className="text-[0.9rem] md:text-[1rem] leading-relaxed text-[#666666] tracking-wide">
        {description.split('<br />').map((line, i) => (
          <span key={i}>
            {line}
            {i < description.split('<br />').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
}
