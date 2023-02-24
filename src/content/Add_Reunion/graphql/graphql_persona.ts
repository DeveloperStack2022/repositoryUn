import {gql} from '@apollo/client'
export type createOnePersonasT = {
    data:{
        gradoPolicial:string;
        nombres:string;
        apellidos:string;
    }
}
export const createOnePersonas = gql`
    mutation CreateOnePersonas($data: PersonasCreateInput!) {
        createOnePersonas(data: $data) {
        id
        }
    }
`
export const findManyPersonas = gql`
    query Query {
        findManyPersonas {
            gradoPolicial
            nombres
            apellidos
            id
        }
    }
  `