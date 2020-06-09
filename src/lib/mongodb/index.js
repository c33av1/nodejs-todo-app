import MongoClient from "mongodb";
import { insertDocument, insertManyDocuments } from "./db/create";
import {
    listDatabases,
    findOneDocumentByField,
    findAllCollectionDocuments,
} from "./db/fetch";
import { deleteDocumentById, updateDocumentById } from "./db/update";

const main = async(params) => {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const { db_url, callback } = params;
    const client = await new MongoClient(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    let result = [];

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        result = await callback({ client, ...params });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        return result;
    }
};

const dbConnect = (params) => {
    return main(params).catch(console.error);
};

export {
    dbConnect,
    insertDocument,
    insertManyDocuments,
    listDatabases,
    findOneDocumentByField,
    findAllCollectionDocuments,
    deleteDocumentById,
    updateDocumentById,
};