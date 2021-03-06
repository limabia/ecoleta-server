import express from "express";
import cors from "cors";
import routes from "./routes";
import { errors } from "celebrate";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(errors());

app.listen(3333);

// Rota: endereço completo da requisição
// Recurso: qual entidade estamos acessando do sistema
// request.params: parametros que vem na rota pra identificar recursos
// search params: parametros geralmente opcionais - usados pra filtros, paginação por ex
// request body: parametro para criação e atualização de informações
