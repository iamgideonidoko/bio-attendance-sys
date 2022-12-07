import type { Request, Response, NextFunction } from 'express';
import { createSuccess } from '../helpers/http.helper';
import createError from 'http-errors';
import {
  removeStudentFromDb,
  saveStudentToDb,
  updateStudentInDb,
  saveStudentCoursesToDb,
  checkIfStudentExists,
  removeAllStudentCoursesToDb,
} from '../services/student.service';
import { prisma } from '../db/prisma-client';
import type { Student } from '@prisma/client';
import type { PaginationMeta } from '../interfaces/helper.interface';
import { getStudentCourses } from '../services/student.service';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  // get students that belongs to single staff
  const { staff_id } = req.params;
  const { per_page, page } = req.query;
  if (!staff_id) return next(new createError.BadRequest('Staff ID is required'));
  if (!per_page || !page) return next(new createError.BadRequest('Pagination info is required'));
  try {
    const studentCount = await prisma.student.count({
      where: {
        staff_id,
      },
    });
    const students = await prisma.student.findMany({
      where: {
        staff_id,
      },
      skip: (Number(page) - 1) * Number(per_page),
      take: (Number(page) - 1) * Number(per_page) + Number(per_page),
      orderBy: {
        created_at: 'desc',
      },
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true,
                course_name: true,
                course_code: true,
              },
            },
          },
        },
      },
    });
    const meta: PaginationMeta = {
      total_items: studentCount,
      total_pages: Math.ceil(studentCount / Number(per_page)) || 1,
      page: Number(page),
      per_page: Number(per_page),
    };
    const studentToSend = students.map((item) => ({
      ...item,
      courses: item.courses.map((course) => course.course),
    }));
    return createSuccess(res, 200, 'Student fetched successfully', { students: studentToSend, meta });
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
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true,
                course_name: true,
                course_code: true,
              },
            },
          },
        },
      },
    });
    if (!student) throw new createError.NotFound('Student not found');
    const studentToSend = student.courses.map((item) => item.course);
    return createSuccess(res, 200, 'Student fetched successfully', { student: studentToSend });
  } catch (err) {
    return next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  // create student
  const { name, staff_id, matric_no, fingerprint, courses } = req.body as Omit<Student, 'id' | 'created_at'> & {
    courses: string[];
  };

  if (!staff_id) return next(new createError.BadRequest('No staff ID provided'));

  if (!matric_no) {
    return next(createError(400, 'The matric_no field is required.'));
  }
  try {
    const courseExists = await checkIfStudentExists(matric_no, staff_id);
    if (courseExists) {
      return next(
        createError(
          400,
          ...[
            {
              message: 'Student with the same matric number already exists.',
              errorType: 'STUDENT_ALREADY_EXISTS',
            },
          ],
        ),
      );
    }
    const newStudent = { staff_id, name, matric_no, fingerprint, created_at: new Date() };
    const savedStudent = await saveStudentToDb(newStudent);
    await saveStudentCoursesToDb(courses.map((course_id) => ({ course_id, student_id: savedStudent.id })));
    const studentCourses = await getStudentCourses(savedStudent.id);
    return createSuccess(res, 200, 'Student created successfully', {
      student: { ...savedStudent, courses: studentCourses.map((item) => item.course) },
    });
  } catch (err) {
    return next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  // update student
  const { id } = req.params;
  if (!id) return next(createError(400, 'No student ID provided'));
  const { courses, ...newUpdate } = req.body as Partial<Student> & { courses: string[] };
  try {
    await removeAllStudentCoursesToDb(id);
    const updatedStudent = await updateStudentInDb(id, newUpdate);
    await saveStudentCoursesToDb(courses.map((course_id) => ({ course_id, student_id: id })));
    const studentCourses = await getStudentCourses(id);
    return createSuccess(res, 200, 'Student updated successfully', {
      student: { ...updatedStudent, courses: studentCourses.map((item) => item.course) },
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  // delete student
  const { id } = req.params;
  if (!id) return next(createError(400, 'No student ID provided'));
  try {
    await removeAllStudentCoursesToDb(id);
    await removeStudentFromDb(id);
    return createSuccess(res, 200, 'Student deleted successfully', { deleted: true });
  } catch (err) {
    return next(err);
  }
};
