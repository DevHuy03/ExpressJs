import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers =[
    {id: 1, username: "anson", displayName: "Anson" },
    {id: 2, username: "jack", displayName: "Jack" },
    {id: 3, username: "adam", displayName: "Adam" },
    {id: 4, username: "tina", displayName: "Tina" },
    {id: 5, username: "jason", displayName: "Jason" },
    {id: 6, username: "henry", displayName: "henry" },
    {id: 7, username: "marilyn", displayName: "Marilyn" },
];

app.get("/", ( request , response ) =>{
    return response.send({ msg: "Kiều Oanh là con gà ! hehe" });
});

//http://localhost:3000/api/users
//http://localhost:3000/api/users?filter=username&value=an
app.get("/api/users", ( request , response ) =>{
    console.log(request.query);
    const {
        query:{ filter, value }
    } = request;
    // When filter and value are undefined
    // if(!filter && !value )
    //     return response.send(mockUsers);
    if(filter && value)
        return response.send(mockUsers.filter((user)=> user[filter].includes(value))
    );
    // When filter and value are undefined
    return response.send(mockUsers);
});

app.post('/api/users',(request, response) =>{
    const {body} = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

app.get("/api/users/:id", (request, response) =>{
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId))
        return response.status(400).send({ mgs: "Bad Request, Invalid ID."});
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if(!findUser)
        return response.sendStatus(404);
    return response.send(findUser);
});

app.get("/api/product", (request, response) => {
    response.send([
        { id: 1, name: "chicken breast", price: 12.99 }
    ]);

});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
}); 
