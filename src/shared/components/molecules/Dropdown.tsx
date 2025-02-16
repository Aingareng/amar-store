import React from "react";
import Menu from "./Menu";
import List from "../atoms/List";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";

export default function Dropdown() {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <Button attributes={{ tabIndex: 0, className: "btn m-1" }}>Detail</Button>

      <Menu
        attr={{
          tabIndex: 0,
          className:
            "dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
        }}
      >
        <List>
          <Link to="/">Item 1</Link>
        </List>
        <List>
          <Link to="/">Item 2</Link>
        </List>
      </Menu>
    </div>
  );
}
