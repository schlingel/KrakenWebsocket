import { Buffer } from './buffer.interface';

export class ShiftingBuffer<T> implements Buffer<T> {
    private curIdx;
    private storage: T[];
    private maxSize: number;
    
    public constructor(size: number) {
        this.storage = [];
        this.curIdx = 0;
        this.maxSize = size;
    }
    
    push(val: T): void  {
        if (this.storage.length >= this.maxSize) {
            this.storage.splice(0, 1);
        }

        this.storage.push(val);
    }

    toArray(): T[] {
        return this.storage;
    }

    get(idx: number): T {
        return this.storage[idx];
    }
}
