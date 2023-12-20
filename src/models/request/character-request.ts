import { CHARACTER_REQUEST_FIELDS } from "./resource";
import { ResourceRequest } from "./resource-request";
import { CharacterResult } from "./search";

export class CharacterRequest extends ResourceRequest<CharacterResult> {
    constructor(uri: string) {
        super(uri, CHARACTER_REQUEST_FIELDS);
    }

    formatResult(data: any[]): CharacterResult {
        const [resources] = data;

        const binding = resources.results.bindings[0];

        if (binding.siblings?.value.startsWith("http")) {
            binding.siblings.value = binding.siblings.value.substring(28);
        }

        if (binding.parents?.value.startsWith("http")) {
            binding.parents.value = binding.parents.value.substring(28);
        }

        return {
            url: binding.resource ? binding.resource.value : null,
            label: binding.label ? binding.label.value : null,
            uriPart: binding.resource?.value?.split("/").pop() || null,
            abstract: binding.abstract ? binding.abstract.value : null,
            thumbnail: binding.thumbnail ? binding.thumbnail.value : null,
            abode: binding.abode ? binding.abode.value : null,
            children: binding.children
                ? binding.children.value.split(",")
                : null,
            consort: binding.consort ? binding.consort.value.split(",") : null,
            godOf: binding.godOf ? binding.godOf.value.split(",") : null,
            parents: binding.parents ? binding.parents.value : null,
            siblings: binding.siblings
                ? binding.siblings.value.split(",")
                : null,
            planet: binding.planet ? binding.planet.value : null,
            symbol: binding.symbol ? binding.symbol.value.split(",") : null,
        };
    }
}
