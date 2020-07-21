import bodyParser from "body-parser";

import { getUserByEmail, getUserByAccount, addUser } from "../modals/user";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mainController = (app) => {
  app.get("/", async (req, res) => {
    res.render("main");
  });

  app.post("/register", urlencodedParser, async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user !== null) {
      res.json({ success: false, message: "Email already registered!" });
    }

    const newUserData = { email, password };
    await addUser(newUserData)
      .then((newUserId) => res.json({ success: true }))
      .catch((err) => res.json({ success: false, err }));
  });

  app.post("/login", urlencodedParser, async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByAccount(email, password);

    if (user === null) {
      res.json({ success: false });
    }
    console.log("user;;;;;", user);
    res.json({ success: true });
  });
};

export default mainController;
