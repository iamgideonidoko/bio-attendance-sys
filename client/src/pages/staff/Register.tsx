import type { FC } from 'react';
import { Card, CardHeader, Heading, FormControl, FormLabel, Input, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/Staff.scss';

const Register: FC = () => {
  return (
    <div>
      <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
        STAFF REGISTER
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Register
        </CardHeader>
        <form className="login-form" method="post" action="#">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Confirm Password</FormLabel>
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
            Register
          </Button>
        </form>
        <Text padding="1rem">
          Have Account?{' '}
          <Link as={RouterLink} to="/staff/login" textDecoration="underline">
            Login
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default Register;
