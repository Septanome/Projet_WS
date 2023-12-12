export const CHARACTERS_REQ = `
    {
        ?resource dcterms:subject dbc:Characters_in_Greek_mythology .
        BIND("character" as ?type) .
        {
            ?resource rdf:type dbo:MythologicalFigure .
        }
        UNION
        {
            ?resource rdf:type dbo:Deity .
        }
    }
`;

export const LOCATIONS_REQ = `
    {
        ?resource dcterms:subject dbc:Locations_in_Greek_mythology .
        BIND("location" as ?type) .
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
    }
`;
