export default {
  db: {
    host: process.env["DATABASE_HOST"],
    name: process.env["DATABASE_NAME"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    get url() {
      return `mongodb+srv://${this.username}:${this.password}@${this.host}/test?retryWrites=true&w=majority`;
    },
  },
};
