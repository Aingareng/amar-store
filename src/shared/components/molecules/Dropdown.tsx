import Menu from "./Menu";
import List from "../atoms/List";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ButtonHTMLAttributes } from "react";

interface IProps {
  itemIndex?: number;
  onAction: (itemId: number) => void;
}

export default function Dropdown({ itemIndex, onAction }: IProps) {
  let menuPosition = "dropdown-left dropdown-end";

  if (itemIndex === 1) {
    menuPosition = "dropdown-end";
  }

  const deleteButtonAttr: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    onClick: () => handleClickDestroy(itemIndex as number),
  };

  function handleClickDestroy(id: number) {
    onAction(id);
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
        <List>
          <Link to={`/employee-details/${itemIndex}`}>Detail</Link>
        </List>
        <List>
          <Button attributes={deleteButtonAttr}>Hapus</Button>
        </List>
      </Menu>
    </div>
  );
}
