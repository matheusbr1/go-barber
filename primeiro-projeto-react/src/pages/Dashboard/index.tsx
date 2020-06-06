import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import { Title, Form, Repositories, Error } from './styles'
import LogoImg from '../../assets/logo.svg'

interface Repository {
    html_url: string;
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if (storageRepositories) {
            return JSON.parse(storageRepositories)
        } else {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories)
        )
    }, [repositories])

    async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        if (!newRepo) {
            return setInputError('Digite autor/nome do repositório')
        }

        try {

            var response = await api.get(`repos/${newRepo}`)
            const repository = response.data

            setInputError('')

            setRepositories([...repositories, repository])

            setNewRepo('')

        } catch (error) {
            setInputError('Erro na busca por esse repositório')
        }

    }

    return (
        <>
            <img src={LogoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository} >
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite autor/nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {
                    repositories.map(repository =>
                        (
                            <Link key={repository.full_name} to={`/repository/${repository.full_name}`} >
                                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                                <div>
                                    <strong>{repository.full_name}</strong>
                                    <p>{repository.description}</p>
                                </div>
                                <FiChevronRight size={20} />
                            </Link>
                        )
                    )
                }
            </Repositories>
        </>
    )
}

export default Dashboard