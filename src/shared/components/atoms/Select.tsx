import { ReactNode, SelectHTMLAttributes } from "react";

interface IProps {
  attr: SelectHTMLAttributes<HTMLSelectElement>;
  children: ReactNode;
  disableOptionLabel?: string;
}

export default function Select({ disableOptionLabel, children, attr }: IProps) {
  const defaultChildren = (
    <>
      <option value="item-1">item 1</option>
      <option value="item-2">item 2</option>
    </>
  );

  return (
    <select {...attr} defaultValue="default">
      <option disabled value="default">
        {disableOptionLabel ? disableOptionLabel : "Pick one"}
      </option>
      {children ? children : defaultChildren}
    </select>
  );
}
