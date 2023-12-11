export const getCenteredArrayBoundaries = <T>(
    array: ArrayLike<T> | number,
    center: number,
    limit: number,
    min: number = 0,
): [number, number] => {
    let length = typeof array === "number" ? array : array.length;
    let start = Math.max(min, center - Math.floor(limit / 2));
    let end = Math.min(length, center + Math.floor(limit / 2));

    if (end - start + 1 < limit) {
        if (start === min) {
            end = Math.min(length, start + limit - 1);
        } else if (end === length) {
            start = Math.max(min, end - limit + 1);
        }
    }

    return [start, end];
};

export const getCenteredArray = <T>(
    array: T[],
    center: number,
    limit: number,
): T[] => {
    const [start, end] = getCenteredArrayBoundaries(array, center, limit);
    return array.slice(start, end);
};
