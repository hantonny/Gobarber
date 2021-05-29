import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import App from '../../App';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 29</span>
            <span>Segunda-Feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars.githubusercontent.com/u/22649926?s=400&u=939488a2c5a3d0a93a6c79f484d8419bd1229644&v=4" alt="Hantonny Korrea" />
              <strong>Hantonny Korrea</strong>
              <span>
                <FiClock />
                18:30
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:30
                <div>
                  <img src="https://avatars.githubusercontent.com/u/22649926?s=400&u=939488a2c5a3d0a93a6c79f484d8419bd1229644&v=4" alt="Hantonny Korrea" />
                  <strong>Hantonny Korrea</strong>
                </div>
              </span>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:30
                <div>
                  <img src="https://avatars.githubusercontent.com/u/22649926?s=400&u=939488a2c5a3d0a93a6c79f484d8419bd1229644&v=4" alt="Hantonny Korrea" />
                  <strong>Hantonny Korrea</strong>
                </div>
              </span>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:30
                <div>
                  <img src="https://avatars.githubusercontent.com/u/22649926?s=400&u=939488a2c5a3d0a93a6c79f484d8419bd1229644&v=4" alt="Hantonny Korrea" />
                  <strong>Hantonny Korrea</strong>
                </div>
              </span>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container >
  );
};

export default Dashboard;
