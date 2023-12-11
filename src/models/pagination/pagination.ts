export class PaginatedData<T> {
    constructor(
        public readonly data: T[],
        public readonly total: number,
        public readonly offset: number,
        public readonly limit: number,
    ) {}

    get hasNext(): boolean {
        return this.offset + this.limit < this.total;
    }

    get hasPrevious(): boolean {
        return this.offset > 0;
    }

    get totalPages(): number {
        return Math.ceil(this.total / this.limit);
    }

    get currentPage(): number {
        return Math.floor(this.offset / this.limit) + 1;
    }
}
