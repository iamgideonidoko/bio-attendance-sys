import { useRef, useState, useEffect } from 'react';
import type { FC, ChangeEventHandler, FormEventHandler } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { AddStudentInput, Student } from '../interfaces/api.interface';
import { useAddStudent, useUpdateStudent } from '../api/student.api';
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
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import useStore from '../store/store';
import { queryClient } from '../lib/query-client';
import { fingerprintControl } from '../lib/fingerprint';
import { Base64 } from '@digitalpersona/core';

export const getFingerprintImgString = (base64ImageData: string) => `data:image/png;base64,${base64ImageData}`;

const AddStudent: FC<{
  isOpen: boolean;
  size: string;
  onClose: () => void;
  closeDrawer: () => void;
  activeStudent: Student | null;
  setActiveStudent: (student: Student | null) => void;
}> = ({ onClose, isOpen, size, closeDrawer, activeStudent, setActiveStudent }) => {
  const staffInfo = useStore.use.staffInfo();
  const [studentInput, setStudentInput] = useState<AddStudentInput>({
    staff_id: staffInfo?.id as string,
    name: '',
    matric_no: '',
    fingerprint: '',
    courses: [],
  });

  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  // console.log('studentInput => ', studentInput);
  const [, forceUpdate] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const [per_page] = useState<number>(500);
  const { data: courseData } = useGetCourses(
    staffInfo?.id as string,
    page,
    per_page,
  )({ queryKey: ['availablecourses', page], keepPreviousData: true });
  const defaultStudentInput = () =>
    setStudentInput((prev) => ({ ...prev, name: '', matric_no: '', courses: [], fingerprint: '' }));
  const { isLoading, mutate: addStudent } = useAddStudent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      closeDrawer();
      toast.success('Course added successfully');
      defaultStudentInput();
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });
  const { isLoading: isUpdating, mutate: updateStudent } = useUpdateStudent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setActiveStudent(null);
      closeDrawer();
      toast.success('Course updated successfully');
      defaultStudentInput();
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });
  useEffect(() => {
    if (isOpen && activeStudent) {
      setStudentInput((prev) => ({
        ...prev,
        name: activeStudent.name,
        matric_no: activeStudent.matric_no,
        fingerprint: activeStudent.fingerprint,
        courses: activeStudent.courses?.map((course) => course.id),
      }));
    }
  }, [isOpen, activeStudent]);

  const handleDeviceConnected = () => {
    console.log('Device connected');
    setDeviceConnected(true);
  };

  const handleDeviceDisconnected = () => {
    console.log('Device disconnected.');
    setDeviceConnected(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSampleAcquired = (event: any) => {
    console.log('Sample acquired => ', event?.samples);
    const rawImages = event?.samples.map((sample: string) => Base64.fromBase64Url(sample));

    setStudentInput((prev) => ({ ...prev, fingerprint: rawImages[0] }));
  };

  useEffect(() => {
    fingerprintControl.onDeviceConnected = handleDeviceConnected;
    fingerprintControl.onDeviceDisconnected = handleDeviceDisconnected;
    fingerprintControl.onSamplesAcquired = handleSampleAcquired;
    fingerprintControl.init();
  }, []);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="formErrorMsg">{message}</div>,
    }),
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setStudentInput((prev) => ({ ...prev, [name]: value }));
  };

  console.log('studentInput => ', studentInput);

  const handleAddStudent: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        if (activeStudent) {
          updateStudent({ ...studentInput, id: activeStudent.id, url: `/${activeStudent.id}` });
        } else {
          addStudent(studentInput);
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
        defaultStudentInput();
        onClose();
      }}
      isOpen={isOpen}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{activeStudent ? 'Update' : 'Add New'} Student</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#" onSubmit={handleAddStudent}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" required value={studentInput.name} onChange={handleInputChange} />
              {simpleValidator.current.message('name', studentInput.name, 'required|alpha_num_space|between:2,128')}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Matric Number</FormLabel>
              <Input
                type="text"
                name="matric_no"
                required
                value={studentInput.matric_no}
                onChange={handleInputChange}
              />
              {simpleValidator.current.message(
                'matric number',
                studentInput.matric_no,
                'required|alpha_num|between:3,128',
              )}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Fingerprint</FormLabel>
              {deviceConnected && <Text>NB: Fingerprint scanner is connected</Text>}
              <Box shadow="xs" h={240} w={240} margin="1rem auto 0" border="1px solid rgba(0, 0, 0, 0.04)">
                {studentInput.fingerprint && <Image src={getFingerprintImgString(studentInput.fingerprint)} />}
              </Box>
              {simpleValidator.current.message('fingerprint', studentInput.fingerprint, 'required|between:2,500000')}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Courses</FormLabel>
              <Select
                // defaultValue={[courses[2], courses[1]]}
                value={studentInput.courses?.map((courseId) => ({
                  value: courseId,
                  label: courses?.find((course) => course.value === courseId)?.label,
                }))}
                isMulti
                name="colors"
                options={courses}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(newValue) =>
                  setStudentInput((prev) => ({ ...prev, courses: newValue.map((val) => val.value) }))
                }
              />
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
              disabled={isLoading || isUpdating}
            >
              {isUpdating && activeStudent
                ? 'Updating student...'
                : isLoading && !activeStudent
                ? 'Adding student...'
                : activeStudent
                ? 'Update student'
                : 'Add student'}
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddStudent;
