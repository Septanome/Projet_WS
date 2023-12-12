import { Request } from "./request";
import { AutocompleteResult } from "./autocomplete";
import { escape_query } from "../../utils/query";
import { CHARACTERS_REQ, LOCATIONS_REQ } from "../../constants/requests";

const DEFAULT_LIMIT = 5;

export class AutocompleteRequest extends Request<AutocompleteResult[]> {
    limit: number = DEFAULT_LIMIT;

    constructor(query: string) {
        super();

        this.queries = [this.buildAutocompleteQuery(query)];
    }

    formatResult(data: any[]): AutocompleteResult[] {
        return data[0].results.bindings.map(
            (binding: any): AutocompleteResult => ({
                url: binding.resource.value,
                label: binding.label.value,
                uriPart: binding.resource.value?.split("/").pop(),
                thumbnail: binding.thumbnail ? binding.thumbnail.value : null,
                type: binding.type.value,
            }),
        );
    }

    private buildAutocompleteQuery(query: string): string {
        const [search_term_escaped, search_term_escaped_regex] =
            escape_query(query);

        return `
            SELECT DISTINCT ?resource ?label ?thumbnail ?type
            WHERE {
                {
                    ${[CHARACTERS_REQ, LOCATIONS_REQ].join(" UNION ")}
                }

                ?resource rdfs:label ?label .

                FILTER (lang(?label) = 'en') .
                FILTER regex(?label, "${search_term_escaped_regex}", "i") .
            }
            ORDER BY STRLEN(?label) ASC(?label)
            LIMIT ${this.limit}
        `;
    }
}
