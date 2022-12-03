import { useState } from 'react';
import type { FC } from 'react';
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

const AddAttendance: FC<{ isOpen: boolean; size: string; onClose: () => void }> = ({ onClose, isOpen, size }) => {
  const [startDate, setStartDate] = useState(new Date());
  const courses = ['csc101', 'hck101', 'phi101'].map((item) => ({ value: item, label: item }));
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Attendance</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Course</FormLabel>
              <Select defaultValue={courses[2]} options={courses} />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Date</FormLabel>
              <DatePicker
                className="attendance-datepicker"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              Add Attendance
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddAttendance;
