/**
 * SIGM -> 挖矿账户 -> 获取算力 -> 绑定车辆信息
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class BindCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carId: '',
            carColor: '',
            engineId: '',
            carriageId: '',
            insuranceCompany: '',
            insuranceId: '',
            insurancePeople: '',
            insurancePeopleId: '',
            area: '',
        };
    }
    _renderList = (data) => {
        return (
            <View>
                <Text style={styles.listTips}>{I18n.t(data.tips)}</Text>
                { data.list.map((res, index) => this._renderListItem(res, index)) }
            </View>
        );
    }
    _renderListItem = (data, index) => {
        const value = this.state[data.val];
        return (
            <View style={styles.listItem} key={index}>
                <Text style={styles.listItemTitle}>{I18n.t(data.name)}</Text>
                <View>
                    <Input
                        placeholder={I18n.t(data.placeholder)}
                        placeholderTextColor="#E8E8E8"
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={[styles.inputContainerStyle, data.extraStyle ? styles[data.extraStyle] : {}]}
                        value={value}
                        onChangeText={(newVal) => this.setState({[data.val]: newVal})}
                    />
                </View>

            </View>
        );
    }
    _clickToCheck = () => {

    }
    render() {
        // const {carId, carColor, engineId, carriageId, insuranceCompany, insuranceId, insurancePeople, insurancePeopleId, area} = this.state;
        return (
            <ScrollView>
                {
                    this._renderList({
                        tips: 'sigm.miningPart.bindCar.listTips1',
                        list: [
                            {
                                name: 'sigm.miningPart.bindCar.carId',
                                placeholder: 'sigm.miningPart.bindCar.carIdPlaceholder',
                                val: 'carId'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.carColor',
                                placeholder: 'sigm.miningPart.bindCar.carColorPlaceholder',
                                val: 'carColor',
                                extraStyle: 'extraContainerStyle'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.engineId',
                                placeholder: 'sigm.miningPart.bindCar.engineIdPlaceholder',
                                val: 'engineId'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.carriageId',
                                placeholder: 'sigm.miningPart.bindCar.carriageIdPlaceholder',
                                val: 'carriageId'
                            },
                        ]
                    })
                }
                {
                    this._renderList({
                        tips: 'sigm.miningPart.bindCar.listTips2',
                        list: [
                            {
                                name: 'sigm.miningPart.bindCar.insuranceCompany',
                                placeholder: 'sigm.miningPart.bindCar.insuranceCompanyPlaceholder',
                                val: 'insuranceCompany'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.insuranceId',
                                placeholder: 'sigm.miningPart.bindCar.insuranceIdPlaceholder',
                                val: 'insuranceId'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.insurancePeople',
                                placeholder: 'sigm.miningPart.bindCar.insurancePeoplePlaceholder',
                                val: 'insurancePeople'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.insurancePeopleId',
                                placeholder: 'sigm.miningPart.bindCar.insurancePeopleIdPlaceholder',
                                val: 'insurancePeopleId'
                            },
                            {
                                name: 'sigm.miningPart.bindCar.area',
                                placeholder: 'sigm.miningPart.bindCar.areaPlaceholder',
                                val: 'area'
                            },
                        ]
                    })
                }
                <Button
                    title={I18n.t('sigm.miningPart.bindCar.btn')}
                    // "确认"
                    buttonStyle={styles.btnStyle}
                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                    onPress={() => this._clickToCheck()}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listTips: {
        color: '#4A90E2',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(40),
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
        // paddingTop: scaleSize(30),
        // paddingBottom: scaleSize(30),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
    listItemTitle: {
        color: '#555555',
        fontSize: scaleSize(30),
        maxWidth: scaleSize(270),
        marginTop: scaleSize(28),
        marginBottom: scaleSize(28),
    },
    inputStyle: {
        fontSize: scaleSize(30),
        color: '#E8E8E8',
        textAlign: 'right',
    },
    inputContainerStyle: {
        width: scaleSize(390),
        height: scaleSize(30),
        borderBottomWidth: 0,
        marginTop: scaleSize(34),
        marginBottom: scaleSize(26),
        // maxWidth: scaleSize(380),
    },
    btnStyle: {
        width: scaleSize(654),
        height: scaleSize(88),
        borderRadius: scaleSize(44),
        marginTop: scaleSize(62),
        marginLeft: scaleSize(48),
    },
    extraContainerStyle: {
        width: scaleSize(480),
    },
});
