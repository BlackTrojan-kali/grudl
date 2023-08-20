import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
export default function Side({collapseSidebar}) {
  return (
    <Sidebar style={{ height: "100vh" }}>
      <br /><br /><br /><br /> <br />
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h1>Grudl</h1>
            
          </MenuItem>
          <SubMenu icon={<HomeOutlinedIcon />} label="Home">
            <MenuItem icon={<PeopleOutlinedIcon />}>Item 1</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>Item 2</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>Item 3</MenuItem>
      </SubMenu>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
  )
}
