import * as React from 'react';
import WatchListRow from './WatchListRow';
import { useQuery, gql } from '@apollo/client';
import { GET_DATA, TemasData } from '../../../types';
import { useAppSelector } from '../../../hooks/redux';

//Custom Components
import { Combox } from '../../../components/InputSearch';
import { TableTemas } from '../../../components/Table';
import TableTema from '../../../components/TableTema';
import { CardDropDown } from './Components/CardDropDown';

const GET_NUMERO_INVITACIONES = gql`
  query FindManyPersonas {
    findManyPersonas {
      id
      gradoPolicial
      nombres
      apellidos
      _count {
        invitaciones
      }
    }
  }
`;

const GET_TEMA_TEXT = gql`
  query Tema_Rutas {
    tema_Rutas {
      id
      tema_text
    }
  }
`;

const GET_TEMA_WITH_INVITACION = gql`
  query Tema_Ruta($where: Tema_RutaWhereUniqueInput!) {
    tema_Ruta(where: $where) {
      invitacion {
        lugar
        TipoReunion {
          tipo_reunion
        }
        personas {
          Personas {
            gradoPolicial
            nombres
            apellidos
          }
        }
      }
    }
  }
`;

const GET_TEMAS_WITH_INVITACION_PERSONAS = gql`
  query Tema_Rutas {
    tema_Rutas {
      tema_text
      invitacion {
        lugar
        TipoReunion {
          tipo_reunion
        }
        personas {
          Personas {
            gradoPolicial
            nombres
            apellidos
          }
        }
      }
    }
  }
`;
type ReunionData = {
  tema_text: string;
  lugar: [{ lugar: string }];
  tipo_reuinion: [{ tipo_reuinion: string }];
  personas: Persona[];
};
type Persona = {
  gradoPolicial: string;
  nombres: string;
  apellidos: string;
};

const serializeData = function (data: any) {
  return data.tema_Rutas.map((e, index): ReunionData => {
    const tema_text = e.tema_text;
    const lugar = e.invitacion.map((i) => {
      return { lugar: i.lugar };
    });
    const tipo_reuinion = e.invitacion.map((i) => {
      return { tipo_reuinion: i.TipoReunion.tipo_reunion };
    });
    const personas = e.invitacion.map((i) => {
      let valor = i.personas.map((elem): Persona => {
        return {
          gradoPolicial: elem.Personas.gradoPolicial,
          nombres: elem.Personas.nombres,
          apellidos: elem.Personas.apellidos
        };
      });
      return valor;
    });
    return {
      lugar,
      tema_text,
      tipo_reuinion,
      personas
    };
  });
};

function WatchList() {
  const [OneTema, setOneTema] = React.useState<any>();
  const [TemasSerialize, setTemasSerialize] = React.useState<any[]>([]);
  const { id } = useAppSelector((state) => state.tema);
  const { loading, data, error } = useQuery<GET_DATA>(GET_NUMERO_INVITACIONES);
  const dataQuery = useQuery<TemasData>(GET_TEMA_TEXT);

  const getTemaQuery = useQuery(GET_TEMA_WITH_INVITACION, {
    variables: {
      where: {
        id: !id ? 1 : id
      }
    }
  });
  const getTemasQuery = useQuery(GET_TEMAS_WITH_INVITACION_PERSONAS);
  let datosTemas = [];

  React.useEffect(() => {
    if (getTemasQuery.loading == false) {
      datosTemas = serializeData(getTemasQuery.data);
      setTemasSerialize(datosTemas);
    }
  }, [getTemasQuery.loading]);
  return (
    <>
      <WatchListRow dataOneUser={data} loading={loading} />
      <Combox
        loadingTemas={dataQuery.loading}
        errorTemas={dataQuery.error}
        dataTemas={dataQuery.data}
      />
      {!id ? (
        <>
          {' '}
          <TableTema
            data_props={getTemasQuery.data}
            data_temas={TemasSerialize}
            loading={getTemasQuery.loading}
          />{' '}
        </>
      ) : (
        <TableTemas
          temas={false}
          data={getTemaQuery.data}
          loading={getTemaQuery.loading}
          error={getTemaQuery.error}
        />
      )}

      {/* <CardDropDown nombres='Tnt. Milton Jimenez' />
    <CardDropDown nombres='Tnt. Milton Jimenez' />
    <CardDropDown nombres='Tnt. Milton Jimenez' /> */}
    </>
  );
}

export default WatchList;
