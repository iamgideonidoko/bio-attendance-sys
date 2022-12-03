import React from 'react';
import type { FC } from 'react';
import { Card, CardHeader, Heading, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div>
      <Heading as="h2" fontSize="1.8rem" margin="2rem auto" textAlign="center">
        Welcome to Federal University Lokoja
      </Heading>
      <Card maxW={400} margin="1rem auto">
        <CardHeader fontWeight={600} fontSize="1.7rem" textAlign="center">
          Login
        </CardHeader>
        <Flex flexDirection={'column'} gap="1rem" padding="1rem">
          <Button bg="var(--bg-primary)" w="100%">
            <Link to="/staff/login" className="login-link">
              STAFF LOGIN
            </Link>
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default Home;
