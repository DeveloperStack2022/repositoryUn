import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './table_header'
import TableRow from './table_row'

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});
interface IProps {
    items:any[]
}
const Table = ({items}:IProps) => (
    <View style={styles.tableContainer}>
        <TableHeader />
        <TableRow items={items} />
    </View>
)

export default Table;