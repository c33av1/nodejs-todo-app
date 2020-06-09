import {
    db,
    insertDocument,
    deleteDocumentById,
    updateDocumentById,
    findAllCollectionDocuments,
} from "./index";
import CONSTANTS from "../config/constant";

const getAllTodoLists = () =>
    db(findAllCollectionDocuments, { collection: "list" });

const addTodoItem = (newItem) => {
    const { itemName } = newItem;
    const data = {
        item: itemName,
        status: CONSTANTS.TODO_ITEM_STATUS.PENDING,
    };
    return db(insertDocument, { collection: "list", data });
};

const removeTodoItem = (itemId) =>
    db(deleteDocumentById, { collection: "list", id: itemId });

const markAsComplete = (itemId) =>
    db(updateDocumentById, {
        collection: "list",
        id: itemId,
        data: { status: CONSTANTS.TODO_ITEM_STATUS.COMPLETED },
    });

const markAsPending = (itemId) =>
    db(updateDocumentById, {
        collection: "list",
        id: itemId,
        data: { status: CONSTANTS.TODO_ITEM_STATUS.PENDING },
    });

export {
    getAllTodoLists,
    addTodoItem,
    removeTodoItem,
    markAsComplete,
    markAsPending,
};