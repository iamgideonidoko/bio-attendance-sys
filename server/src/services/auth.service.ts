import createError from 'http-errors';
import { RegisterReturn } from '../interfaces/staff.interface';
import { validatePassword } from '../helpers/password.helper';
import { signAccessToken, verifyRefreshToken, signRefreshToken } from '../helpers/jwt.helper';
import { deleteRefreshTokensByStaffId } from '../helpers/token.helper';
import { prisma } from '../db/prisma-client';

export const getStaffFromDb = async (staffEmail: string, staffPassword: string): Promise<RegisterReturn | void> => {
  //Check for existing staff in that model through password
  const staff = await prisma.staff.findUnique({
    where: {
      email: staffEmail,
    },
  });
  if (!staff) {
    throw new createError.NotFound('Staff does not exist');
  } else {
    const { id, name, email, password, created_at } = staff;

    try {
      const match = await validatePassword(staffPassword, password);

      if (match) {
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
      } else {
        throw createError(401, 'Incorrect password');
      }
    } catch (err) {
      throw err;
    }
  }
};

export const getNewTokens = async (refreshToken: string): Promise<object | undefined> => {
  try {
    const decoded = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken({ id: decoded?.id });
    const refToken = await signRefreshToken({ id: decoded?.id });

    return new Promise((resolve) => {
      resolve({ accessToken, refreshToken: refToken });
    });
  } catch (err) {
    throw err;
  }
};

export const delRefreshToken = async (staff_id: string): Promise<number | undefined> => {
  try {
    // delete id from database
    await deleteRefreshTokensByStaffId(staff_id);

    return new Promise((resolve) => {
      // resolve(value);
      resolve(undefined);
    });
  } catch (err) {
    throw err;
  }
};
