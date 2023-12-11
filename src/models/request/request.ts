import { REQUEST_BASE_URL } from "../../constants/dbpedia";

export abstract class Request<T> {
    baseUrl: string = REQUEST_BASE_URL;
    format: string = "json";
    queries: string[] | undefined;

    async execute(): Promise<T> {
        return this.formatResult(
            await Promise.all(
                this.getQueries().map(async (query) => {
                    const res = await fetch(this.buildUrl(query));

                    if (!res.ok) {
                        console.error(await res.text());
                        throw new Error("Failed to fetch data");
                    }

                    return await res.json();
                }),
            ),
        );
    }

    abstract formatResult(data: any[]): T;

    private getQueries(): string[] {
        if (!this.queries) {
            throw new Error("Query not set");
        }

        return this.queries;
    }

    private buildUrl(query: string): string {
        return `${this.baseUrl}?query=${encodeURIComponent(
            query.replace(/ *\n */g, "\n"),
        )}&format=${this.format}`;
    }
}
