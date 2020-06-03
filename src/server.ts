import express, { request } from 'express';

const app = express();

// Rota: endereço completo da requisição
// Recurso: qual entidade estamos acessando do sistema

app.use(express.json());

const users = [
    'Marcela',
    'Ursula',
    'Roberta',
    'Marta',
    'teste',
]


app.get('/users', (request, response) => {   
    const search = String(request.query.search);
    // search params: parametros geralmente opcionais - usados pra filtros, paginação por ex

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    
    return response.json(filteredUsers);
});


app.get('/users/:id',(request, response) =>{
    const id = Number(request.params.id);
    // request.params: parametros que vem na rota pra identificar recursos

    const user = users[id];

    return response.json(user);
});


app.post('/users', (request, response) => {    
    const data = request.body;
    // request body: parametro para criação e atualização de informações
    console.log(data);

    const user = {
        name: data.name,
        email:  data.email
    }

    return response.json(user);
});

app.listen(3333);
