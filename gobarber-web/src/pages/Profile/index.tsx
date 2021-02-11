import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiCamera, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../Utils/getValidationErros'
import api from '../../services/api'
import { Container, Content, AvatarInput } from './styles'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

interface ProfileFormData {
    name: string,
    email: string,
    password: string,
}

const Profile: React.FC = () => {

    const history = useHistory()

    const { addToast } = useToast()

    const formRef = useRef<FormHandles>(null)

    console.log(formRef)

    const { user, updateUser } = useAuth()

    const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) {
        const data = new FormData()

        data.append('avatar', e.target.files[0])

        api.patch('/users/avatar', data).then(response => {

          updateUser(response.data)

          addToast({
            type: 'success',
            title: 'Avatar Atualizado'
          }) 
        })
      }
    },[addToast, updateUser])

    const handleSubmit = useCallback(async (data: ProfileFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = yup.object().shape({
                name: yup.string().required('Nome obrigatório'),
                email: yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: yup.string().min(6, 'No mínimo 6 dígitos')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data)

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu Logon no Gobarber'
            })

            history.push('/')

        } catch (err) {
            console.log(err)

            if (err instanceof yup.ValidationError) {
                const errors = getValidationErros(err)

                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer Cadastro, tente novamente.'
            })
        }
    }, [addToast, history])

    return (
        <Container>
            <header>
              <div>
                <Link to="dashboard" >
                  <FiArrowLeft />
                </Link>
              </div>
            </header>
            <Content>
                <Form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  initialData={{
                    name: user.name,
                    email: user.email
                  }}
                >
                    <AvatarInput>
                        <img 
                          // src={user.avatar_url} 
                          src='https://avatars.githubusercontent.com/u/28275815?s=460&u=07b68060e0c143581888029bef65ac1496406262&v=4'
                          alt={user.name}
                        />
                        <label htmlFor="avatar" >
                          <FiCamera />
                          <input type="file" id="avatar" onChange={handleAvatarChange} />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input name="name" placeholder="Nome" icon={FiUser} />
                    <Input name="email" placeholder="E-mail" icon={FiMail} />
                    
                    <Input 
                      containerStyle={{ marginTop: 24 }}
                      name="old_password" 
                      icon={FiLock} 
                      type="password" 
                      placeholder="Senha Atual" 
                    />

                    <Input 
                      name="password" 
                      icon={FiLock} 
                      type="password" 
                      placeholder="Senha Atual" 
                    />

                    <Input 
                      name="password_confirmation" 
                      icon={FiLock} 
                      type="password" 
                      placeholder="Confirmar senha" 
                    />

                    <Button type="submit">Confirmar mudanças</Button>

                </Form>
            </Content>
        </Container>
    )
}

export default Profile