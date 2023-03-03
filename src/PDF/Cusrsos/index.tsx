import {Document,Page,Text,StyleSheet,View} from '@react-pdf/renderer'
import Table from './components/table'



const borderColor = '#1F2937'
const borderColorLines = '#3B82F6'
const backgroundColor = '#86EFAC'
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:30,
        paddingRight:30,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    card:{
        borderWidth: 1,
        borderColor:borderColor,
        padding:10,
        borderRadius:4,
        marginBottom:'8px'
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:4
    },
    card_footer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    card_footer_content:{
        flexDirection: 'column',
        alignItems:'flex-end',
        marginTop:'10px',
        fontWeight:'bold',
        fontSize: '12pt',
        border:'1px solid #3B82F6',
        padding:'5px'
    },
    table_header:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
    },
    nombre_curso: {
        width: '45%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        height: 24
    },
    lugar: {
        width: '15%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        height: 24
    },
    asistencia: {
        width: '15%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        height: 24
    },
    fechas: {
        width: '25%',
    },
    row:{
        flexDirection: 'row',
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        borderLeftColor:'#bff0fd',
        borderLeftWidth:1,
        borderRightColor:'#bff0fd',
        borderRightWidth:1,
        alignItems: 'center',
        fontStyle: 'bold',
    },
    row_nombre_curso:{
        width:'45%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        textAlign: 'left',
        paddingRight: 2,
        paddingLeft:2,
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        height:24
    },
    row_lugar:{
        width:'15%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        textAlign: 'left',
        paddingRight: 2,
        paddingLeft:2,
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        height:24
    },
    row_asistencia:{
        width:'15%',
        borderRightColor: borderColorLines,
        borderRightWidth: 1,
        textAlign: 'left',
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        height:24,
        paddingRight: 2,
        paddingLeft:2,
    },
    row_fecha:{
        width:'25%',
        textAlign: 'left',
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        height:24,
        paddingRight: 2,
        paddingLeft:2,
    }
  });

interface IProps {
    data:any[]
}

const CursosPDFRender = ({data}:IProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                {data.map((elem,index) => (
                    <View style={styles.card} key={index}>
                    <View style={styles.card_header}>
                        <Text>{`${elem.grado}. ${elem.nombres} ${elem.apellidos}`}</Text>
                    </View>
                    {/* TODO: Table header */}
                    <View style={styles.table_header}>
                        <Text style={styles.nombre_curso}>Nombre curso</Text>
                        <Text style={styles.lugar}>Lugar</Text>
                        <Text style={styles.asistencia}>Asistencia</Text>
                        <Text style={styles.fechas}>Fecha</Text>
                    </View>
                    {/* TODO: Table Body */}
                    {elem.cursos.map((ite,index_ite) => (
                        <View style={styles.row} key={index_ite}>
                            <Text style={styles.row_nombre_curso}>{ite.nombre_curso}</Text>
                            <Text style={styles.row_lugar}>{ite.lugar}</Text>
                            <Text style={styles.row_asistencia}>{ite.tipo == 1 ? "PRECENCIAL" : "VIRTUAL"}</Text>
                            <Text style={styles.row_fecha}>2022-03-07/2022-04-01</Text>
                        </View>
                    ))}
                    {/* TODO: Table footer */}
                    {/* <View style={styles.card_footer}>
                        <View style={styles.card_footer_content}>
                            <Text>
                                cursos pendientes: 2
                            </Text>
                            <Text>
                                cursos completados: 0
                            </Text>
                            <Text>
                                cursos cursando: 1
                            </Text>
                            <Text>
                                Total de cursos: 3
                            </Text>
                        </View>
                    </View> */}
                </View>
                ))}
            </Page>
        </Document>
    )
}

export default CursosPDFRender