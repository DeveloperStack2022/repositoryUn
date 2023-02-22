import {gql} from '@apollo/client'
export const Tema_Rutas = gql`
    query Tema_Rutas {
        tema_Rutas {
            tema_text
            id
        }
  }`