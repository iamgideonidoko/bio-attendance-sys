import React from 'react';
import type { FC } from 'react';
import { Card, CardHeader, Heading, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';

const Home: FC = () => {
  const count = useStore.use.count();
  const increment = useStore.use.increment();
  const decrement = useStore.use.decrement();

  return (
    <div>
      <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
        Welcome to Federal University Lokoja
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Login {count}
        </CardHeader>
        <Flex flexDirection={'column'} gap="1rem" padding="1rem">
          <Button bg="var(--bg-primary)" w="100%">
            <Link to="/staff/login" className="login-link">
              STAFF LOGIN
            </Link>
          </Button>
          <button onClick={() => increment()}>increment</button>
        </Flex>
      </Card>
    </div>
  );
};

export default Home;
