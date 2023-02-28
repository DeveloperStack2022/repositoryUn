import ReunionDetail  from './components/reunion_details'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useQuery} from '@apollo/client'

import {PersonasOnInvitacionsQuery} from 'src/graphql/Reuniones'
import {FindManyCursosPersonasWhere,FindManyPersonasCountRelations} from 'src/graphql/cursos'

const ReunionesContent = () => {
    const {id} = useParams()
    
    const {loading: LoadingQuery,data:DataQuery} = useQuery(PersonasOnInvitacionsQuery,{
        variables:{
            "where": {
                "Personas": {
                    "is": {
                        "id": {
                            "equals": parseInt(id)
                        }
                    }
                }
            }
        }
    })
    const {data: DataCount,loading: LoadingDataCount} = useQuery(FindManyPersonasCountRelations,{
        variables:{
          "where": {
            "id": {
              "equals":parseInt(id)
            }
          }
        }
      })

    useEffect(() => {
        console.log(id)
      return () => {}
    }, [id])
    
    return (
        <>
            <ReunionDetail loading={LoadingQuery
            } loading_data_count={LoadingDataCount}  data={DataQuery?.personasOnInvitacions} data_count={DataCount?.findManyPersonas} />
        </>
    )
}
export default ReunionesContent