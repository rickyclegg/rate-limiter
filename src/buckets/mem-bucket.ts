import {AllowParams} from '../types'
import { Bucket } from './types';

export class MemBucket implements Bucket {
    private calls: Record<string, number> = {}

    public async set(id: AllowParams['id'], increment: number) : Promise<void> {
        let numberOfCalls = await this.get(id)
        numberOfCalls += increment;
        this.calls[id] = numberOfCalls;
    }

    public async get(id: AllowParams['id']): Promise<number> {
        return this.calls[id] ?? 0
    }

    public async delete(id: AllowParams['id']): Promise<void> {
        delete this.calls[id]
    }
}
