import {gql} from '@apollo/client'

export const personasOnInvitacions = gql`
    query PersonasOnInvitacions($where: PersonasOnInvitacionWhereInput) {
        personasOnInvitacions(where: $where) {
            Personas {
                id
                gradoPolicial
                nombres
                apellidos
            }
        }
    }
` 

export const CountReunionesQuery = gql`
   query FindManyPersonas {
        findManyPersonas {
            id
            gradoPolicial
            nombres
            apellidos
            _count {
                invitaciones
                
            }
        }
    }
`

export const PersonasOnInvitacionsQuery = gql`
    query PersonasOnInvitacions($where: PersonasOnInvitacionWhereInput) {
        personasOnInvitacions(where: $where) {
            Personas {
                gradoPolicial
                nombres
                apellidos
            }
            
            Invitacion {
                tema_ruta {
                    tema_text
                }
                TipoReunion {
                 tipo_reunion
                }
            fecha_real
            }
        }
    }
`