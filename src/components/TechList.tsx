type TechListProps = {
  items: string[];
  ariaLabel: string;
  className?: string;
};

export function TechList({ items, ariaLabel, className = 'tech-list' }: TechListProps) {
  return (
    <div className={className} aria-label={ariaLabel}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
