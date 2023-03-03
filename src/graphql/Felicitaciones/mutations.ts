import {gql} from '@apollo/client'

export const createFelicitacion = gql`
    mutation CreateOneFelecitaciones($data: FelecitacionesCreateInput!) {
        createOneFelecitaciones(data: $data) {
            causa
            tipo
        }
    }
`