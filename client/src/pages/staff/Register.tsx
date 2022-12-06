import { useRef, useState } from 'react';
import type { FC, ChangeEventHandler, FormEventHandler } from 'react';
import { Card, CardHeader, Heading, FormControl, FormLabel, Input, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/Staff.scss';
import SimpleReactValidator from 'simple-react-validator';
import type { RegisterStaffInput } from '../../interfaces/api.interface';
import { useRegisterStaff } from '../../api/staff.api';
import { toast } from 'react-hot-toast';
import useStore from '../../store/store';

const Register: FC = () => {
  const [registerInput, setRegisterInput] = useState<RegisterStaffInput>({
    name: '',
    email: '',
    password: '',
    retype_password: '',
  });
  const loginStaff = useStore.use.loginStaff();
  const [, forceUpdate] = useState<boolean>(false);
  const { isLoading, mutate: registerStaff } = useRegisterStaff({
    onSuccess: (data) => {
      toast.success('Registration successful');
      loginStaff(data?.data?.staff);
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="formErrorMsg">{message}</div>,
      validators: {
        password_match: {
          message: 'The :attribute must match password',
          rule: (val, params) => val === params[0],
        },
      },
    }),
  );

  const handleRegisterStaff: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        registerStaff(registerInput);
      } catch (err) {
        console.log('error => ', err);
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  return (
    <div>
      <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
        STAFF REGISTER
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Register
        </CardHeader>
        <form className="login-form" method="post" action="#" onSubmit={handleRegisterStaff}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={registerInput.name} onChange={handleInputChange} required />
            {simpleValidator.current.message('name', registerInput.name, 'required|alpha_space|between:2,128')}
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" value={registerInput.email} onChange={handleInputChange} required />
            {simpleValidator.current.message('email', registerInput.email, 'required|email|between:2,128')}
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={registerInput.password}
              onChange={handleInputChange}
              required
            />
            {simpleValidator.current.message('password', registerInput.password, 'required|between:4,15')}
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="retype_password"
              value={registerInput.retype_password}
              onChange={handleInputChange}
              required
            />
            {simpleValidator.current.message(
              'password',
              registerInput.retype_password,
              `required|password_match:${registerInput.password}|between:4,15`,
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
            {isLoading ? 'Registering...' : 'Register'}
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
