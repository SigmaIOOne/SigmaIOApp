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
import { bindCar } from '../../api/sigm';
import Toast from '../../utils/myToast';

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
    _clickToCheck = async () => {
        try {
            const {carId, carColor, engineId, carriageId, insuranceCompany, insuranceId, insurancePeople, insurancePeopleId, area} = this.state;
            if (
                !carId
                || !carColor
                || !engineId
                || !carriageId
                || !insuranceCompany
                || !insuranceId
                || !insurancePeople
                || !insurancePeopleId
                || !area
            ) await Promise.reject(I18n.t('error.orderNotFill')); // 您当前的信息未填写完全
            else {
                let result = await bindCar({
                    car_id: carId,
                    car_colour: carColor,
                    engine_number: engineId,
                    frame_number: carriageId,
                    Insurance_company: insuranceCompany,
                    policy_number: insuranceId,
                    name: insurancePeople,
                    numberid: insurancePeopleId,
                    region: area
                });
                result = result.data;
                console.log('res ', result);
                result.status == 200 ? this.props.navigation.goBack() : await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    render() {
        return (
            <ScrollView>
                {
                    this._renderList({
                        tips: 'sigm.miningPart.bindCar.listTips1',
                        list: [
                            {
                                // 车牌号
                                name: 'sigm.miningPart.bindCar.carId',
                                placeholder: 'sigm.miningPart.bindCar.carIdPlaceholder',
                                val: 'carId'
                            },
                            {
                                // 车牌颜色
                                name: 'sigm.miningPart.bindCar.carColor',
                                placeholder: 'sigm.miningPart.bindCar.carColorPlaceholder',
                                val: 'carColor',
                                extraStyle: 'extraContainerStyle'
                            },
                            {
                                // 发动机号
                                name: 'sigm.miningPart.bindCar.engineId',
                                placeholder: 'sigm.miningPart.bindCar.engineIdPlaceholder',
                                val: 'engineId'
                            },
                            {
                                // 车架号
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
                                // 保险公司
                                name: 'sigm.miningPart.bindCar.insuranceCompany',
                                placeholder: 'sigm.miningPart.bindCar.insuranceCompanyPlaceholder',
                                val: 'insuranceCompany'
                            },
                            {
                                // 保单号
                                name: 'sigm.miningPart.bindCar.insuranceId',
                                placeholder: 'sigm.miningPart.bindCar.insuranceIdPlaceholder',
                                val: 'insuranceId'
                            },
                            {
                                // 被保险人名称
                                name: 'sigm.miningPart.bindCar.insurancePeople',
                                placeholder: 'sigm.miningPart.bindCar.insurancePeoplePlaceholder',
                                val: 'insurancePeople'
                            },
                            {
                                // 被保险人身份证号码 或单位组织机构代码
                                name: 'sigm.miningPart.bindCar.insurancePeopleId',
                                placeholder: 'sigm.miningPart.bindCar.insurancePeopleIdPlaceholder',
                                val: 'insurancePeopleId'
                            },
                            {
                                // 地区
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
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
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
        color: '#555555',
        textAlign: 'right',
    },
    inputContainerStyle: {
        width: scaleSize(390),
        height: scaleSize(34),
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
