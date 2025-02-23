interface IProps {
  children: React.ReactNode;
  label: string | React.ReactNode;
  [key: string]: unknown;
}

export default function Submenu({
  label = "Parent",
  children,
  ...other
}: IProps) {
  return (
    <details {...other}>
      <summary>{label}</summary>
      {children}
    </details>
  );
}
