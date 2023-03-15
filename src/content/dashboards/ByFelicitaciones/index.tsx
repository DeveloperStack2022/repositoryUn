import UserDetail from './components/felicitaciones_details';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {FindManyCursosPersonasWhere,FindManyPersonasCountRelations} from 'src/graphql/cursos'

const ByUser = () => {
  const {id} = useParams()
  const {data:DataPersonas,loading: LoadingPersonas} = useQuery(FindManyCursosPersonasWhere,{
    variables:{
      "where": {
        "personasId": {
          "equals": parseInt(id)
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
      <UserDetail data={DataPersonas?.findManyCursosPersonas} data_count={DataCount?.findManyPersonas} loading_data_count={LoadingDataCount} loading={LoadingPersonas} />
    </>
  );
};

export default ByUser;
