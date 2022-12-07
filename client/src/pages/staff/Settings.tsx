import type { FC } from 'react';
import WithStaffLayout from '../../layouts/WithStaffLayout';
import { Card, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import useStore from '../../store/store';

const Settings: FC = () => {
  const staffInfo = useStore.use.staffInfo();
  return (
    <WithStaffLayout>
      <div>
        <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
          SETTINGS
        </Heading>
        <Card maxW={400} margin="1rem auto">
          <form className="login-form" method="post" action="#" onSubmit={(e) => e.preventDefault()}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={staffInfo?.name} />
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Email address</FormLabel>
              <Input type="email" disabled value={staffInfo?.email} />
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
