import Menu from "./Menu";
import List from "../atoms/List";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  itemIndex?: number;
}

export default function Dropdown({ itemIndex }: IProps) {
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
        <List>
          <Link to={`/employee-details/${itemIndex}`}>Detail</Link>
        </List>
        <List>
          <Link to="/">Hapus</Link>
        </List>
      </Menu>
    </div>
  );
}
