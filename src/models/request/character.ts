export interface CharacterResult {
    url: string;
    label: string;
    uriPart: string;
    abstract: string;
    thumbnail: string | null;
    abode: string | null;
    children: string[] | null;
    consort: string | null;
    godOf: string[] | null;
    parents: string | null;
    siblings: string[] | null;
    planet: string | null;
    symbol: string[] | null;
}
