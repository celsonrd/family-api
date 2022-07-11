import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

let familia = [
    { id: 1, name: "Dona Neide", age: 58, occupation: "Super Boss" },
    { id: 2, name: "Rinaldo", age: 43, occupation: "Dick Vigarista" },
    { id: 3, name: "Jane", age: 37, occupation: "Admin" },
    { id: 4, name: "Celson Rodrigues", age: 34, occupation: "Developer" },
    { id: 5, name: "Cabeção", age: 45, occupation: "Encostado" }
];

app.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    return res.send("<h1>Bem vindo a Family API</h1>");    
});


app.get('/users', (req, res) => {
    return res.send(familia);
});

app.get('/users/:id', (req, res) => {
    const id  = req.params.id;
    const user = familia.find(user => {
        return(user.id === Number(id));
    });
    return res.send(user);
});

app.post('/users', (req, res) => {
    const agregado = req.body;
    familia.push(agregado);
    return res.status(StatusCodes.CREATED).send(agregado);
});

app.put('/users/:id', (req, res) => {
    const id  = req.params.id;
    const updMembro = req.body;

    familia = familia.map(user => {
        if (Number(id) === user.id){
            return updMembro;
        }
        return user;
    });

    return res.send(updMembro);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    familia = familia.filter((user) => user.id !== Number(id));
    return res.status(StatusCodes.NO_CONTENT).send();
});