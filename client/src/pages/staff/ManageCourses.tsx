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
import AddCourse from '../../components/AddCourse';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ManageCourses: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <WithStaffLayout>
      <Flex justifyContent="space-between" alignItems="center" marginTop="2rem">
        <Heading fontSize={25} fontWeight={600}>
          Manage Course
        </Heading>
        <IconButton
          bg="var(--bg-primary)"
          color="white"
          aria-label="Add course"
          icon={<PlusSquareIcon fontSize={20} onClick={() => setDrawerOpen(true)} />}
        />
      </Flex>

      <TableContainer marginTop={10}>
        <Table variant="simple">
          <TableCaption>All Courses</TableCaption>
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Course Title</Th>
              <Th>Course Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Hacking</Td>
              <Td>HAC101</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit course"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete course"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>CRACKING</Td>
              <Td>CRK101</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit course"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete course"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>PHISING</Td>
              <Td>PHI101</Td>
              <Td>
                <Flex justifyContent="flex-start" gap={4} alignItems="center">
                  <IconButton
                    bg="transparent"
                    _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                    color="var(--bg-primary)"
                    aria-label="Edit course"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    bg="white"
                    color="#d10d0d"
                    _hover={{ color: 'white', background: '#d10d0d' }}
                    aria-label="Delete course"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <AddCourse isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} size="md" />
    </WithStaffLayout>
  );
};

export default ManageCourses;
