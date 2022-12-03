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
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import Select from 'react-select';
import { InfoIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

const MarkAttendance: FC<{ isOpen: boolean; size: string; onClose: () => void }> = ({ isOpen, onClose, size }) => {
  const courses = ['csc101', 'hck101', 'phi101'].map((item) => ({ value: item, label: item }));
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Mark Student</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#">
            <FormControl>
              <FormLabel>Student</FormLabel>
              <Select defaultValue={courses[2]} options={courses} />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Fingerprint</FormLabel>
              <Flex gap="0.4rem" borderLeft="3px solid #534949" padding="0.5rem" alignItems="flex-start">
                <InfoIcon />
                <Text fontStyle="italic">Ensure a DigitalPersona scanning device is connected to your PC.</Text>
              </Flex>
              <Box shadow="xs" h={240} w={240} margin="1rem auto 0" border="1px solid rgba(0, 0, 0, 0.04)"></Box>
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="3rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              Mark student
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MarkAttendance;
