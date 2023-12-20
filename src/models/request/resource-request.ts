import { RESOURCE_BASE_URL } from "../../constants/dbpedia";
import { Request } from "./request";
import { ResourceRequestField } from "./resource";

export abstract class ResourceRequest<T> extends Request<T> {
    constructor(uri: string, fields: ResourceRequestField[]) {
        super();

        this.queries = [
            this.buildResourceQuery(
                uri.startsWith("http") ? uri : `${RESOURCE_BASE_URL}${uri}`,
                fields,
            ),
        ];
    }

    private buildResourceQuery(
        uri: string,
        fields: ResourceRequestField[],
    ): string {
        return `
            SELECT DISTINCT(?label) ?abstract ${fields
                .map((field) =>
                    field.multiple
                        ? `GROUP_CONCAT(DISTINCT ?${field.attr}; SEPARATOR=",") AS ?${field.attr}`
                        : `?${field.attr}`,
                )
                .join(" ")}

            WHERE {
                <${uri}> rdfs:label ?label ;
                    dbo:abstract ?abstract .
                
                ${fields
                    .map(
                        (field) =>
                            `OPTIONAL { <${uri}> ${field.rel} ?${field.attr} }`,
                    )
                    .join("\n")}

                FILTER (lang(?label) = 'en') .
                FILTER (lang(?abstract) = 'en') .
            }
        `;
    }
}
