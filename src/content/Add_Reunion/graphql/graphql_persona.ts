import {gql} from '@apollo/client'
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