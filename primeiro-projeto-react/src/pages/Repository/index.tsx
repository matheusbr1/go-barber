import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles'
import LogoImg from '../../assets/logo.svg'

interface RepositoryParams {
    repository: string
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>()

    return (
        <>
            <Header>
                <img src={LogoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                     Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/28275815?v=4" alt="be-the-hero" />
                    <div>
                        <strong>matheusbr/be-the-hero</strong>
                        <p>This is an application built in the course of Rocketseat</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1800</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to='fdsfsadfsa' >
                    <div>
                        <strong>fsdafsad</strong>
                        <p>fdsafdsa</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    )
}

export default Repository