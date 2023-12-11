import React, { FC, PropsWithChildren } from "react";
import { QueryContext, ResourceType } from "./context";

const urlBase = "http://dbpedia.org/sparql";

function craftSearchQuery(search_term: string, type: ResourceType): string {
    const nullPredicate = `        {
        ?resource a :NonExistentType .
    }`;
    const characterPredicates = `        {
        ?resource dcterms:subject dbc:Characters_in_Greek_mythology .
        {
            ?resource rdf:type dbo:MythologicalFigure .
        }
        UNION
        {
            ?resource rdf:type dbo:Deity .
        }
    }`;

    const locationPredicates = `        {
        ?resource dcterms:subject dbc:Locations_in_Greek_mythology .
        {
            ?resource rdf:type dbo:Place .
        }
        UNION
        {
            ?resource rdf:type dbo:Location .
        }
        UNION
        {
            ?resource rdf:type schema:Place .
        }
    }`;

    let predicates;

    switch (type) {
        case ResourceType.CHARACTER:
            predicates = characterPredicates;
            break;
        case ResourceType.LOCATION:
            predicates = locationPredicates;
            break;
        default:
            predicates = nullPredicate;
    }

    const request = `
    SELECT ?resource ?label
    WHERE {
        ${predicates}
        ?resource rdfs:label ?label .
        FILTER (lang(?label) = 'en')
        FILTER (CONTAINS(LCASE(?label), "${search_term
            .replace(/[^a-zA-Z0-9 ]+/g, " ")
            .trim()}"))
    }
`;
    const url =
        urlBase + "?query=" + encodeURIComponent(request) + "&format=json";
    return url;
}

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const query = async (
        search_term: string,
        type: ResourceType,
    ): Promise<any[]> => {
        const url = craftSearchQuery(search_term, type);
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("dbpedia returned an error");
        }

        const json = await res.json();

        const results = new Map();

        for (const result of json.results.bindings) {
            const resource = result.resource.value;

            let resourceObj = results.get(resource);

            if (!resourceObj) {
                resourceObj = {
                    label: new Set(),
                    type: type,
                };

                results.set(resource, resourceObj);
            }

            if (result.label.value) {
                resourceObj.label.add(result.label.value);
            }
        }

        let resultsArray: any[] = [];

        results.forEach((resourceObj, resource) => {
            resultsArray.push(
                Array.from(resourceObj.label)[0] +
                    " (" +
                    resourceObj.type +
                    ")",
            );
        });

        return resultsArray;
    };

    const queryAllTypes = async (search_term: string): Promise<any[]> => {
        const characterPromise = query(search_term, ResourceType.CHARACTER);
        const locationPromise = query(search_term, ResourceType.LOCATION);

        const [characterResults, locationResults] = await Promise.all([
            characterPromise,
            locationPromise,
        ]);

        const finalResults = characterResults.concat(locationResults);
        return finalResults;
    };

    return (
        <QueryContext.Provider
            value={{
                query,
                queryAllTypes,
            }}
        >
            {children}
        </QueryContext.Provider>
    );
};
