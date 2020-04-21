const express = require('express')

const app = express()

/*
    Métodos HTTP:
    GET: Consultar uma informação no backend
    POST: Criar uma informação no backend
    PUT: Alterar uma informação no backend
    DELETE: Deletar uma informação no backend
*/

app.get('/', (request, response) => {
    return response.json({ message: 'Bem vindo user!' })
})

app.get('/projects', (request, response) => {
    return response.json([
        'project 1',
        'project 2',
    ])
})

app.post('/projects/:id', (request, response) => {
    return response.json([
        'project 4',
        'project 2',
        'project 3',
    ])
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'project 1',
        'project 2',
    ])
})

app.listen(3333, () => {
    console.log('🖥️ Back-end started!')
})