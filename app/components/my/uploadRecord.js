/**
 * 我的 -> 数据上传记录
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class UploadRecord extends Component {
    // 渲染每个记录模块
    _renderRecord = (data, index) => {
        return (
            <View key={index} style={styles.record}>
                <View>
                    <Text style={styles.recordTitle}>{data.title}</Text>
                    <Text style={styles.recordDate}>{data.date}</Text>
                </View>
                <Text style={styles.recordSigm}>{data.sigm}</Text>
            </View>
        );
    }
    render() {
        // const list = new Array(14).fill({
        //     title: '驾驶时长',
        //     sigm: '+5 SIGM',
        //     date: '今天 09：45',
        // });
        // 数据上传记录点进去空白页，就是先空白页面
        const list = [];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        list.length
                            ? list.map((data, index) => this._renderRecord(data, index))
                            : <View style={styles.noRecordPage}>
                                <Image style={styles.noRecordImg} source={require('../../assets/images/my/no_record.png')}/>
                                <Text style={styles.noRecordTxt}>{I18n.t('my.noRecord')}</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        minHeight: Dimensions.get('window').height - scaleSize(128),
        paddingTop: scaleSize(40),
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
    record: {
        width: scaleSize(638),
        height: scaleSize(110),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: 'rgba(155, 155, 155, .4)',
    },
    recordTitle: {
        color: '#4A4A4A',
        fontSize: scaleSize(28),
    },
    recordDate: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
    },
    recordSigm: {
        color: '#D0021B',
        fontSize: scaleSize(28),
        marginTop: scaleSize(-10),
    }
});