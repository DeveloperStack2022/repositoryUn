import UserDetail from './components/felicitaciones_details';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {FindManyCursosPersonasWhere,FindManyPersonasCountRelations} from 'src/graphql/cursos'
import {FelicitacionesManyForId} from 'src/graphql/Felicitaciones'

const ByUser = () => {
  const {id} = useParams()
  const {data:DataPersonas,loading: LoadingPersonas} = useQuery(FelicitacionesManyForId,{
    variables:{
      "where": {
        "personaId": {
          "equals":  parseInt(id)
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
  }, [])
  

  return (
    <>
      <UserDetail data={DataPersonas?.findManyFelecitaciones} data_count={DataCount?.findManyPersonas} loading_data_count={LoadingDataCount} loading={LoadingPersonas} />
    </>
  );
};

export default ByUser;
