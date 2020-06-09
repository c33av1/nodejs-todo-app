const insertDocument = async({ client, db_name, collection, data }) => {
    const result = await client
        .db(db_name)
        .collection(collection)
        .insertOne(data);

    return result.insertedId;
};

const insertManyDocuments = async({
    client,
    db_name,
    collection,
    newDocuments,
}) => {
    const result = await client
        .db(db_name)
        .collection(collection)
        .insertMany(newDocuments);

    console.log(result.insertedIds);
    return result.insertedCount;
};

export { insertDocument, insertManyDocuments };