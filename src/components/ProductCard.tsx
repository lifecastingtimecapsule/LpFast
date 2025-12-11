interface ProductCardProps {
  title: string;
  subtitle?: string;
  items: {
    description: string;
    price: string;
  }[];
  note?: string;
  discount?: {
    original: string;
    current: string;
  };
}

export function ProductCard({ title, subtitle, items, note, discount }: ProductCardProps) {
  return (
    <div className="border-t border-b border-[#D4C5B0] py-12 md:py-16">
      <div className="text-center mb-12">
        <h3 className="font-serif text-[1.75rem] tracking-wide mb-3 text-[#2C2C2C]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[0.95rem] tracking-wider text-[#666666]">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="space-y-6 max-w-md mx-auto">
        {items.map((item, index) => {
          const [priceAmount, taxPart] = item.price.split('+TAX');
          return (
            <div key={index} className="flex flex-col md:flex-row md:justify-between items-center md:items-baseline gap-2 md:gap-0 px-6 md:px-8">
              <span className="text-[15px] tracking-wide text-[#4A4A4A]">{item.description}</span>
              <span className="font-serif text-[16px] text-[#2C2C2C]">
                {priceAmount}
                {item.price.includes('+TAX') && <span className="text-[13px] ml-0.5">+TAX</span>}
              </span>
            </div>
          );
        })}
        
        {discount && (
          <div className="flex flex-col md:flex-row md:justify-between items-center md:items-baseline gap-2 md:gap-0 px-6 md:px-8 pt-4">
            <span className="text-[0.95rem] tracking-wide text-[#4A4A4A]">Complete set with newborn photo</span>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[0.95rem] text-[#999999] line-through">
                {discount.original.split('+TAX')[0]}
                {discount.original.includes('+TAX') && <span className="text-[11px] ml-0.5">+TAX</span>}
              </span>
              <span className="font-serif text-[1.1rem] text-[#C4A962]">
                {discount.current.split('+TAX')[0]}
                <span className="text-[13px] ml-0.5">+TAX</span>
              </span>
            </div>
          </div>
        )}
        
        {note && (
          <p className="text-center text-[0.85rem] text-[#999999] tracking-wider pt-2">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
