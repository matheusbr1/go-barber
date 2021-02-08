import React, { useCallback, useContext, useState } from 'react'
import { 
  Container, 
  Header, 
  HeaderContent, 
  Profile, 
  Content, 
  Schedule, 
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles'

import logoImg from '../../assets/logo.svg'
import { FiClock, FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const Dashboard: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState(new Date())

  const { signOut, user } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day)
    }
  },[])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>
          <Profile>
            <img src="https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4" alt={user.name}/>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
      
          <button type="button" onClick={signOut} >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>

        <Schedule>

          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-Feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4' alt="Matheus Baron"/>

              <strong>Matheus Baron</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4' alt="Matheus Baron"/>

                <strong>Matheus Baron</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4' alt="Matheus Baron"/>

                <strong>Matheus Baron</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4' alt="Matheus Baron"/>

                <strong>Matheus Baron</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4' alt="Matheus Baron"/>

                <strong>Matheus Baron</strong>
              </div>
            </Appointment>
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker 
            weekdaysShort={[ 'D','S','T','Q','Q','S','S' ]} 
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1,2,3,4,5] }
            }}
            disabledDays={[
              { daysOfWeek: [0,6] }
            ]}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>

      </Content>

    </Container>
  ) 
} 

export default Dashboard