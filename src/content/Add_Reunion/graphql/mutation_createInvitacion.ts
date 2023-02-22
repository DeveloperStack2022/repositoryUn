import {gql} from '@apollo/client'

export const CreateOneInvitacion = gql`
    mutation CreateOneInvitacion($data: InvitacionCreateInput!) {
        createOneInvitacion(data: $data) {
            id
        }
    }
`