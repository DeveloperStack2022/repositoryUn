import {gql} from '@apollo/client'

export const CreatePersonasOnInvitacion = gql`
mutation CreatePersonasOnInvitacion($personaId: Float!, $invitacionId: Float!) {
    createPersonasOnInvitacion(personaId: $personaId, invitacionId: $invitacionId) {
      Personas {
        gradoPolicial
        nombres
        apellidos
      }
    }
  }
`