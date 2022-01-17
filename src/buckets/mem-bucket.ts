import {AllowParams} from '../types'
import { Bucket } from './types';

export class MemBucket implements Bucket {
    private memory: Record<string, number> = {}

    public async set(id: AllowParams['id'], increment: number) : Promise<void> {
        let numberOfCalls = await this.get(id)
        numberOfCalls += increment;
        this.memory[id] = numberOfCalls;
    }

    public async get(id: AllowParams['id']): Promise<number> {
        return this.memory[id] ?? 0
    }

    public async delete(id: AllowParams['id']): Promise<void> {
        delete this.memory[id]
    }
}
