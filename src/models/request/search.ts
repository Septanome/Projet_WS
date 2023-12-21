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

export interface LocationResult {
    url: string;
    label: string;
    description: string;
    uriPart: string;
    thumbnail: string | null;
    name: string | null;
    comment: string | null;
    latitude: number;
    longitude: number;
    country: string | null;
}

export interface CharacterResult {
    url: string;
    label: string;
    uriPart: string;
    abstract: string;
    thumbnail: string | null;
    abode: string | null;
    children: string[] | null;
    consort: string[] | null;
    godOf: string[] | null;
    parents: string | null;
    siblings: string[] | null;
    planet: string | null;
    symbol: string[] | null;
}

export interface SearchRef {
    query: string;
    page: number;
}
