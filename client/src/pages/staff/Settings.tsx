import type { FC } from 'react';
import WithStaffLayout from '../../layouts/WithStaffLayout';
import { Card, CardHeader, Heading, FormControl, FormLabel, Input, Button, Link, Text } from '@chakra-ui/react';

const Settings: FC = () => {
  return (
    <WithStaffLayout>
      <div>
        <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
          SETTINGS
        </Heading>
        <Card maxW={400} margin="1rem auto">
          <form className="login-form" method="post" action="#">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Email address</FormLabel>
              <Input type="email" disabled value="test@email.com" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>New Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Confirm New Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="2rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
            >
              Save
            </Button>
          </form>
        </Card>
      </div>
    </WithStaffLayout>
  );
};

export default Settings;
