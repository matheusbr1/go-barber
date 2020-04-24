const express = require('express')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())

/*
    Métodos HTTP:
    GET: Consultar uma informação no backend
    POST: Criar uma informação no backend
    PUT: Alterar uma informação no backend
    DELETE: Deletar uma informação no backend
*/

/*
    Tipos de parâmetros:
    QUERY PARAMS: Filtros e paginação
    ROUTE PARAMS: Identificar recursos na hora de atualizar ou deletar
    REQUEST BODY: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

const projects = []

app.get('/', (request, response) => {
    return response.json({ message: 'Welcome user!' })
})

app.get('/projects', (request, response) => {

    const { title } = request.query

    const results = title ?
        projects.filter(project => project.title.includes(title)) :
        projects

    return response.json(results)
})

app.post('/projects', (request, response) => {

    const { title, owner } = request.body

    const project = { id: uuid(), title, owner }
    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id', (request, response) => {

    const { id } = request.params
    const { title, owner } = request.body

    // O find procura dentro do item o ID que bate com o enviado via Route Params
    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) return response.status(400).json({ error: 'Project not found' })

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) return response.status(400).json({ error: 'Project not found' })

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})

app.listen(3333, () => {
    console.log('🖥️ Back-end started!')
})