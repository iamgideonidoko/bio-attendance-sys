import { useState } from 'react';
import type { FC } from 'react';
import WithStaffLayout from '../../layouts/WithStaffLayout';
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
import AddStudent from '../../components/AddStudent';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ManageStudents: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <WithStaffLayout>
      <Flex justifyContent="space-between" alignItems="center" marginTop="2rem">
        <Heading fontSize={25} fontWeight={600}>
          Manage Students
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
          <TableCaption>All Students</TableCaption>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Name</Th>
              <Th>Matric Number</Th>
              <Th>Courses</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>James Peter</Td>
              <Td>james@peter.com</Td>
              <Td>CSC101, HSK101</Td>
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
              <Td>SCI19CSC232</Td>
              <Td>CSC101, HSK101</Td>
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
              <Td>CSC101, HSK101</Td>
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

      <AddStudent isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} size="md" />
    </WithStaffLayout>
  );
};

export default ManageStudents;
