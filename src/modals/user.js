import { db, insertDocument, findOneDocumentByField } from "./index";

const getUserByEmail = (email) =>
    db(findOneDocumentByField, { collection: "user", field: { email } });

const getUserByAccount = (email, password) => {
    const field = { email, password };
    return db(findOneDocumentByField, { collection: "user", field });
};

const addUser = (newUser) => {
    return db(insertDocument, { collection: "user", data: newUser });
};

export { getUserByEmail, getUserByAccount, addUser };