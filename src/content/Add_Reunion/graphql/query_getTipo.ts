import {gql} from '@apollo/client'

export type TipoReunionT = {
  tipoReunions:[
    {
      id:number,
      tipo_reunion:string
    }
  ]
}
export type Tipo_RST = {
  tipo_RS:[{
    id:number,
    tipo_reunion:string
  }]
}
export const TipoReunion = gql`
query TipoReunion {
    tipoReunions {
      id
      tipo_reunion
    }
  }
`

export const Tipo_RS = gql`
  query Tipo_RS {
    tipo_RS {
      tipo_reunion
      id
    }
  }
`