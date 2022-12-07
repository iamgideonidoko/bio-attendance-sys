import { useRef, useState } from 'react';
import type { FC, ChangeEventHandler, FormEventHandler, Dispatch, SetStateAction } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { AddCourseInput } from '../interfaces/api.interface';
import { useAddCourse } from '../api/course.api';
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
import { toast } from 'react-hot-toast';
import useStore from '../store/store';
import { queryClient } from '../lib/query-client';

const AddCourse: FC<{ isOpen: boolean; size: string; onClose: () => void; closeDrawer: () => void }> = ({
  onClose,
  isOpen,
  size,
  closeDrawer,
}) => {
  const staffInfo = useStore.use.staffInfo();
  const [courseInput, setCourseInput] = useState<AddCourseInput>({
    staff_id: staffInfo?.id as string,
    course_name: '',
    course_code: '',
  });
  const [, forceUpdate] = useState<boolean>(false);
  const { isLoading, mutate: addCourse } = useAddCourse({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      closeDrawer();
      toast.success('Course added successfully');
      setCourseInput((prev) => ({ ...prev, course_name: '', course_code: '' }));
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="formErrorMsg">{message}</div>,
    }),
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setCourseInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        addCourse(courseInput);
      } catch (err) {
        console.log('error => ', err);
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Course</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#" onSubmit={handleAddCourse}>
            <FormControl>
              <FormLabel>Course Title</FormLabel>
              <Input
                type="text"
                name="course_name"
                required
                value={courseInput.course_name}
                onChange={handleInputChange}
              />
              {simpleValidator.current.message(
                'course name',
                courseInput.course_name,
                'required|alpha_num_space|between:2,128',
              )}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Course Code</FormLabel>
              <Input
                type="text"
                name="course_code"
                required
                value={courseInput.course_code}
                onChange={handleInputChange}
              />
              {simpleValidator.current.message(
                'course code',
                courseInput.course_code,
                'required|alpha_num|between:2,128',
              )}
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
              disabled={isLoading}
            >
              {isLoading ? 'Adding course...' : 'Add course'}
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCourse;
