import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function Alert({ children }: IProps) {
  const defaultContent = <span>This is Alert Content.</span>;

  return (
    <div className="alert alert-success">
      {children ? children : defaultContent}
    </div>
  );
}
