export function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>;
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${className}`}
      {...props}
    />
  );
}


