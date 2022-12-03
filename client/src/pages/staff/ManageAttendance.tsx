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
  Button,
} from '@chakra-ui/react';
import AddAttendance from '../../components/AddAttendance';
import { PlusSquareIcon, EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import MarkAttendance from '../../components/MarkAttendance';

const ManageAttendance: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerOpen2, setDrawerOpen2] = useState<boolean>(false);
  return (
    <WithStaffLayout>
      <Flex justifyContent="space-between" alignItems="center" marginTop="2rem">
        <Heading fontSize={25} fontWeight={600}>
          Manage Attendance
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
          <TableCaption>All Attendance</TableCaption>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Name</Th>
              <Th>Course</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Machine learning cont'd</Td>
              <Td>CSC407</Td>
              <Td>2222-03-2</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <Button
                    leftIcon={<CheckIcon />}
                    bg="var(--bg-primary)"
                    color="white"
                    _hover={{ background: 'var(--bg-primary-light)' }}
                    size="xs"
                    variant="solid"
                    onClick={() => setDrawerOpen2(true)}
                  >
                    Mark
                  </Button>
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
              <Td>Machine learning cont'd</Td>
              <Td>CSC407</Td>
              <Td>2222-03-2</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <Button
                    leftIcon={<CheckIcon />}
                    bg="var(--bg-primary)"
                    color="white"
                    _hover={{ background: 'var(--bg-primary-light)' }}
                    size="xs"
                    variant="solid"
                    onClick={() => setDrawerOpen2(true)}
                  >
                    Mark
                  </Button>
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
              <Td>Machine learning cont'd</Td>
              <Td>CSC407</Td>
              <Td>2222-03-2</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <Button
                    leftIcon={<CheckIcon />}
                    bg="var(--bg-primary)"
                    color="white"
                    _hover={{ background: 'var(--bg-primary-light)' }}
                    size="xs"
                    variant="solid"
                    onClick={() => setDrawerOpen2(true)}
                  >
                    Mark
                  </Button>
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

      <AddAttendance isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} size="md" />
      <MarkAttendance isOpen={drawerOpen2} onClose={() => setDrawerOpen2(false)} size="md" />
    </WithStaffLayout>
  );
};

export default ManageAttendance;
