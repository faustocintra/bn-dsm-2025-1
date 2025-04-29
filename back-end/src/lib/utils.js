function includeRelations(query) {
    const include = {};

    if (query.include) {

        const relations = query.include.split(',');

        relations.forEach((relation) => {
            include[relation] = true;
        });
    }

    return include;

}

export { includeRelations };
