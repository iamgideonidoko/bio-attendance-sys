import { prisma } from '../db/prisma-client';

export const deleteRefreshTokensByStaffId = async (staff_id: string) =>
  await prisma.token.deleteMany({
    where: {
      staff_id,
    },
  });

export const addRefreshTokenToDb = async (staff_id: string, token: string) => {
  await deleteRefreshTokensByStaffId(staff_id);
  return await prisma.token.create({
    data: {
      staff_id,
      token,
    },
  });
};

export const getRefreshTokenFromDb = async (staff_id: string) => {
  //   const token = await Token.findOne({ staff_id });
  const token = await prisma.token.findFirst({
    where: {
      staff_id,
    },
  });
  if (token) await deleteRefreshTokensByStaffId(token?.staff_id);
  return token?.token;
};
