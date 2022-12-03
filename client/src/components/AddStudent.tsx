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
  Box,
} from '@chakra-ui/react';

const AddStaff: FC<{ isOpen: boolean; size: string; onClose: () => void }> = ({ onClose, isOpen, size }) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add New Student</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Matric Number</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Fingerprint</FormLabel>
              <Box shadow="xs" h={240} w={240} margin="1rem auto 0"></Box>
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              Add staff
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddStaff;
