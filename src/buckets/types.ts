import { AllowParams } from '../types';

export interface Bucket {
  set(id: AllowParams['id'], increment: number): void

  get(id: AllowParams['id']): number

  delete(id: AllowParams['id']): void
}
