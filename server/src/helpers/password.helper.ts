import bcrypt from 'bcryptjs';

const generateSalt = async (): Promise<string> => {
  const saltRounds = 10;
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

export const hashPassword = (password: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const salt = await generateSalt();
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const validatePassword = async (userPassword: string, dbPassword: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    bcrypt.compare(userPassword, dbPassword).then((isMatch) => {
      resolve(isMatch);
    });
  });
};
