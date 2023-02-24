import {gql} from '@apollo/client'

export type CreateOneCursosT = {
    data:{
        nombre_curso:string;
        lugar:string;
        fecha_inicio:string,
        fecha_final: string,
        Tipo:{
            connect:{
                id: number
            }
        }
    }
}

export type CreateOneCursosPersonasVariablesT = {
    data:{
        Cursos:{
            connect:{
                id:number
            }
        },
        Personas:{
            connect:{
                id:number
            }
        },
        assignedBy:string
    }
}

export const CreateOneCursos = gql`
    mutation CreateOneCursos($data: CursosCreateInput!) {
        createOneCursos(data: $data) {
            id
        }
    }
`

export const CreateOneCursosPersonas = gql`
    mutation CreateOneCursosPersonas($data: CursosPersonasCreateInput!) {
        createOneCursosPersonas(data: $data) {
            personasId
            cursosId
        }
    }
`

