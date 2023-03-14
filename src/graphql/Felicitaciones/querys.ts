import {gql} from '@apollo/client'

export const getFelicitacionesForDates = gql`
query Personas($where: FelecitacionesWhereInput) {
    findManyFelecitaciones(where: $where) {
      personas {
        gradoPolicial
        nombres
        apellidos
        id
      }
    }
  }
`