import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import './App.css'

import api from './services/api'

export default function App() {

    const [projects, setProjects] = useState([])

    // useState retorna um array com duas posições
    // 1 - Variável com o valor inicial
    // 2 - Função para atualizar esse valor

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject() {
        // setProjects([...projects, `New project ${Date.now()}`])

        const response = await api.post('/projects', {
            title: `New project ${Date.now()}`,
            owner: "Matheus Baron"
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return (
        <>
            <Header title={'Projects'} />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject} >Add project</button>

        </>
    )
}