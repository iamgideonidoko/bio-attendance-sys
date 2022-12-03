import { useState } from 'react';
import type { FC } from 'react';
import WithAdminLayout from '../../layouts/WithAdminLayout';
import {
  Heading,
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import AddStaff from '../../components/AddStaff';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const AdminManageStaff: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <WithAdminLayout>
      <Flex justifyContent="space-between" alignItems="center" marginTop="2rem">
        <Heading fontSize={25} fontWeight={600}>
          Manage Staff
        </Heading>
        <IconButton
          bg="var(--bg-primary)"
          color="white"
          aria-label="Add staff"
          icon={<PlusSquareIcon fontSize={20} onClick={() => setDrawerOpen(true)} />}
        />
      </Flex>

      <TableContainer marginTop={10}>
        <Table variant="simple">
          <TableCaption>All Staff</TableCaption>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>James Peter</Td>
              <Td>james@peter.com</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit staff"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete staff"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>James Peter</Td>
              <Td>james@peter.com</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit staff"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete staff"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>James Peter</Td>
              <Td>james@peter.com</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit staff"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete staff"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <AddStaff isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} size="md" />
    </WithAdminLayout>
  );
};

export default AdminManageStaff;
