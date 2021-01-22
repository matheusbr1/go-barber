import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

// Middleware of authentication
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

// SoC -> Separation of concerns

const appointmentsRouter = Router()


// Apply middleware on all routes
appointmentsRouter.use(ensureAuthenticated)

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {

    console.log(request.user)

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

    return response.json(appointment)
})

export default appointmentsRouter