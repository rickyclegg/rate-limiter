import { AllowParams } from '../types';

export interface Bucket {
  set(id: AllowParams['id'], increment: number): Promise<void>

  get(id: AllowParams['id']): Promise<number>

  delete(id: AllowParams['id']): Promise<void>
}
