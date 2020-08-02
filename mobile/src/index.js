import React,{ useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {

    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        api.get('projects').then( response => {
            console.log(response.data)
            setProjects(response.data)
        })
    },[])

    async function handleAddProject() {
        const response = await api.post('projects' , {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Matheus Baron'
        })  

        const project = response.data

        setProjects([ ...projects, project ])

    }

    return (
        <SafeAreaView style={styles.container}  >
            <FlatList 
                data={projects} 
                keyExtractor={project => project.id}
                renderItem={( { item } ) => (
                    <Text style={styles.project} > {item.title} </Text>
                )}
            />
        
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={handleAddProject} >
            <Text style={styles.buttonText} >Adicionar Projeto</Text>
        </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#7159c1',
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    project: {
        color: '#FFF',
        fontSize:20, 
    },

    button: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        height: 50,
        margin: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,

    },
})