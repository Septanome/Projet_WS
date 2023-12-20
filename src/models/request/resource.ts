export interface ResourceRequestField {
    rel: string;
    attr: string;
    multiple?: boolean;
}

export const CHARACTER_REQUEST_FIELDS: ResourceRequestField[] = [
    {
        rel: "dbo:thumbnail",
        attr: "thumbnail",
    },
    {
        rel: "dbp:abode",
        attr: "abode",
    },
    {
        rel: "dbp:children",
        attr: "children",
        multiple: true,
    },
    {
        rel: "dbp:consort",
        attr: "consort",
        multiple: true,
    },
    {
        rel: "dbp:godOf",
        attr: "godOf",
        multiple: true,
    },
    {
        rel: "dbp:parents",
        attr: "parents",
        multiple: true,
    },
    {
        rel: "dbp:planet",
        attr: "planet",
    },
    {
        rel: "dbp:symbol",
        attr: "symbol",
        multiple: true,
    },
    {
        rel: "dbp:siblings",
        attr: "siblings",
        multiple: true,
    },
];

export const LOCATION_REQUEST_FIELDS: ResourceRequestField[] = [
    {
        rel: "dbo:thumbnail",
        attr: "thumbnail",
    },
    {
        rel: "dbp:name",
        attr: "name",
    },
    {
        rel: "rdfs:comment",
        attr: "comment",
    },
    {
        rel: "geo:lat",
        attr: "latitude",
    },
    {
        rel: "geo:long",
        attr: "longitude",
    },
    {
        rel: "dbo:country",
        attr: "country",
    },
];
