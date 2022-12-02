import type { FC, ReactNode } from 'react';
import { Menu, MenuButton, MenuList, Button, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const WithAdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout-wrapper">
      <div>
        <Menu>
          <MenuButton as={Button} /* rightIcon={<ChevronDownIcon />} */>Menu</MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/admin/profile">
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/manage-staff">
              Manage Staff
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/manage-students">
              Manage Students
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/manage-courses">
              Manage Courses
            </MenuItem>
            <MenuItem as={RouterLink} to="/admin/settings">
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

export default WithAdminLayout;
