import { ImageWithFallback } from './figma/ImageWithFallback';
import { Instagram } from './Icons';

interface TeamCardProps {
  image: string;
  role: string;
  name: string;
  description: string;
  staffName?: string;
  instagram?: string;
}

export function TeamCard({ image, role, name, description, staffName, instagram }: TeamCardProps) {
  return (
    <div className="text-center group">
      <div className="relative h-[320px] mb-8 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="space-y-4">
        <p className="text-[0.75rem] tracking-[0.4em] text-[#C4A962] uppercase font-light">
          {role}
        </p>
        <h4 className="font-serif text-[1.4rem] text-[#2C2C2C] tracking-wide">
          {name}
        </h4>
        <div className="h-8">
          {staffName && (
            <p className="text-[1.1rem] text-[#2C2C2C] tracking-[0.1em] font-light">
              {staffName}
            </p>
          )}
        </div>
        <div className="pt-2 pb-4">
          <p className="text-[0.95rem] leading-relaxed text-[#666666] tracking-wide px-2 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
