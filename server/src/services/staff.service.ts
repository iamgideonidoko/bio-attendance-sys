import createError from 'http-errors';
import { NewStaff, RegisterReturn } from '../interfaces/staff.interface';
import { hashPassword } from '../helpers/password.helper';
import { signAccessToken, signRefreshToken } from '../helpers/jwt.helper';
import { prisma } from '../db/prisma-client';

export const addStaffToDb = async (newStaff: NewStaff): Promise<RegisterReturn | void> => {
  const { name, email, password } = newStaff;
  //Check for existing staff in that model through password
  const staff = await prisma.staff.findUnique({
    where: {
      email,
    },
  });
  if (staff) {
    throw createError(406, 'Staff already exists');
  } else {
    //create new staff from the model

    const newStaff = {
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };
    try {
      const hashedPassword = await hashPassword(newStaff.password);
      newStaff.password = hashedPassword;
      const savedStaff = await prisma.staff.create({
        data: newStaff,
      });
      const { id, name, email, created_at } = savedStaff;

      const accessToken = await signAccessToken({ id });
      const refreshToken = await signRefreshToken({ id });

      return new Promise<RegisterReturn>((resolve) =>
        resolve({
          accessToken,
          refreshToken,
          staff: {
            id,
            name,
            email,
            created_at,
          },
        }),
      );
    } catch (err) {
      throw err;
    }
  }
};
