import type { FC } from 'react';
import WithStaffLayout from '../../layouts/WithStaffLayout';
import { Card, Box, Image, Heading, Text } from '@chakra-ui/react';
import noDp from '../../assets/no-dp.png';
import useStore from '../../store/store';

const Profile: FC = () => {
  const staffInfo = useStore.use.staffInfo();
  return (
    <WithStaffLayout>
      <Heading fontSize={25} fontWeight={600}>
        Your Profile
      </Heading>
      <Card maxW={400} margin="0 auto" marginTop="8rem" padding="1rem">
        <Box
          boxSize="sm"
          width={140}
          height={140}
          transform="translateY(-70px)"
          borderRadius="100rem"
          overflow="hidden"
          margin="0 auto"
          marginBottom="-40px"
        >
          <Image src={noDp} alt="" transform="scale(1.25)" />
        </Box>
        <Heading textAlign="center" fontSize={22} fontWeight={600}>
          {staffInfo?.name}
        </Heading>
        <Text textAlign="center" marginTop="0.5rem">
          {staffInfo?.email}
        </Text>
      </Card>
    </WithStaffLayout>
  );
};

export default Profile;
