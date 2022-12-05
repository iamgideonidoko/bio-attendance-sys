import createError from 'http-errors';
import { prisma } from '../db/prisma-client';
import type { Student, StudentCourse, Course } from '@prisma/client';
import { PrismaBatchPayload } from '../interfaces/helper.interface';

export const saveStudentToDb = (student: Omit<Student, 'id'>): Promise<Student> => {
  return new Promise<Student>(async (resolve, reject) => {
    try {
      const savedStudent = await prisma.student.create({
        data: student,
      });
      resolve(savedStudent);
    } catch (err) {
      reject(err);
    }
  });
};

export const saveStudentCoursesToDb = (studentCourseInfoArray: StudentCourse[]): Promise<PrismaBatchPayload> => {
  return new Promise<PrismaBatchPayload>(async (resolve, reject) => {
    try {
      const batchPayload = await prisma.studentCourse.createMany({
        data: studentCourseInfoArray,
        skipDuplicates: true,
      });
      resolve(batchPayload);
    } catch (err) {
      reject(err);
    }
  });
};

export const getStudentCourses = (
  student_id: string,
): Promise<
  (StudentCourse & {
    course: Course;
  })[]
> => {
  return new Promise<
    (StudentCourse & {
      course: Course;
    })[]
  >(async (resolve, reject) => {
    try {
      const studentCourses = await prisma.studentCourse.findMany({
        where: {
          student_id,
        },
        include: {
          course: true,
        },
      });
      resolve(studentCourses);
    } catch (err) {
      reject(err);
    }
  });
};

export const getStudentsCourses = (
  student_ids: string[],
): Promise<
  (StudentCourse & {
    course: Course;
  })[]
> => {
  return new Promise<
    (StudentCourse & {
      course: Course;
    })[]
  >(async (resolve, reject) => {
    try {
      const studentsCourses = await prisma.studentCourse.findMany({
        where: {
          OR: student_ids.map((student_id) => ({
            student_id,
          })),
        },
        include: {
          course: true,
        },
      });
      resolve(studentsCourses);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeStudentFromDb = (studentId: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const res = await prisma.student.delete({
        where: {
          id: studentId,
        },
      });
      if (res) resolve(true);
      reject(new createError.NotFound('Student not found'));
    } catch (err) {
      reject(err);
    }
  });
};

export const updateStudentInDb = (id: string, newUpdate: Partial<Student>): Promise<Student> => {
  return new Promise<Student>(async (resolve, reject) => {
    try {
      const student = await prisma.student.update({
        where: {
          id,
        },
        data: newUpdate,
      });
      resolve(student);
    } catch (err) {
      reject(err);
    }
  });
};

export const checkIfStudentExists = (matric_no: string, staff_id: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const course = await prisma.student.findFirst({
        where: {
          matric_no,
          staff_id,
        },
        select: {
          id: true,
        },
      });
      if (course) resolve(true);
      resolve(false);
    } catch (err) {
      reject(err);
    }
  });
};
