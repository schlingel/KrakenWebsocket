export interface Buffer<T> {
    push(val: T): void;
    toArray(): T[];
    get(idx: number): T;
}
