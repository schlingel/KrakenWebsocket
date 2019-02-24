import { ShiftingBuffer } from "./shifting-buffer";

describe('Shifting Buffer', () => {
    it('should not grow above max size', () => {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const buffer = new ShiftingBuffer<Number>(5);
        items.forEach(item => buffer.push(item));

        const createdArr = buffer.toArray();
        expect(createdArr.length).toEqual(5);
        expect(createdArr).toEqual([6, 7, 8, 9, 10])
    });
});