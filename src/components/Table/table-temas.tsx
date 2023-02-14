import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'


type DataType = {
  lugar:string,
    TipoReunion:{
      tipo_reunion:string;
    },
  personas:[
    {
      Personas:{
        gradoPolicial:string;
        nombres:string;
        apellidos:string;
      }
  }]
}

interface IPropsComponent {
  data:{
    tema_Ruta?:{
      invitacion:[
        DataType
      ],
    },
    tema_Rutas?:[
      {
      invitacion:[
        DataType
      ],
    }
  ]
  }
  error:any;
  loading:boolean
  temas:boolean;
}



export const TableTemas:React.FC<IPropsComponent> = ({error,loading,data,temas}) => {
    return (
      <>
      {!loading ? (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:{
                  xs:"12px",
                  sm:"12px",
                  md:"14px"
                }}}>Lugar</TableCell>
              <TableCell align="right" sx={{fontSize:{
                  xs:"12px",
                  sm:"12px",
                  md:"14px"
                }}}>Tipo Reunion</TableCell>
              <TableCell align="right" sx={{fontSize:{
                  xs:"12px",
                  sm:"12px",
                  md:"14px"
                }}}>Persona</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
                {temas ? (
                  <>
                    {data.tema_Rutas.map((row:any,index) => (
                                <TableRow
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                   <TableCell 
                                  sx={{fontSize:{
                                    xs:"12px",
                                    sm:"12px",
                                    md:"14px"
                                  }}} >
                                    {row.tema_text}
                                  </TableCell>
                                  {row.invitacion.map((elem,index) => (
                                   <TableCell
                                   key={index} 
                                      sx={{fontSize:{
                                        xs:"12px",
                                        sm:"12px",
                                        md:"14px"
                                      }}} >
                                    {elem.lugar}
                                   </TableCell>
                                    ))}
                                 
                                </TableRow>
                              ))}
                  </>
                ) : (
                  <>
                  {data.tema_Ruta.invitacion.map((row:DataType,index) => (
                                <TableRow
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell 
                                  sx={{fontSize:{
                                    xs:"12px",
                                    sm:"12px",
                                    md:"14px"
                                  }}} >
                                    {row.lugar}
                                  </TableCell>
                                  <TableCell sx={{fontSize:{
                                    xs:"12px",
                                    sm:"12px",
                                    md:"14px"
                                  }}} align="right">{row.TipoReunion.tipo_reunion}</TableCell>
                                  <TableCell align="right"  >
                                  {row.personas.map(element => <Typography key={element.Personas.apellidos} sx={{fontSize:{
                                    xs:"12px",
                                    sm:"12px",
                                    md:"14px"
                                  }}} > {element.Personas.gradoPolicial}. {element.Personas.nombres} {element.Personas.apellidos}</Typography>  )}
                                  </TableCell>
                                </TableRow>
                              ))}
                  </>
                )}
            </>
            {/* {tema_Ruta.invitacion} */}
           
          </TableBody>
        </Table>
         
      </TableContainer>
      ): "loading..."}
      </>
    )
}