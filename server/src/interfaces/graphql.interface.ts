import { PrismaClient } from '@prisma/client';
import { UserModel, BookModel } from '../graphql/models';

type LoaderActions<T = object> = {
  one: (id: string) => Promise<T>;
  many: (ids: string[]) => Promise<(Error | T)[]>;
  one_by_author: (id: string) => Promise<BookModel[]>;
};

export interface IProducedContext {
  loaders: {
    user: Pick<LoaderActions<UserModel>, 'one' | 'many'>;
    book: Pick<LoaderActions<BookModel>, 'one' | 'many' | 'one_by_author'>;
  };
  prisma: PrismaClient;
}
