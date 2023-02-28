import {gql} from '@apollo/client'

export const CreatePersonasOnInvitacion = gql`
  mutation CreateOnePersonasOnInvitacion($data: PersonasOnInvitacionCreateInput!) {
    createOnePersonasOnInvitacion(data: $data) {
      Invitacion {
        N_Documento
        F_Recepcion
      }
    }
  }
`