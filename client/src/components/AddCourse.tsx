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

const AddCourse: FC<{ isOpen: boolean; size: string; onClose: () => void }> = ({ onClose, isOpen, size }) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Course</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#">
            <FormControl>
              <FormLabel>Course Title</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Course Code</FormLabel>
              <Input type="text" />
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              Add course
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCourse;
