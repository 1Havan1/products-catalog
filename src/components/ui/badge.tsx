export const Badge = ({ children, className = "" }: any) => (
  <span className={"inline-flex items-center px-2 py-1 rounded " + className}>{children}</span>
);