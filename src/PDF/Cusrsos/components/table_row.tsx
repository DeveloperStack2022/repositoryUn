import {} from 'react'
import {Text,View,StyleSheet} from '@react-pdf/renderer'

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        fontStyle: 'bold',
    },
    column:{
        flexDirection: 'column',
        fontStyle: 'bold',
        width:'35%'
    },
    colum_lugar:{
        flexDirection: 'column',
        fontStyle: 'bold',
        width:'15%'
    },
    nombre_persona: {   
        width:'35%',
        textAlign: 'left',
        paddingLeft: 8,
    },
    nombre_curso: {
        width:'100%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
        height:24
    },
    lugar: {
        width: '100%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
        borderBottomColor:'#bff0fd',
        borderBottomWidth: 1,
    },
    fechas: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
})

interface IProps {
    items: any[]
}

const ReporteTableRow = ({items}:IProps) => {
    const rows = items.map(item => (
        <View style={styles.row} key={item.id}>
            <Text style={styles.nombre_persona} >{item.nombre_personas}</Text>
            <View style={styles.column} >{item.cursos.map((ite,index) => (
                <Text style={styles.nombre_curso} key={index}>{ite.nombre_curso}</Text>
            ))} </View>
            <View  style={styles.colum_lugar}>
                {item.lugar.map((ite,index) => (
                    <Text style={styles.lugar} key={index}>{ite}</Text>
                ))}
            </View>
            <Text style={styles.fechas}>{item.fechas}</Text>
        </View>
    ))
    return <>{rows}</>
}

export default ReporteTableRow