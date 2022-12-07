import createError from 'http-errors';
import { prisma } from '../db/prisma-client';
import type { Attendance, StudentAttendance, Student } from '@prisma/client';
import type { PrismaBatchPayload } from '../interfaces/helper.interface';

export const fetchOneAttendance = (attendanceId: string): Promise<Attendance> => {
  return new Promise<Attendance>(async (resolve, reject) => {
    try {
      const attendance = await prisma.attendance.findUnique({
        where: {
          id: attendanceId,
        },
        include: {
          course: {
            select: {
              course_name: true,
            },
          },
        },
      });
      if (!attendance) throw new createError.NotFound('Attendance not found');
      resolve(attendance);
    } catch (err) {
      reject(err);
    }
  });
};

export const saveAttendanceToDb = (attendance: Omit<Attendance, 'id'>): Promise<Attendance> => {
  return new Promise<Attendance>(async (resolve, reject) => {
    try {
      const savedAttendance = await prisma.attendance.create({
        data: attendance,
      });
      resolve(savedAttendance);
    } catch (err) {
      reject(err);
    }
  });
};

export const markStudentAttendance = (studentAttendanceInfo: StudentAttendance): Promise<StudentAttendance> => {
  return new Promise<StudentAttendance>(async (resolve, reject) => {
    try {
      const studentAttendance = await prisma.studentAttendance.create({
        data: studentAttendanceInfo,
      });
      resolve(studentAttendance);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeAllStudentAttendance = (attendance_id: string): Promise<PrismaBatchPayload> => {
  return new Promise<PrismaBatchPayload>(async (resolve, reject) => {
    try {
      const studentAttendance = await prisma.studentAttendance.deleteMany({
        where: {
          attendance_id,
        },
      });
      resolve(studentAttendance);
    } catch (err) {
      reject(err);
    }
  });
};

export const checkIfStudentIsMarked = (studentAttendanceInfo: StudentAttendance): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const studentAttendance = await prisma.studentAttendance.findFirst({
        where: studentAttendanceInfo,
      });
      if (studentAttendance) resolve(true);
      resolve(false);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchAttendanceStudents = (
  attendance_id: string,
): Promise<
  (StudentAttendance & {
    student: Student;
  })[]
> => {
  return new Promise<
    (StudentAttendance & {
      student: Student;
    })[]
  >(async (resolve, reject) => {
    try {
      const attendanceCourses = await prisma.studentAttendance.findMany({
        where: {
          attendance_id,
        },
        include: {
          student: true,
        },
      });
      resolve(attendanceCourses);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeAttendanceFromDb = (attendanceId: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const res = await prisma.attendance.delete({
        where: {
          id: attendanceId,
        },
      });
      if (res) resolve(true);
      reject(new createError.NotFound('Attendance not found'));
    } catch (err) {
      reject(err);
    }
  });
};

export const updateAttendanceInDb = (id: string, newUpdate: Partial<Attendance>): Promise<Attendance> => {
  return new Promise<Attendance>(async (resolve, reject) => {
    try {
      const attendance = await prisma.attendance.update({
        where: {
          id,
        },
        data: newUpdate,
      });
      resolve(attendance);
    } catch (err) {
      reject(err);
    }
  });
};
