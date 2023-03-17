import {gql} from '@apollo/client'


export const FelicitacionesManyForId = gql`
query FindManyFelecitaciones($where: FelecitacionesWhereInput) {
  findManyFelecitaciones(where: $where) {
    id
    causa
    tipo
    fecha
  }
}
`

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

export const PersonasFelicitaciones = gql`
  query _count{
    findManyPersonas {
      gradoPolicial
      nombres
      apellidos
      Felecitaciones {
        tipo
        causa
        fecha
      }
      _count {
        Felecitaciones
      }
    }
  }
`

export const PersonasF = gql`
  query FindManyPersonas($where: FelecitacionesWhereInput) {
    findManyPersonas {
      id
      gradoPolicial
      nombres
      apellidos
      _count {
        Felecitaciones
      }
      Felecitaciones(where: $where) {
        id
      }
    }
  }
`