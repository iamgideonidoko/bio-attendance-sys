import type { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Button,
  List,
  ListItem,
  Text,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import type { Attendance } from '../interfaces/api.interface';
import dayjs from 'dayjs';
import { useGetAttendanceList } from '../api/atttendance.api';

const AttendanceList: FC<{ isOpen: boolean; onClose: () => void; attendance: Attendance | null }> = ({
  isOpen,
  onClose,
  attendance,
}) => {
  const { data, error, isLoading, isError } = useGetAttendanceList(attendance?.id ?? '')({
    queryKey: ['attendance_list', attendance?.id],
    keepPreviousData: true,
  });
  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          List for {attendance?.name} ({dayjs(attendance?.date).format('DD/MM/YYYY')})
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Box marginTop="4rem" display="flex" justifyContent="center">
              <Spinner color="var(--bg-primar)" />
            </Box>
          ) : isError ? (
            <Box marginTop="4rem" display="flex" justifyContent="center">
              <Text>Error: {error?.response?.data?.message}</Text>
            </Box>
          ) : (
            <List spacing={3}>
              {data.data.attendanceList.map((student) => (
                <ListItem display="flex" gap="1rem" alignItems="center">
                  <CheckIcon color="green.500" />
                  <Text>
                    {student?.student?.name} ({student?.student?.matric_no})
                  </Text>
                </ListItem>
              ))}
            </List>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceList;
