import {gql} from '@apollo/client'
export type createOnePersonasT = {
    data:{
        gradoPolicial:string;
        nombres:string;
        apellidos:string;
    }
}

export type findManyPersonasT = {
    findManyPersonas:[{
        gradoPolicial:string;
        nombres:string
        apellidos:string;
        id:number;
    }]
}
export const createOnePersonas = gql`
    mutation CreateOnePersonas($data: PersonasCreateInput!) {
        createOnePersonas(data: $data) {
        id
        }
    }
`
export const findManyPersonas = gql`
    query FindManyPersonas {
        findManyPersonas {
            gradoPolicial
            nombres
            apellidos
            id
        }
    }
  `