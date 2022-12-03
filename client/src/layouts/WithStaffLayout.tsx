import type { FC, ReactNode } from 'react';
import { Menu, MenuButton, MenuList, Button, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const WithStaffLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="staff-layout-wrapper">
      <div>
        <Menu>
          <MenuButton as={Button} /* rightIcon={<ChevronDownIcon />} */>Menu</MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/staff/profile">
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="/staff/manage/students">
              Manage Students
            </MenuItem>
            <MenuItem as={RouterLink} to="/staff/manage/courses">
              Manage Courses
            </MenuItem>
            <MenuItem as={RouterLink} to="/staff/manage/attendance">
              Manage Attendance
            </MenuItem>
            <MenuItem as={RouterLink} to="/staff/settings">
              Settings
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WithStaffLayout;
