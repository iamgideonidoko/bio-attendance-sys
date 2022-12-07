import { useState, useEffect, useRef } from 'react';
import type { FC, ChangeEventHandler, FormEventHandler } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { AddAttendanceInput, Attendance } from '../interfaces/api.interface';
import { useAddAttendance, useUpdateAttendance } from '../api/atttendance.api';
import { useGetCourses } from '../api/course.api';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import useStore from '../store/store';
import { queryClient } from '../lib/query-client';

const AddAttendance: FC<{
  isOpen: boolean;
  size: string;
  onClose: () => void;
  closeDrawer: () => void;
  activeAttendance: Attendance | null;
  setActiveAttendance: (attendance: Attendance | null) => void;
}> = ({ onClose, isOpen, size, closeDrawer, activeAttendance, setActiveAttendance }) => {
  const staffInfo = useStore.use.staffInfo();
  const [attendanceInput, setAttendanceInput] = useState<AddAttendanceInput>({
    staff_id: staffInfo?.id as string,
    course_id: '',
    name: '',
    date: new Date().toISOString(),
  });
  const [, forceUpdate] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const [per_page] = useState<number>(500);
  const { data: courseData } = useGetCourses(
    staffInfo?.id as string,
    page,
    per_page,
  )({ queryKey: ['availablecourses', page], keepPreviousData: true });
  const { isLoading, mutate: addAttendance } = useAddAttendance({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      closeDrawer();
      toast.success('Attendance added successfully');
      setAttendanceInput((prev) => ({ ...prev, course_id: '', name: '', date: new Date().toISOString() }));
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });
  const { isLoading: isUpdating, mutate: updateAttendance } = useUpdateAttendance({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] });
      setActiveAttendance(null);
      closeDrawer();
      toast.success('Attendance updated successfully');
      setAttendanceInput((prev) => ({ ...prev, course_id: '', name: '', date: new Date().toISOString() }));
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });
  useEffect(() => {
    if (isOpen && activeAttendance) {
      setAttendanceInput((prev) => ({
        ...prev,
        course_id: activeAttendance.course_id,
        name: activeAttendance.name,
        date: activeAttendance.date,
      }));
    }
  }, [isOpen, activeAttendance]);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="formErrorMsg">{message}</div>,
    }),
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setAttendanceInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAttendance: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        if (activeAttendance) {
          updateAttendance({ ...attendanceInput, id: activeAttendance.id, url: `/${activeAttendance.id}` });
        } else {
          addAttendance(attendanceInput);
        }
      } catch (err) {
        console.log('error => ', err);
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };
  const courses = courseData?.data?.courses?.map((course) => ({ value: course.id, label: course.course_code })) ?? [];
  return (
    <Drawer
      onClose={() => {
        setAttendanceInput((prev) => ({ ...prev, course_id: '', name: '', date: new Date().toISOString() }));
        onClose();
      }}
      isOpen={isOpen}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{activeAttendance ? 'Update' : 'Add New'} Attendance</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#" onSubmit={handleAddAttendance}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" required value={attendanceInput.name} onChange={handleInputChange} />
              {simpleValidator.current.message('name', attendanceInput.name, 'required|alpha_num_space|between:3,128')}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Course</FormLabel>
              <Select
                value={courses?.find((course) => course.value === attendanceInput.course_id)}
                options={courses}
                onChange={(newValue) => setAttendanceInput((prev) => ({ ...prev, course_id: newValue?.value ?? '' }))}
              />
              {simpleValidator.current.message('course', attendanceInput.course_id, 'required|between:2,128')}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Date</FormLabel>
              <DatePicker
                className="attendance-datepicker"
                selected={new Date(attendanceInput.date ? new Date(attendanceInput.date) : new Date())}
                onChange={(date: Date) => setAttendanceInput((prev) => ({ ...prev, date: date.toISOString() }))}
              />
              {simpleValidator.current.message('name', attendanceInput.date, 'required|between:2,128')}
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              {isUpdating && activeAttendance
                ? 'Updating attendance...'
                : isLoading && !activeAttendance
                ? 'Adding attendance...'
                : activeAttendance
                ? 'Update attendance'
                : 'Add attendance'}
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddAttendance;
