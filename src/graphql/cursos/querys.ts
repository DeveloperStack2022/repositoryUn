import {gql} from '@apollo/client'

export const findManyCursosPersonas = gql`
    query Personas($where: CursosPersonasWhereInput) {
        findManyCursosPersonas(where: $where) {
            Personas {
                gradoPolicial
                nombres
                apellidos
                id
            }
        }
    }
`

export const findManyPersonas = gql`
    query _count {
        findManyPersonas {
            gradoPolicial
            nombres
            apellidos
            _count {
                Cursos
            }
        }
    }
`