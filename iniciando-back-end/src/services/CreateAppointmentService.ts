import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

interface Request {
    provider: string
    date: Date
}

// (SOLID)

// Single Responsability Principle
// Dependency Invertion Principle 

class CreateAppointmentService {
    public async execute({ date, provider }: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = appointmentsRepository.findByDate(date)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService