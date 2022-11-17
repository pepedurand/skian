import express from "express";
import cors from "cors";
import { userRouter } from "./router/UserRouter";
import { pizzaRouter } from "./router/PizzaRouter";
import { drinkRouter } from "./router/DrinkRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log("Servidor rodando na porta 3003");
});
export default app;

app.use("/", userRouter);
app.use("/", pizzaRouter);
app.use("/", drinkRouter);
