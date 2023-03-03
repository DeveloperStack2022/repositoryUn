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
            Cursos {
                nombre_curso
                lugar
                fecha_inicio
                fecha_final
                tipo
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
            Cursos {
                Cursos {
                    nombre_curso
                    lugar
                    fecha_inicio
                    fecha_final
                    tipo
                }
            }
            _count {
                Cursos
            }
        }
    }
`

export const  FindManyCursosPersonasWhere = gql`
    query FindManyCursosPersonas($where: CursosPersonasWhereInput) {
        findManyCursosPersonas(where: $where) {
            Cursos {
                nombre_curso
                fecha_inicio
                fecha_final
            }
            Personas {
                gradoPolicial
                nombres
                apellidos
            }
        }
    }

`
export const FindManyPersonasCountRelations  = gql`
    query FindManyPersonas($where: PersonasWhereInput) {
        findManyPersonas(where: $where) {
            _count {
            invitaciones
            Felecitaciones
            Cursos
            }
        }
    }
`

export const FindManyCursosPersonasFilterFecha = gql`
    query FindManyCursosPersonas($where: CursosPersonasWhereInput) {
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