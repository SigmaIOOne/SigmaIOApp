/**
 * 产品表格
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { scaleSize } from '../../utils/ScreenUtil';

export default class productDetailTable extends Component {
    _renderRow = (columnsWidth, row, index) => {
        return (
            <View key={index} style={styles.row}>
                {
                    row.map((column, columnIndex) =>
                        <Text key={columnIndex} style={[styles.column, {width: columnsWidth[columnIndex]}]}>{column}</Text>
                    )
                }
            </View>
        )
    }
    render() {
        const { tableData } = this.props;
        const { columnsWidth, data } = tableData;
        return (
            <View style={styles.container}>
                {
                    data.map((row, index) => this._renderRow(columnsWidth, row, index))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: scaleSize(666),
        borderTopWidth: scaleSize(1),
        borderTopColor: '#9B9B9B',
        borderLeftWidth: scaleSize(1),
        borderLeftColor: '#9B9B9B',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        color: '#9B9B9B',
        fontSize: scaleSize(28),
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: scaleSize(10),
        paddingBottom: scaleSize(10),
        paddingLeft: scaleSize(2),
        paddingRight: scaleSize(2),
        borderRightWidth: scaleSize(1),
        borderRightColor: '#9B9B9B',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#9B9B9B',
    }
});