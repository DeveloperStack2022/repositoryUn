import {gql} from '@apollo/client'
export type createOneTema_RutaT = {
    data:{
        tema_text:string
    }
}
export const createOneTema_Ruta = gql`
    mutation Mutation($data: Tema_RutaCreateInput!) {
        createOneTema_Ruta(data: $data) {
            id
            tema_text
        }
    }
`
export const Tema_Rutas = gql`
    query Tema_Rutas {
        tema_Rutas {
            tema_text
            id
        }
  }`