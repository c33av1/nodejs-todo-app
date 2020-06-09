export default {
    db: {
        host: "cluster0-nqx8f.mongodb.net",
        name: "todo_app",
        username: "todoapp_user",
        password: "ZseV6wbht9v4E5MD",
        get url() {
            return `mongodb+srv://${this.username}:${this.password}@${this.host}/test?retryWrites=true&w=majority`;
        },
    },
};