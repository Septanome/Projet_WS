import { Request } from "./request";
import { CharacterResult } from "./search";

export class CharacterRequest extends Request<CharacterResult> {
    constructor(uri: string) {
        super();

        this.queries = [this.buildCharacterQuery(uri)];
    }

    formatResult(data: any[]): CharacterResult {
        const [resources] = data;

        const binding = resources.results.bindings[0];

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
                <http://dbpedia.org/resource/${selectedCharacterUri}> rdfs:label ?label ;
                    dbo:abstract ?abstract .
    
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbo:thumbnail ?thumbnail }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:abode ?abode }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:children ?children}
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:consort ?consort }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:godOf ?godOf }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:parents ?parents }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:planet ?planet }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:symbol ?symbol }
                OPTIONAL { <http://dbpedia.org/resource/${selectedCharacterUri}> dbp:siblings ?siblings }
    
                FILTER (lang(?label) = 'en')
                FILTER (lang(?abstract) = 'en')
            }
        `;
    }
}
