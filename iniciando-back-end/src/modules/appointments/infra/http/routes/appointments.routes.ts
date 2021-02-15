import { Router } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

// Middleware of authentication
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// SoC -> Separation of concerns

const appointmentsRouter = Router()

// Apply middleware on all routes
appointmentsRouter.use(ensureAuthenticated)

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

    return response.json(appointment)
})

export default appointmentsRouter