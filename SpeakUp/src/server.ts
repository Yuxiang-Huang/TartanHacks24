import express from "express";
var cors = require("cors");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

// app.get("/", async (req, res) => {
//   const usernameValue: string = req.query.username as string;
//   const user = await prisma.user.findUnique({
//     where: {
//       username: usernameValue,
//     },
//   });
//   res.json(user);
// });

app.post("/create", async function (req, res) {
  const { audio } = req.body;
  const newUser = await prisma.user.create({
    data: {
      audio,
    },
  });
  res.json({ status: 200 });
});

app.listen(8000, () =>
  console.log("REST API server ready at: http://localhost:8000/")
);
