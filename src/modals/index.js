import {
    dbConnect,
    insertDocument,
    insertManyDocuments,
    listDatabases,
    findOneDocumentByField,
    findAllCollectionDocuments,
    deleteDocumentById,
    updateDocumentById,
} from "../lib/mongodb";
import config from "../config";

const db = async(callback, params) => {
    const {
        db: { name: db_name, url: db_url },
    } = config;

    return dbConnect({ db_url, callback, db_name, ...params });
};

export {
    db,
    insertDocument,
    insertManyDocuments,
    listDatabases,
    findOneDocumentByField,
    findAllCollectionDocuments,
    deleteDocumentById,
    updateDocumentById,
};