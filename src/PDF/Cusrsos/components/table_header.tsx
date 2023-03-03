import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    nombre_persona: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    nombre_curso: {
        width: '35%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    lugar: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    fechas: {
        width: '15%',
    },
})

const TableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.nombre_persona}>Nombre Policia</Text>
        <Text style={styles.nombre_curso}>Nombre Curso</Text>
        <Text style={styles.lugar}>Lugar</Text>
        <Text style={styles.fechas}>Fechas</Text>
    </View>
)

export default TableHeader;