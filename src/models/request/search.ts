export interface SearchQuery {
    query: string;
    offset?: number;
    limit?: number;
    select?: string;
    orderBy?: string;
}

export interface SearchResult {
    url: string;
    label: string;
    description: string;
    uriPart: string;
    thumbnail: string | null;
    type: "character" | "location";
}

export interface LocationQuery {
    query: string;
    select?: string;
    orderBy?: string;
}

export interface LocationResult {
    url: string;
    label: string;
    description: string;
    uriPart: string;
    thumbnail: string | null;
}
