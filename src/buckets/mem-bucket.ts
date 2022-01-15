import {AllowParams} from '../types'
import { Bucket } from './types';

export class MemBucket implements Bucket {
    private calls: Record<string, number> = {}

    public set(id: AllowParams['id'], increment: number) : void {
        let numberOfCalls = this.get(id)
        numberOfCalls += increment;
        this.calls[id] = numberOfCalls;
    }

    public get(id: AllowParams['id']): number {
        return this.calls[id] ?? 0
    }

    public delete(id: AllowParams['id']): void {
        delete this.calls[id]
    }
}