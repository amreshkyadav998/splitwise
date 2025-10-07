export function Card({ children, className = '' }) {
  return <div className={`bg-white rounded-xl border shadow-sm ${className}`}>{children}</div>;
}

export function CardHeader({ title, subtitle, actions }) {
  return (
    <div className="px-5 py-4 border-b flex items-center justify-between">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div>{actions}</div>
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}


