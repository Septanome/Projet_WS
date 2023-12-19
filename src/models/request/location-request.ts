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

        console.log(resources);

        const binding = resources.results.bindings[0];

        return {
            url: binding.resource?.value || null,
            label: binding.label?.value || null,
            description: binding.abstract?.value || null,
            uriPart: binding.resource?.value || null,
            thumbnail: binding.thumbnail?.value || null,
            name: binding.name?.value || null,
            comment: binding.comment?.value || null,
            latitude: binding.latitude?.value || null,
            longitude: binding.longitude?.value || null,
            country: binding.country?.value || null,
        };
    }

    buildSearchQuery(select: string): string {
        return `
        SELECT DISTINCT ?abstract ?thumbnail ?name ?comment ?latitude ?longitude ?country
        WHERE {
            dbr:${select} dbo:abstract ?abstract.
            
            FILTER (lang(?comment) = 'en')
            FILTER (lang(?abstract) = 'en')

            OPTIONAL { dbr:${select} dbp:label ?label. }
            OPTIONAL { dbr:${select} dbo:thumbnail ?thumbnail. }
            OPTIONAL { dbr:${select} dbp:name ?name. }
            OPTIONAL { dbr:${select} rdfs:comment ?comment. }
            OPTIONAL { dbr:${select} geo:lat ?latitude. }
            OPTIONAL { dbr:${select} geo:long ?longitude. }
            OPTIONAL { dbr:${select} dbo:country ?country. }
        }
        `;
    }
}
