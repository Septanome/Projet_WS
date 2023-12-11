export interface AutocompleteResult {
    url: string;
    label: string;
    uriPart: string;
    thumbnail: string | null;
    type: "character" | "location";
}
