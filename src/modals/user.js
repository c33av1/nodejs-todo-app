import { db, insertDocument, findOneDocumentByField } from "./index";

const UserView = (user) => ({
  ...user,
  password: null,
});

const getUserByEmail = (email) => {
  const user = db(findOneDocumentByField, {
    collection: "user",
    field: { email },
  });
  return UserView(user);
};

const getUserByAccount = (email, password) => {
  const field = { email, password };
  const user = db(findOneDocumentByField, { collection: "user", field });
  return UserView(user);
};

const addUser = (newUser) => {
  return db(insertDocument, { collection: "user", data: newUser });
};

export { getUserByEmail, getUserByAccount, addUser };
