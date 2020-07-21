import bodyParser from "body-parser";

import {
  addTodoItem,
  removeTodoItem,
  markAsComplete,
  markAsPending,
  getAllTodoLists,
} from "../modals/todo";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const todoController = (app) => {
  app.get("/todo", async (req, res) => {
    const todos = await getAllTodoLists().catch((err) =>
      console.log("An error occured:", err)
    );

    res.render("todo", { todos });
  });

  app.post("/todo", urlencodedParser, async (req, res) => {
    const newItem = { itemName: req.body.item };
    await addTodoItem(newItem)
      .then((newItemId) => res.json({ success: true, itemId: newItemId }))
      .catch((err) => res.json({ success: false, err }));
  });

  app.delete("/todo/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    await removeTodoItem(itemId);

    res.json({ success: true });
  });

  app.patch("/todo/:itemId/complete", async (req, res) => {
    const itemId = req.params.itemId;
    await markAsComplete(itemId);

    res.json({ success: true });
  });

  app.patch("/todo/:itemId/pending", async (req, res) => {
    const itemId = req.params.itemId;
    await markAsPending(itemId);

    res.json({ success: true });
  });
};

export default todoController;
