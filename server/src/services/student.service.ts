import createError from 'http-errors';
import { prisma } from '../db/prisma-client';
import type { Student } from '@prisma/client';

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
