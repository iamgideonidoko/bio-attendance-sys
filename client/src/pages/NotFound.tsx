import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Heading, Link } from '@chakra-ui/react';

const NotFound: FC = () => {
  return (
    <div className="not-found">
      <Heading as="h1">404 - Page Not Found</Heading>
      <Link as={RouterLink} to="/" marginTop="2rem">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
