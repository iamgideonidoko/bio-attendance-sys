import { useState, useRef, useEffect } from 'react';
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
  Spinner,
  Box,
  Text,
} from '@chakra-ui/react';
import AddCourse from '../../components/AddCourse';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useGetCourses, useDeleteCourse } from '../../api/course.api';
import useStore from '../../store/store';
import { Button } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { queryClient } from '../../lib/query-client';
import { Course } from '../../interfaces/api.interface';

const ManageCourses: FC = () => {
  const staffInfo = useStore.use.staffInfo();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [per_page] = useState<number>(10);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const { data, error, isLoading, isError } = useGetCourses(
    staffInfo?.id as string,
    page,
    per_page,
  )({
    queryKey: ['courses', page],
    keepPreviousData: true,
  });
  const toastRef = useRef<string>('');
  const { mutate: deleteCourse } = useDeleteCourse({
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.dismiss(toastRef.current);
      toast.success('Course deleted successfully');
    },
    onError: (err) => {
      toast.dismiss(toastRef.current);
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  useEffect(() => {
    if (activeCourse) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [activeCourse]);

  const meta = data?.data?.meta;

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
              {data?.data?.courses?.map((course, idx) => (
                <Tr key={idx}>
                  <Td>{(page - 1) * per_page + (idx + 1)}</Td>
                  <Td>{course.course_name}</Td>
                  <Td>{course.course_code}</Td>
                  <Td>
                    <Flex justifyContent="flex-start" gap={4} alignItems="center">
                      <IconButton
                        bg="transparent"
                        _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                        color="var(--bg-primary)"
                        aria-label="Edit course"
                        onClick={() => setActiveCourse(course)}
                        icon={<EditIcon />}
                      />
                      <IconButton
                        bg="white"
                        color="#d10d0d"
                        _hover={{ color: 'white', background: '#d10d0d' }}
                        aria-label="Delete course"
                        onClick={() => {
                          toastRef.current = toast.loading('Deleting course...');
                          deleteCourse({ url: `/${course.id}` });
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
            <Text>Total Courses: {meta?.total_items}</Text>
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

      <AddCourse
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="md"
        closeDrawer={() => setDrawerOpen(false)}
        activeCourse={activeCourse}
        setActiveCourse={(course) => setActiveCourse(course)}
      />
    </WithStaffLayout>
  );
};

export default ManageCourses;
