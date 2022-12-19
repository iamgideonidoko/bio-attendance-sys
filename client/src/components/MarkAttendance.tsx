import { useState, useEffect, useRef } from 'react';
import type { FC, FormEventHandler } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Text,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';
import Select from 'react-select';
import { InfoIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useMarkAttendance } from '../api/atttendance.api';
import { useGetStudents } from '../api/student.api';
import type { MarkAttendanceInput, Attendance } from '../interfaces/api.interface';
import useStore from '../store/store';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-hot-toast';
import { removeObjectProps } from '../../../server/src/helpers/general.helper';
import { fingerprintControl } from '../lib/fingerprint';
import { Base64 } from '@digitalpersona/core';
import { getFingerprintImgString } from './AddStudent';
import axios from 'axios';
import constants from '../config/constants.config';

const MarkAttendance: FC<{
  isOpen: boolean;
  size: string;
  onClose: () => void;
  closeDrawer: () => void;
  activeAttendance: Attendance | null;
}> = ({ isOpen, onClose, size, closeDrawer, activeAttendance }) => {
  const staffInfo = useStore.use.staffInfo();
  const [page] = useState<number>(1);
  const [per_page] = useState<number>(999);
  const [markInput, setMarkInput] = useState<MarkAttendanceInput & { fingerprintMatch: boolean }>({
    student_id: '',
    attendance_id: '',
    fingerprintMatch: false,
  });
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [fingerprints, setFingerprints] = useState<{ studentFingerprint: string; newFingerprint: string }>({
    studentFingerprint: '',
    newFingerprint: '',
  });
  const [, forceUpdate] = useState<boolean>(false);
  const { data: studentData } = useGetStudents(
    staffInfo?.id as string,
    page,
    per_page,
  )({
    queryKey: ['availablestudents', page],
    keepPreviousData: true,
  });

  const defaultMarkInput = () => {
    setMarkInput((prev) => ({ ...prev, student_id: '', fingerprintMatch: true }));
    setFingerprints((prev) => ({ ...prev, newFingerprint: '', studentFingerprint: '' }));
  };

  const { isLoading, mutate: markAttendance } = useMarkAttendance({
    onSuccess: () => {
      closeDrawer();
      toast.success('Student marked successfully');
      defaultMarkInput();
    },
    onError: (err) => {
      toast.error((err.response?.data?.message as string) ?? 'An error occured');
    },
  });

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr?.[0]?.match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleFingerprintVerification = async () => {
    const data = new FormData();
    data.append('file', dataURLtoFile(getFingerprintImgString(fingerprints.studentFingerprint), 'fingerprint_1.jpeg'));
    data.append('file', dataURLtoFile(getFingerprintImgString(fingerprints.newFingerprint), 'fingerprint_2.jpeg'));
    try {
      const res = await axios.post(`${constants.matchBaseUrl}/verify/fingerprint`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data?.match_score > 0.05) {
        setMarkInput((prev) => ({ ...prev, fingerprintMatch: true }));
        toast.success('Fingerprint matches');
      } else {
        toast.error('Fingerprint does not match');
      }
    } catch (err) {
      toast.error('Could not verify fingerprint');
      console.error('Err: ', err);
    }
  };

  useEffect(() => {
    if (fingerprints.newFingerprint && fingerprints.studentFingerprint) {
      handleFingerprintVerification();
    }
  }, [fingerprints.newFingerprint, fingerprints.studentFingerprint]);

  useEffect(() => {
    if (isOpen && activeAttendance) {
      setMarkInput((prev) => ({
        ...prev,
        attendance_id: activeAttendance.id,
      }));
    }
  }, [isOpen, activeAttendance]);

  const handleDeviceConnected = () => {
    console.log('Device connected');
    setDeviceConnected(true);
  };

  const handleDeviceDisconnected = () => {
    console.log('Device disconnected.');
    setDeviceConnected(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSampleAcquired = (event: any) => {
    console.log('Sample acquired => ', event?.samples);
    const rawImages = event?.samples.map((sample: string) => Base64.fromBase64Url(sample));

    setFingerprints((prev) => ({ ...prev, newFingerprint: rawImages[0] }));
  };

  useEffect(() => {
    fingerprintControl.onDeviceConnected = handleDeviceConnected;
    fingerprintControl.onDeviceDisconnected = handleDeviceDisconnected;
    fingerprintControl.onSamplesAcquired = handleSampleAcquired;
    fingerprintControl.init();
  }, []);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="formErrorMsg">{message}</div>,
    }),
  );

  const handleAddAttendance: FormEventHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markAttendance(removeObjectProps(markInput as any, ['fingerprintMatch']));
      } catch (err) {
        console.log('error => ', err);
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  const students =
    studentData?.data?.students?.map((student) => ({
      value: student.id,
      label: `${student.name} (${student.matric_no})`,
    })) ?? [];
  return (
    <Drawer
      onClose={() => {
        defaultMarkInput();
        onClose();
      }}
      isOpen={isOpen}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Mark Student</DrawerHeader>
        <DrawerBody>
          <form className="login-form" method="post" action="#" onSubmit={handleAddAttendance}>
            <FormControl>
              <FormLabel>Student</FormLabel>
              <Select
                value={students?.find((student) => student.value === markInput.student_id)}
                options={students}
                onChange={(newValue) => {
                  setMarkInput((prev) => ({ ...prev, student_id: newValue?.value ?? '' }));
                  setFingerprints((prev) => ({
                    ...prev,
                    studentFingerprint:
                      studentData?.data?.students?.find((student) => student.id === newValue?.value)?.fingerprint ?? '',
                  }));
                }}
              />
              {simpleValidator.current.message('student', markInput.student_id, 'required|between:2,128')}
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Fingerprint</FormLabel>
              <Flex gap="0.4rem" borderLeft="3px solid #534949" padding="0.5rem" alignItems="flex-start">
                <InfoIcon />
                <Text fontStyle="italic">Ensure a DigitalPersona scanning device is connected to your PC.</Text>
              </Flex>
              {deviceConnected && <Text>NB: Fingerprint scanner is connected</Text>}
              <Box
                overflow="hidden"
                shadow="xs"
                h={240}
                w={240}
                margin="1rem auto"
                border="1px solid rgba(0, 0, 0, 0.04)"
              >
                {fingerprints.newFingerprint && <Image src={getFingerprintImgString(fingerprints.newFingerprint)} />}
              </Box>
              {simpleValidator.current.message('fingerprint', fingerprints.newFingerprint, 'required|min:2')}
              {simpleValidator.current.message('fingerprint', markInput.fingerprintMatch, 'required|accepted|boolean')}
            </FormControl>
            <Button
              w="100%"
              type="submit"
              bg="var(--bg-primary)"
              color="white"
              marginTop="3rem"
              _hover={{ background: 'var(--bg-primary-light)' }}
              disabled={isLoading}
            >
              {isLoading ? 'Marking student...' : 'Mark student'}
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MarkAttendance;
