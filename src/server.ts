import express from 'express';

const app = express();

app.get('/users', (request, response) => {    
    response.json(
        [
            'Marcela',
            'Ursula',
            'Roberta',
            'Marta',
            'teste',
        ]
    );
});

app.listen(3333);
