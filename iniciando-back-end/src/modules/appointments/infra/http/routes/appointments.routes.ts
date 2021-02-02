import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

// Middleware of authentication
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import Appointment from '../../typeorm/entities/Appointment'

// SoC -> Separation of concerns

const appointmentsRouter = Router()

// Apply middleware on all routes
appointmentsRouter.use(ensureAuthenticated)

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

// appointmentsRouter.get('/', async (request, response) => {

//     console.log(request.user)

//     const appointments = await appointmentsRepository.find()

//     return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const appointmentsRepository = new AppointmentsRepository()
    const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

    return response.json(appointment)
})

export default appointmentsRouter