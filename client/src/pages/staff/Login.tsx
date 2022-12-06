import { useState, useRef } from 'react';
import type { FC, ChangeEventHandler, FormEventHandler } from 'react';
import { Card, CardHeader, Heading, FormControl, FormLabel, Input, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/Staff.scss';
import type { LoginStaffInput } from '../../interfaces/api.interface';
import { useLoginStaff } from '../../api/staff.api';
import { toast } from 'react-hot-toast';
import useStore from '../../store/store';
import SimpleReactValidator from 'simple-react-validator';

const Login: FC = () => {
  const [loginInput, setLoginInput] = useState<LoginStaffInput>({
    email: '',
    password: '',
  });
  const [, forceUpdate] = useState<boolean>(false);
  const login = useStore.use.loginStaff();
  const { isLoading, mutate: loginStaff } = useLoginStaff({
    onSuccess: (data) => {
      toast.success('Registration successful');
      login(data?.data?.staff);
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
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

  const handleLoginStaff: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        loginStaff(loginInput);
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
        STAFF LOGIN
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Login
        </CardHeader>
        <form className="login-form" method="post" action="#" onSubmit={handleLoginStaff}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={loginInput.email} name="email" required onChange={handleInputChange} />
            {simpleValidator.current.message('email', loginInput.email, 'required|email|between:2,128')}
          </FormControl>
          <FormControl marginTop="1rem">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={loginInput.password} name="password" required onChange={handleInputChange} />
            {simpleValidator.current.message('password', loginInput.password, 'required|between:4,15')}
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
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Text padding="1rem">
          No Account?{' '}
          <Link as={RouterLink} to="/staff/register" textDecoration="underline">
            Register
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
