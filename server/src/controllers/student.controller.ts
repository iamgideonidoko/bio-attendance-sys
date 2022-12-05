import type { Request, Response, NextFunction } from 'express';
import { createSuccess } from '../helpers/http.helper';
import createError from 'http-errors';
import { removeStudentFromDb, saveStudentToDb, updateStudentInDb } from '../services/student.service';
import { prisma } from '../db/prisma-client';
import type { Student } from '@prisma/client';
import type { PaginationMeta } from '../interfaces/helper.interface';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  // get students that belongs to single staff
  const { staff_id } = req.params;
  const { per_page, page } = req.query;
  if (!staff_id) return next(new createError.BadRequest('Staff ID is required'));
  if (!per_page || !page) return next(new createError.BadRequest('Pagination info is required'));
  try {
    // const students = await Student.find({ staff_id }).sort({ created_at: -1 });
    const studentCount = await prisma.student.count();
    const students = await prisma.student.findMany({
      where: {
        staff_id,
      },
      take: Number(page) - 1 * Number(per_page) + 1,
      skip: Number(page) - 1 * Number(per_page),
      orderBy: {
        created_at: 'desc',
      },
    });
    const meta: PaginationMeta = {
      total_items: studentCount,
      total_pages: Math.floor(studentCount / Number(per_page)),
      page: Number(page),
      per_page: Number(per_page),
    };
    return createSuccess(res, 200, 'Student fetched successfully', { students, meta });
  } catch (err) {
    return next(err);
  }
};

export const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  // get students that belongs to single staff
  const { id } = req.params;
  if (!id) return next(new createError.BadRequest('Student ID is required'));
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });
    if (!student) throw new createError.NotFound('Student not found');
    return createSuccess(res, 200, 'Student fetched successfully', { student });
  } catch (err) {
    return next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  // create student
  const { name, matric_no, fingerprint } = req.body as Omit<Student, 'id' | 'created_at'>;

  if (!staff_id) return next(new createError.BadRequest('No staff ID provided'));

  if (!student_code) {
    return next(createError(400, 'The student_code field is required.'));
  }
  try {
    const newStudent = { staff_id, student_name, student_code, created_at: new Date() };
    const savedStudent = await saveStudentToDb(newStudent);
    return createSuccess(res, 200, 'Student created successfully', { student: savedStudent });
  } catch (err) {
    return next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  // update student
  const { id } = req.params;
  if (!id) return next(createError(400, 'No student ID provided'));
  const newUpdate = req.body as Partial<Student>;
  try {
    const updatedStudent = await updateStudentInDb(id, newUpdate);
    return createSuccess(res, 200, 'Student updated successfully', { student: updatedStudent });
  } catch (err) {
    return next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  // delete student
  const { id } = req.params;
  if (!id) return next(createError(400, 'No student ID provided'));
  try {
    await removeStudentFromDb(id);
    return createSuccess(res, 200, 'Student deleted successfully', { deleted: true });
  } catch (err) {
    return next(err);
  }
};
