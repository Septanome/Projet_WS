import { CHARACTERS_REQ, LOCATIONS_REQ } from "../../constants/requests";
import { escape_query } from "../../utils/query";
import { Request } from "./request";
import { LocationQuery, LocationResult } from "./search";

const DEFAULT_LIMIT = 10;

export class LocationRequest extends Request<LocationResult> {
    constructor(query: string) {
        super();

        this.queries = [
            this.buildSearchQuery("Athens"), // TO MODIFY LATER, IT'S JUST FOR TEST
        ];
    }

    formatResult(data: any[]): LocationResult {
        const [resources] = data;

        return {
            url: resources.resources.binding.resource.value,
            label: resources.resources.binding.label.value,
            description: resources.resources.binding.abstract.value,
            uriPart: resources.resources.binding.resource.value,
            thumbnail: resources.resources.binding.thumbnail
                ? resources.resources.binding.thumbnail.value
                : null,
        };
    }

    buildSearchQuery(select: string): string {
        return `
        SELECT ?abstract ?thumbnail
        WHERE {
          dbr:${select} dbo:abstract ?abstract.
          OPTIONAL { dbr:NomDuLieu dbo:thumbnail ?thumbnail. }
          FILTER (LANG(?abstract) = 'en')
        }
        `;
    }
}
