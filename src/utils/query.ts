export const escape_query = (query: string) => {
    const search_term_escaped = query
        .replace(/[^a-zA-Z0-9 ]+/g, " ")
        .trim()
        .toLowerCase();
    const search_term_escaped_regex = search_term_escaped.replace(
        /\W+/g,
        "[^a-zA-Z0-9]+",
    );

    return [search_term_escaped, search_term_escaped_regex];
};
