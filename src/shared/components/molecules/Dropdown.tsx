import Menu from "./Menu";
import Button from "../atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

interface IProps {
  itemIndex?: number;
  onAction?: (itemId: number) => void;
  children: ReactNode;
}

export default function Dropdown({ itemIndex, children }: IProps) {
  let menuPosition = "dropdown-left dropdown-end";

  if (itemIndex === 1) {
    menuPosition = "dropdown-end";
  }

  return (
    <div className={`dropdown ${menuPosition}`}>
      <Button
        attributes={{
          tabIndex: 0,
          className: "btn m-1 btn-outline btn-primary btn-sm px-1",
        }}
      >
        <Icon icon="material-symbols:more-vert" width="24" height="24" />
      </Button>
      <Menu
        attr={{
          tabIndex: 0,
          className:
            "dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
        }}
      >
        {children}
      </Menu>
    </div>
  );
}
