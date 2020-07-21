const listDatabases = async ({ client }) => {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};

const findOneDocumentByField = async ({ client, db_name, collection, field }) =>
  client.db(db_name).collection(collection).findOne(field);

const findAllCollectionDocuments = async ({ client, db_name, collection }) =>
  client
    .db(db_name)
    .collection(collection)
    .find({})
    .sort({ _id: -1 })
    .toArray();

export { listDatabases, findOneDocumentByField, findAllCollectionDocuments };
