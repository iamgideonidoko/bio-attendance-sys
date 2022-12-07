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
  Button,
  Spinner,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AddAttendance from '../../components/AddAttendance';
import { PlusSquareIcon, EditIcon, DeleteIcon, CheckIcon, InfoIcon } from '@chakra-ui/icons';
import MarkAttendance from '../../components/MarkAttendance';
import { useGetAttendances, useDeleteAttendance } from '../../api/atttendance.api';
import useStore from '../../store/store';
import { toast } from 'react-hot-toast';
import { queryClient } from '../../lib/query-client';
import { Attendance } from '../../interfaces/api.interface';
import dayjs from 'dayjs';
import AttendanceList from '../../components/AttendanceList';

const ManageAttendance: FC = () => {
  const staffInfo = useStore.use.staffInfo();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerOpen2, setDrawerOpen2] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<number>(1);
  const [per_page] = useState<number>(10);
  const [activeAttendance, setActiveAttendance] = useState<Attendance | null>(null);
  const [activeAttendance2, setActiveAttendance2] = useState<Attendance | null>(null);
  const [activeAttendance3, setActiveAttendance3] = useState<Attendance | null>(null);
  const { data, error, isLoading, isError } = useGetAttendances(
    staffInfo?.id as string,
    page,
    per_page,
  )({
    queryKey: ['attendances', page],
    keepPreviousData: true,
  });
  const toastRef = useRef<string>('');
  const btnRef = useRef(null);
  const { mutate: deleteAttendance } = useDeleteAttendance({
    onSuccess: () => {
      queryClient.invalidateQueries(['attendances']);
      toast.dismiss(toastRef.current);
      toast.success('Attendance deleted successfully');
    },
    onError: (err) => {
      toast.dismiss(toastRef.current);
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  useEffect(() => {
    if (activeAttendance) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [activeAttendance]);

  useEffect(() => {
    if (activeAttendance2) {
      setDrawerOpen2(true);
    } else {
      setDrawerOpen2(false);
    }
  }, [activeAttendance2]);

  const meta = data?.data?.meta;
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
              {data.data.attendances?.map((attendance, idx) => (
                <Tr key={idx}>
                  <Td>{(page - 1) * per_page + (idx + 1)}</Td>
                  <Td>{attendance.name}</Td>
                  <Td>{attendance.course?.course_code}</Td>
                  <Td>{dayjs(attendance.date).format('DD/MM/YYYY')}</Td>
                  <Td>
                    <Flex justifyContent="flex-start" gap={4} alignItems="center">
                      <Button
                        leftIcon={<CheckIcon />}
                        bg="var(--bg-primary)"
                        color="white"
                        _hover={{ background: 'var(--bg-primary-light)' }}
                        size="xs"
                        variant="solid"
                        onClick={() => setActiveAttendance2(attendance)}
                      >
                        Mark
                      </Button>
                      <Button
                        leftIcon={<InfoIcon />}
                        bg="var(--bg-primary)"
                        color="white"
                        _hover={{ background: 'var(--bg-primary-light)' }}
                        size="xs"
                        variant="solid"
                        ref={btnRef}
                        onClick={() => {
                          setActiveAttendance3(attendance);
                          onOpen();
                        }}
                      >
                        List
                      </Button>
                      <IconButton
                        bg="transparent"
                        _hover={{ color: 'white', background: 'var(--bg-primary)' }}
                        color="var(--bg-primary)"
                        aria-label="Edit staff"
                        onClick={() => setActiveAttendance(attendance)}
                        icon={<EditIcon />}
                      />
                      <IconButton
                        bg="white"
                        color="#d10d0d"
                        _hover={{ color: 'white', background: '#d10d0d' }}
                        aria-label="Delete staff"
                        onClick={() => {
                          toastRef.current = toast.loading('Deleting attendance...');
                          deleteAttendance({ url: `/${attendance.id}` });
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
            <Text>Total Attendances: {meta?.total_items}</Text>
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

      <AddAttendance
        isOpen={drawerOpen}
        onClose={() => {
          setActiveAttendance(null);
          setDrawerOpen(false);
        }}
        size="md"
        closeDrawer={() => {
          setActiveAttendance(null);
          setDrawerOpen(false);
        }}
        activeAttendance={activeAttendance}
        setActiveAttendance={(attendance) => setActiveAttendance(attendance)}
      />
      <MarkAttendance
        isOpen={drawerOpen2}
        onClose={() => {
          setActiveAttendance2(null);
          setDrawerOpen2(false);
        }}
        size="md"
        closeDrawer={() => {
          setActiveAttendance2(null);
          setDrawerOpen2(false);
        }}
        activeAttendance={activeAttendance2}
      />
      <AttendanceList isOpen={isOpen} onClose={onClose} attendance={activeAttendance3} />
    </WithStaffLayout>
  );
};

export default ManageAttendance;
