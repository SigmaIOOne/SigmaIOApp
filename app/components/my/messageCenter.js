/**
 * 我的 -> 消息中心
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
// import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class MessageCenter extends Component {
    _renderListItem = (data) => {
        return (
            <View style={styles.item}>
                <Text style={[styles.itemContent, data.success ? {} : styles.itemContentRed]}>{data.content}</Text>
                <Text style={styles.date}>{data.date}</Text>
            </View>
        );
    }
    render() {
        // const list = new Array({
        //     content: '主账户—提取 30086.332 SIGM',
        //     date: '07/11 09：45',
        //     success: true,
        // });
        // list.push(
        //     {
        //         content: '主账户—提取lalal哈哈哈哈拉好了啦好诶哈佛ihefodphoahaiehfieo哈哈哈哈活动诶回复 30086.332 SIGM',
        //         date: '07/11 09：45',
        //         success: false,
        //     },
        //     {
        //         content: '主账户—提取 30086.332 SIGM',
        //         date: '07/11 09：45',
        //         success: true,
        //     }
        // );
        const list = [];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        list.length
                            ? list.map(data => this._renderListItem(data))
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
        height: Dimensions.get('window').height,
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
    },
    item: {
        // height: scaleSize(104),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#9B9B9B',
    },
    itemContent: {
        maxWidth: scaleSize(500),
        color: '#4A4A4A',
        fontSize: scaleSize(28),
        marginTop: scaleSize(32),
        marginBottom: scaleSize(32),
    },
    itemContentRed: {
        color: '#D0021B'
    },
    date: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
        marginTop: scaleSize(4),
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
});