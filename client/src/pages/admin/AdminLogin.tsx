import type { FC } from 'react';
import { Card, CardHeader, Heading, FormControl, FormLabel, Input, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/Admin.scss';

const AdminLogin: FC = () => {
  return (
    <div>
      <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
        ADMIN LOGIN
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Login
        </CardHeader>
        <form className="login-form" method="post" action="#">
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Password</FormLabel>
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
            Login
          </Button>
        </form>
        <Text padding="1rem">
          No Account?{' '}
          <Link as={RouterLink} to="/admin/register" textDecoration="underline">
            Register
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default AdminLogin;
