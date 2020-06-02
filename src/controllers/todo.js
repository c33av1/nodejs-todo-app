import bodyParser from "body-parser";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let data = [
    { id: 1, item: "get milk" },
    { id: 2, item: "walk dog" },
    { id: 3, item: "kick some coding ass" },
];

const todoController = (app) => {
    app.get("/todo", (req, res) => {
        res.render("todo", { todos: data });
    });

    app.post("/todo", urlencodedParser, (req, res) => {
        const newItemId = data.length + 1;
        const newItem = { id: newItemId, item: req.body.item };
        data = [...data, newItem];

        res.json({ success: true, todos: data });
    });

    app.delete("/todo/:itemId", (req, res) => {
        data = data.filter((item) => `${item.id}` !== `${req.params.itemId}`);

        res.json({ success: true, todos: data });
    });
};

export default todoController;