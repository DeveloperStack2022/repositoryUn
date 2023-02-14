import * as React from 'react'
import './index.css'
import {TableContainer,Table,TableHead,TableCell,TableRow,TableBody,Card,Typography,Divider,Tooltip,Fade} from '@mui/material'

type Reuniones = {
    tema_text:string;
    invitacion:[
        {
            lugark:string;
            TipoReuinion:{
                tipo_reunion:string;
            },
            personas:[{
                Personas:{
                    gradoPolicial:string;
                    nombres:string;
                    apellidos:string;
                }
            }]
        }
    ]
}

type ReunionData = {
    tema_text:string;
    lugar:[{lugar:string}];
    tipo_reuinion:[{tipo_reuinion:string}];
    personas:[[
      {
      apellidos:string;
      gradoPolicial:string;
      nombres:string;
    }
    ]]
}

type Persona = {
  gradoPolicial:string;
  nombres:string;
  apellidos:string;
}

import {
  GroupingState,
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'

interface IPropsComponent {
    data_props:Reuniones[],
    loading: boolean | undefined;
    data_temas:ReunionData[]
}
const columnHelper = createColumnHelper<ReunionData>();
const App:React.FC<IPropsComponent> = ({data_props,loading,data_temas}) => {
  const columns = [
    columnHelper.group({
      header:"Reunion",
      columns:[
        columnHelper.accessor('tema_text',{
          header: 'Tema Reunion',
          cell: info => info.getValue()
        })
      ]
    }),
    columnHelper.group({
      header:"Invitacion",
      columns: [
        columnHelper.accessor(row => row.lugar.map((elem,index:number) => elem.lugar),{
          header: "lugar",
          cell: info => {
            return info.row.original.lugar.map((e,i) => {
              return (
                <>
                <Typography  key={i}>{e.lugar}</Typography>
                <Divider />
                </>
              )
            })
          }
        }), 
        columnHelper.accessor(row => row.tipo_reuinion.map((elm,index) => elm.tipo_reuinion),{
          header: "tipo",
         cell: info => {
            return info.row.original.tipo_reuinion.map((e,i) => {
              return (
                <>
                  <Typography  key={i}>{e.tipo_reuinion}</Typography>
                  <Divider />
                </>
              )
            })
          }
        }),
        columnHelper.accessor(row => row.personas.map((elm,index) => `personas.${index}`), {
          header:"Personas",
          cell: info => {
            return info.row.original.personas.map((e,i) => {
             return e.map((elemento,iterador) => {
               return (
                 <>
                 <Tooltip  TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={`${elemento.gradoPolicial} ${elemento.nombres} ${elemento.apellidos}`} >
                  <Typography  key={iterador} sx={{"&:hover":{
                    color: (theme) => `${theme.palette.primary.main}`,
                  }}} >{elemento.gradoPolicial} {elemento.nombres} {elemento.apellidos.charAt(0)}</Typography>
                 </Tooltip>
                  <Divider />
                 </>
               )
             })
            })
          }
        })
      ]
    })
  ]

  const [data, setData] = React.useState([...data_temas])
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const table = useReactTable({
    data,
    columns: columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(), 
  })
  React.useEffect(() => {
    setData([...data_temas])
    return () => {}
  }, [data_temas])
  
  

  return (
    <Card>
    <TableContainer >
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableCell key={header.id} colSpan={header.colSpan} align='center' size="small">
                    {header.isPlaceholder ? null : (
                      <>
                        {header.column.getCanGroup() ? (
                         <></>
                        ) : null}{' '}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
            {table.getRowModel().rows.map(row => {
                return(
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <TableCell  key={cell.id}>
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

export default  App;