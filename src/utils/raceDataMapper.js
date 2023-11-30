const {isEmpty, isNil} = require("lodash");

async function mappingData(data,  desiredStructure) {
    const result = [];
    if (isEmpty(desiredStructure) || isEmpty(data)) return result;

    const handleLevel = ({ nextDataLevel: currentDataLevel, relationDescription, row }) => {
        const rowId = isNil(relationDescription.name) ? row["id"] : row[`${relationDescription.name}_id`];
        let entity = currentDataLevel.find((entity) => rowId === entity?.id);
        const currentIdExist = !isNil(isNil(relationDescription.name) ? row["id"] : row[`${relationDescription.name}_id`]);

        if (isNil(entity) && currentIdExist) {
            entity = {};
            currentDataLevel.push(entity);
        }


        if (currentIdExist)
            relationDescription.columnsAliases.forEach((column) => {
                entity[column] = (isNil(relationDescription.name) ? row[column] : row[`${relationDescription.name}_${column}`]) ?? null;
            });

        if (currentIdExist)
            if (!isEmpty(relationDescription.relations)) {
                relationDescription.relations.map((relation) => {
                    if (isNil(entity[relation.name]))
                        entity[relation.name] = [];

                    handleLevel({ row, nextDataLevel: entity[relation.name], relationDescription: relation });
                });
            }
    };

    for (const row of data)
        handleLevel({ row, nextDataLevel: result, relationDescription: desiredStructure });

    return result;
}

module.exports = {
    mappingData
}