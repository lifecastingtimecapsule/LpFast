interface TestimonialCardProps {
  quote: string;
  author: string;
  context: string;
}

export function TestimonialCard({ quote, author, context }: TestimonialCardProps) {
  return (
    <div className="bg-[#F8F6F3] p-8 md:p-12 rounded-sm">
      <p className="font-serif text-[1.2rem] md:text-[1.5rem] leading-[1.6] md:leading-relaxed mb-4 md:mb-6 text-[#2C2C2C]">
        「{quote}」
      </p>
      <div className="text-right">
        <p className="text-[0.9rem] md:text-[1rem] text-[#666666]">
          ━ {author} / {context}
        </p>
      </div>
    </div>
  );
}
