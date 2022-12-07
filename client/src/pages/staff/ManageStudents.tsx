import { useState, useEffect, useRef } from 'react';
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
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';
import AddStudent from '../../components/AddStudent';
import useStore from '../../store/store';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useGetStudents, useDeleteStudent } from '../../api/student.api';
import { toast } from 'react-hot-toast';
import { queryClient } from '../../lib/query-client';
import { Student } from '../../interfaces/api.interface';

const ManageStudents: FC = () => {
  const staffInfo = useStore.use.staffInfo();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [per_page] = useState<number>(10);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const { data, error, isLoading, isError } = useGetStudents(
    staffInfo?.id as string,
    page,
    per_page,
  )({
    queryKey: ['students', page],
    keepPreviousData: true,
  });
  const toastRef = useRef<string>('');
  const { mutate: deleteStudent } = useDeleteStudent({
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
      toast.dismiss(toastRef.current);
      toast.success('Course deleted successfully');
    },
    onError: (err) => {
      toast.dismiss(toastRef.current);
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  useEffect(() => {
    if (activeStudent) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [activeStudent]);

  const meta = data?.data?.meta;
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

      {isLoading ? (
        <Box marginTop="4rem" display="flex" justifyContent="center">
          <Spinner color="var(--bg-primar)" />
        </Box>
      ) : isError ? (
        <Box marginTop="4rem" display="flex" justifyContent="center">
          <Text>Error: {error?.response?.data?.message}</Text>
        </Box>
      ) : (
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
              {data.data.students.map((student, idx) => (
                <Tr>
                  <Td>{(page - 1) * per_page + (idx + 1)}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.matric_no}</Td>
                  <Td>{student.courses?.map((course) => course.course_code)?.join(', ')}</Td>
                  <Td>
                    <Flex justifyContent="flex-start" gap={4} alignItems="center">
                      <IconButton
                        bg="transparent"
                        _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                        color="var(--bg-primary)"
                        aria-label="Edit staff"
                        onClick={() => setActiveStudent(student)}
                        icon={<EditIcon />}
                      />
                      <IconButton
                        bg="white"
                        color="#d10d0d"
                        _hover={{ color: 'white', background: '#d10d0d' }}
                        aria-label="Delete staff"
                        onClick={() => {
                          toastRef.current = toast.loading('Deleting student...');
                          deleteStudent({ url: `/${student.id}` });
                        }}
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex flexDirection="column" justifyContent="space-between" alignItems="center" marginBottom="1rem">
            <Text>Total Students: {meta?.total_items}</Text>
            <Text>
              Page {meta?.page} of {meta?.total_pages}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Button
              size="sm"
              disabled={Number(meta?.page ?? 0) <= 1}
              onClick={() => !(Number(meta?.page ?? 0) <= 1) && setPage(Number(meta?.page ?? 0) - 1)}
            >
              Prev
            </Button>
            <Button
              size="sm"
              disabled={Number(meta?.page ?? 0) >= Number(meta?.total_pages ?? 0)}
              onClick={() =>
                !(Number(meta?.page ?? 0) >= Number(meta?.total_pages ?? 0)) && setPage(Number(meta?.page ?? 0) + 1)
              }
            >
              Next
            </Button>
          </Flex>
        </TableContainer>
      )}

      <AddStudent
        isOpen={drawerOpen}
        onClose={() => {
          setActiveStudent(null);
          setDrawerOpen(false);
        }}
        closeDrawer={() => {
          setActiveStudent(null);
          setDrawerOpen(false);
        }}
        size="md"
        activeStudent={activeStudent}
        setActiveStudent={(student) => setActiveStudent(student)}
      />
    </WithStaffLayout>
  );
};

export default ManageStudents;
