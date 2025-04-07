import React from "react";
import styles from "./Sidebar.module.css";
import { CgAdd } from "react-icons/cg";
import { LuCalendarCheck } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarOptions}>
        <NavLink to="/add" className={styles.sidebarOption}>
          <CgAdd className="text-4xl" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className={styles.sidebarOption}>
          <LuCalendarCheck className="text-4xl" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className={styles.sidebarOption}>
          <LuCalendarCheck className="text-4xl" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
