import { ObjectId } from "mongodb";

const deleteDocumentById = async({ client, db_name, collection, id }) =>
    client
    .db(db_name)
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

const updateDocumentById = async({ client, db_name, collection, id, data }) =>
    client
    .db(db_name)
    .collection(collection)
    .updateOne({ _id: ObjectId(id) }, { $set: data });

export { deleteDocumentById, updateDocumentById };