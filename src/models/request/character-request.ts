import { Request } from "./request";
import { CharacterResult } from "./character";
import { escape_query } from "../../utils/query";
import { CHARACTERS_REQ, LOCATIONS_REQ } from "../../constants/requests";

export class CharacterRequest extends Request<CharacterResult[]> {
    constructor(uri: string) {
        super();

        // Example
        this.queries = [this.buildCharacterQuery(uri)];
    }

    formatResult(data: any[]): CharacterResult[] {
        return data[0].results.bindings.map(
            (binding: any): CharacterResult => ({
                url: binding.resource.value,
                label: binding.label.value,
                uriPart: binding.resource.value?.split("/").pop(),
                abstract: binding.abstract.value,
                thumbnail: binding.thumbnail ? binding.thumbnail.value : null,
                abode: binding.abode ? binding.abode.value : null,
                children: binding.children
                    ? binding.children.value.split(",")
                    : null,
                consort: binding.consort ? binding.consort.value : null,
                godOf: binding.godOf ? binding.godOf.value.split(",") : null,
                parents: binding.parents ? binding.parents.value : null,
                siblings: binding.siblings
                    ? binding.siblings.value.split(",")
                    : null,
                planet: binding.planet ? binding.planet.value : null,
                symbol: binding.symbol ? binding.symbol.value.split(",") : null,
            }),
        );
    }

    private buildCharacterQuery(selectedCharacterUri: string): string {
        return `
            SELECT DISTINCT ?label ?abstract ?thumbnail ?abode ?planet
            GROUP_CONCAT(DISTINCT ?godOf; SEPARATOR=",") AS ?godOfs
            GROUP_CONCAT(DISTINCT ?symbol; SEPARATOR=",") AS ?symbols
            GROUP_CONCAT(DISTINCT ?children; SEPARATOR=",") AS ?childrens
            GROUP_CONCAT(DISTINCT ?siblings; SEPARATOR=",") AS ?siblings
            GROUP_CONCAT(DISTINCT ?consort; SEPARATOR=",") AS ?consorts
            GROUP_CONCAT(DISTINCT ?parents; SEPARATOR=",") AS ?parents
            WHERE {
                <${selectedCharacterUri}> rdfs:label ?label ;
                    dbo:abstract ?abstract .
    
                OPTIONAL { <${selectedCharacterUri}> dbo:thumbnail ?thumbnail }
                OPTIONAL { <${selectedCharacterUri}> dbp:abode ?abode }
                OPTIONAL { <${selectedCharacterUri}> dbp:children ?children}
                OPTIONAL { <${selectedCharacterUri}> dbp:consort ?consort }
                OPTIONAL { <${selectedCharacterUri}> dbp:godOf ?godOf }
                OPTIONAL { <${selectedCharacterUri}> dbp:parents ?parents }
                OPTIONAL { <${selectedCharacterUri}> dbp:planet ?planet }
                OPTIONAL { <${selectedCharacterUri}> dbp:symbol ?symbol }
                OPTIONAL { <${selectedCharacterUri}> dbp:siblings ?siblings }
    
                FILTER (lang(?label) = 'en')
                FILTER (lang(?abstract) = 'en')
            }
        `;
    }
}
