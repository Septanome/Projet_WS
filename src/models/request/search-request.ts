import { RESOURCE_BASE_URL } from "../../constants/dbpedia";
import { CHARACTERS_REQ, LOCATIONS_REQ } from "../../constants/requests";
import { escape_query } from "../../utils/query";
import { PaginatedData } from "../pagination/pagination";
import { Request } from "./request";
import { SearchQuery, SearchResult } from "./search";

const DEFAULT_LIMIT = 10;

export class SearchRequest extends Request<PaginatedData<SearchResult>> {
    constructor(
        query: string,
        private offset: number = 0,
        private limit: number = DEFAULT_LIMIT,
    ) {
        super();

        this.queries = [
            this.buildSearchQuery({
                query,
                select: "COUNT(DISTINCT(?resource)) AS ?count",
                orderBy: undefined,
            }),
            this.buildSearchQuery({
                query,
                offset,
                limit,
                select: "DISTINCT(?resource) ?label ?abstract ?type ?thumbnail",
                orderBy:
                    "DESC(?label_exact_match) DESC(?label_word_match) DESC(?label_contains) DESC(?abstract_contains) ASC(?label_length) DESC(?thumbnail)",
            }),
        ];
    }

    formatResult(data: any[]): PaginatedData<SearchResult> {
        const [count, results] = data;

        return new PaginatedData(
            results.results.bindings.map(
                (binding: any): SearchResult => ({
                    url: binding.resource.value,
                    label: binding.label.value,
                    description: binding.abstract.value,
                    uriPart: binding.resource.value?.replace(
                        RESOURCE_BASE_URL,
                        "",
                    ),
                    thumbnail: binding.thumbnail
                        ? binding.thumbnail.value
                        : null,
                    type: binding.type.value,
                }),
            ),
            parseInt(count.results.bindings[0].count.value),
            this.offset,
            this.limit,
        );
    }

    private buildSearchQuery({
        query,
        offset,
        limit,
        select,
        orderBy,
    }: SearchQuery): string {
        const [search_term_escaped, search_term_escaped_regex] =
            escape_query(query);

        return `
            SELECT ${select}
            WHERE {
                {
                    ${[CHARACTERS_REQ, LOCATIONS_REQ].join(" UNION ")}
                }

                ?resource rdfs:label ?label .
                ?resource dbo:abstract ?abstract .

                FILTER (lang(?label) = 'en') .
                FILTER (lang(?abstract) = 'en') .

                BIND(
                    REGEX(LCASE(?label), "${search_term_escaped_regex}", "gi") AS ?label_contains
                )
                BIND(
                    REGEX(LCASE(?abstract), "${search_term_escaped_regex}", "gi")
                    AS ?abstract_contains
                ) .

                FILTER (?label_contains || ?abstract_contains) .

                OPTIONAL {
                    ?resource dbo:thumbnail ?thumbnail .
                }

                BIND(STRLEN(?label) AS ?label_length) .
                BIND(STR(LCASE(?label)) = "${search_term_escaped}" AS ?label_exact_match) .
                BIND(REGEX(LCASE(?label), "(?>^|[^a-z0-9])${search_term_escaped}(?>[^a-z0-9]|$)", "i") AS ?label_word_match) .
            }

            ${orderBy ? `ORDER BY ${orderBy}` : ""}
            
            ${limit ? `LIMIT ${limit}` : ""}
            ${offset ? `OFFSET ${offset}` : ""}
        `;
    }
}
