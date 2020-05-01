const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(cors())

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

/*
    Midleware:

    interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição

*/

const projects = []

function logRequests(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() // Próximo midleware

    console.timeEnd(logLabel)
}

/*
    Todo o app usa o midleware
    app.use(logRequests)
 */

function validateProjectId(request, response, next) {
    const { id } = request.params

    if (!isUuid(id)) return response.status(400).json({ error: 'Invalid Project ID' })

    return next()
}

app.use('projects/:id', validateProjectId)

app.get('/', (request, response) => {
    return response.json({ message: 'Welcome user!' })
})

app.get('/projects', logRequests, (request, response) => {

    const { title } = request.query

    const results = title ? projects.filter(project => project.title.includes(title)) : projects

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