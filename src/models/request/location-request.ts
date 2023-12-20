import { LOCATION_REQUEST_FIELDS } from "./resource";
import { ResourceRequest } from "./resource-request";
import { LocationResult } from "./search";

export class LocationRequest extends ResourceRequest<LocationResult> {
    constructor(uri: string) {
        super(uri, LOCATION_REQUEST_FIELDS);
    }

    formatResult(data: any[]): LocationResult {
        const [resources] = data;

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
}
