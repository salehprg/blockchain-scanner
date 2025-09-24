export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  upsert(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
