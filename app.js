let accounts = require("./accounts");
const express = require("express");
const app = express();
const connectDb = require("./connectDb");
const accountsRoutes = require("./api/accounts/accounts.routes");
//const booksRoutes = require("./api/books/router");

const dotenv = require("dotenv");
dotenv.config(); //because i need access to the port

connectDb();

app.use(express.json());
app.use("/accounts", accountsRoutes);
//app.use("", booksRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
