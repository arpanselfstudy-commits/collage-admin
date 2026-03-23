import { FaShopify } from 'react-icons/fa';
import dashboardicon from '../../assets/images/icon-dashboard.svg';
import { MdWork } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { MdOutlineContentPaste } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";


interface SidebarProps {
  isSidebarToggled: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarToggled, toggleSidebar }: SidebarProps) => {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header flex justify-between items-center mb-6 lg:mb-0">
          <button className="sidebar-close" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <div className="sidebarmenu">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  <img src={dashboardicon} alt="icon" />
                </span>{' '}
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop-management"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  {/* <img src={dashboardicon} alt="icon" /> */}
                  <FaShopify size={24} />

                </span>{' '}
                Shop Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/job-management"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  {/* <img src={dashboardicon} alt="icon" /> */}
                  <MdWork size={24} />

                </span>{' '}
                Job Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cms"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  {/* <img src={dashboardicon} alt="icon" /> */}
                  <MdOutlineContentPaste size={24} />

                </span>{' '}
                CMS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                end
                className={({ isActive }) => `rounded-[10px] flex ${isActive ? 'active' : ''}`}
              >
                <span>
                  {/* <img src={dashboardicon} alt="icon" /> */}
                  <IoMdLogOut size={24} color='red' />

                </span>{' '}
                Logout
              </NavLink>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
