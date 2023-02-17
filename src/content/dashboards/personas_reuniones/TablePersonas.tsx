import * as React from 'react'
import {Table,TableContainer,TableCell,TableBody,TableHead,TableRow,Typography,Divider,Card,CardHeader} from '@mui/material'

import {gql,useQuery} from '@apollo/client'
import {
  GroupingState,
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'

type PersonaInfo = {
    gradoPolicial:string;
    nombres:string;
    apellidos:string;
    invitaciones:[{
        Invitacion:{
            tema_ruta:{
                tema_text:string;
            },
            lugar:string;
            TipoReunion:{
                tipo_reunion:string;
            }
        }
    }]
}

type PersonaModel = {
    gradoPolicial:string;
    nombres:string;
    apellidos:string;
    tema_text:string[]
    lugar:string[]
    tipo_reunion:string[]
}

// const GET_PERSONAS_INVITACION = gql`
//     query FindManyPersonas {
//     findManyPersonas {
//         gradoPolicial
//         nombres
//         apellidos
//         invitaciones {
//             Invitacion {
//                 tema_ruta {
//                     tema_text
//                 }
//                 lugar
//                 TipoReunion {
//                     tipo_reunion
//                 }
//             }
//         }
//     }
//     }
// `

function SerializeData(data:PersonaInfo[]) {
    return data.map((element) => {
        let tema_text = element.invitaciones.map(elem => elem.Invitacion.tema_ruta.tema_text)
        let lugar = element.invitaciones.map(elem => elem.Invitacion.lugar)
        let tipo_reunion = element.invitaciones.map(elem => elem.Invitacion.TipoReunion.tipo_reunion)
        return {
            nombres:element.nombres,
            apellidos: element.apellidos,
            gradoPolicial: element.gradoPolicial,
            tema_text,
            lugar,
            tipo_reunion
        }
    })
}

const columnHelper = createColumnHelper<PersonaModel>();
export const PersonasTable = () => {
    // const {loading,data,error} =  useQuery(GET_PERSONAS_INVITACION)
    const [dataInformation, setData] = React.useState<any[]>([])
   
    // React.useEffect(() => {
    //     if(loading == false){
    //         let {findManyPersonas} = data;
    //         let datos_ = SerializeData(findManyPersonas)
    //         console.log(datos_)
    //         setData([...datos_])
    //     }
    // },[loading])
    
    const [grouping, setGrouping] = React.useState<GroupingState>([])
    const columns = [
        columnHelper.group({
            header: "Persona",
            columns:[
                columnHelper.accessor(row => `${row.gradoPolicial} ${row.nombres} ${row.apellidos}`,{
                    header:"nombres",
                    cell: info => info.getValue()
                })
            ]
        }),
        columnHelper.group({
            header:"Reuniones",
            columns:[
                columnHelper.accessor(row => row.tema_text.map((elem) => elem),{
                    header:"Tema",
                    cell: info => info.row.original.tema_text.map((e,index) => {
                        return (
                            <>
                            <Typography variant={"body1"}  key={index}>
                                {e}{e.endsWith('.') ? null :"." }
                            </Typography>
                            <Divider />
                            </>
                        )
                    })
                }),
                columnHelper.accessor(row => row.lugar.map((elem,index) => elem),{
                    header: 'Lugar',
                    cell: info => info.row.original.lugar.map((e,i) => {
                        return (
                            <>
                            <Typography variant={"body1"} key={i}>{e}</Typography>
                            <Divider/>
                            </>
                        )
                    } )
                }),
                columnHelper.accessor(row => row.tipo_reunion.map((elem) => elem),{
                    header:"Tipo",
                    cell: info => info.row.original.tipo_reunion.map((e,index) => {
                        return (
                            <>
                            <Typography variant={"body1"}  key={index}>{e}</Typography>
                             <Divider/>
                            </>
                        )
                    })
                })
            ]
        })
    ]

    const table = useReactTable({
    data:dataInformation,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(), 
  })
    
    return (
        <Card sx={{mt:"2rem"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(element =>(
                            <TableRow  key={element.id}>
                                {element.headers.map(header => {
                                    return (
                                    <TableCell key={header.id} colSpan={header.colSpan} align="center" size="small">{
                                        header.isPlaceholder ? null : (
                                            <>
                                                {flexRender(header.column.columnDef.header,header.getContext()
                            )}
                                            </>
                                        )
                                    }</TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell,cell.getContext())}   
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}