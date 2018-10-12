import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
// import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import {I18n} from "../../../language/i18n";

export default class transactionRecord extends React.Component {
    _renderListItem = (data) => {
        return (
            <View style={styles.perRecordItem}>
                <View style={styles.perItemFloor1}>
                    <Text style={styles.floor1LeftTxt}>{data.title}</Text>
                    <View style={styles.flexRow}>
                        <Text style={styles.floor1RightTxt}>{data.value}</Text>
                        <Text style={styles.floor1RightTxt}>SIGM</Text>
                    </View>
                </View>
                <Text style={styles.dateTxt}>{data.date}</Text>
            </View>
        );
    }
    render() {
        // const list = new Array(5).fill({
        //     title: '主账户—提取',
        //     date: '今天 09：45',
        //     value: '30086.332'
        // });
        const list = [];
        return (
            <View style={styles.container}>
                {
                    !!list.length
                        ? list.map(data => this._renderListItem(data))
                        : <View style={styles.noRecordPage}>
                            <Image style={styles.noRecordImg} source={require('../../assets/images/sigm/no_record.png')}/>
                            <Text>{I18n.t('sigm.accountDetail.transactionRecordPart.noRecord')}</Text>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
        alignItems: 'center',
    },
    noRecordPage: {
        alignItems: 'center',
    },
    noRecordImg: {
        width: scaleSize(120),
        height: scaleSize(160),
        marginBottom: scaleSize(20),
        marginTop: Dimensions.get('window').height / 2 - scaleSize(88) - scaleSize(220)
    },
    noRecordTxt: {
        color: '#E8E8E8',
        fontSize: scaleSize(28),
    },
    perRecordItem: {
        width: scaleSize(670),
        height: scaleSize(110),
        borderTopWidth: scaleSize(1),
        borderTopColor: 'rgba(155, 155, 155, 0.4)',
        paddingTop: scaleSize(16),
        paddingRight: scaleSize(38),
        paddingLeft: scaleSize(38),
    },
    perItemFloor1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floor1LeftTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(28),
    },
    floor1RightTxt: {
        color: '#D0021B',
        fontSize: scaleSize(28),
    },
    dateTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
    }
});
