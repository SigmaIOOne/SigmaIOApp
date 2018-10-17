/**
 * SIGM -> 挖矿账户 -> 获取算力 -> 邀请好友
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import { Input, Button } from 'react-native-elements';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class InviteFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }
    render() {
        const {code} = this.state;
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.blueArea}></View>
                    <Image style={styles.bigImg} source={require('../../assets/images/sigm/invite_friends.png')}/>
                    <View style={styles.graySplitLine}></View>
                    <Input
                        // placeholder={I18n.t(data.placeholder)}
                        // placeholderTextColor="#E8E8E8"
                        leftIcon={
                            <Text style={styles.inputLeftTxt}>{I18n.t('sigm.miningPart.inviteFriends.code')}</Text>
                        }
                        rightIcon={
                            <Button
                                title={I18n.t('sigm.miningPart.inviteFriends.copy')}
                                buttonStyle={styles.copyBtn}
                                titleStyle={{color: '#FFFFFF', fontSize: scaleSize(36)}}
                                onPress={() => {}}
                            />
                        }
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        value={code}
                        onChangeText={(code) => this.setState({code})}
                    />
                    <View style={styles.btnArea}>
                        {/* 分享邀请链接 */}
                        <Button
                            title={I18n.t('sigm.miningPart.inviteFriends.leftBtn')}
                            buttonStyle={[styles.btnStyle, styles.leftBtnStyle]}
                            titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                            onPress={() => {}}
                        />
                        {/* 分享邀请海报 */}
                        <Button
                            title={I18n.t('sigm.miningPart.inviteFriends.rightBtn')}
                            buttonStyle={[styles.btnStyle, styles.rightBtnStyle]}
                            titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                            onPress={() => {}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    blueArea: {
        height: scaleSize(636),
        backgroundColor: '#4A90E2',
        marginTop: scaleSize(98),
    },
    bigImg: {
        position: 'absolute',
        width: scaleSize(400),
        height: scaleSize(712),
        top: scaleSize(60),
        left: scaleSize(175),
    },
    graySplitLine: {
        backgroundColor: '#F2F2F5',
        marginTop: scaleSize(98),
        height: scaleSize(24),
    },
    btnStyle: {
        width: scaleSize(314),
        height: scaleSize(72),
        borderRadius: scaleSize(36),
        marginTop: scaleSize(56),
    },
    leftBtnStyle: {
        backgroundColor: '#4A90E2',
    },
    rightBtnStyle: {
        backgroundColor: '#F5A623',
    },
    inputStyle: {
        fontSize: scaleSize(36),
        color: '#4A90E2',
    },
    inputContainerStyle: {
        width: scaleSize(670),
        // height: scaleSize(42),
        marginRight: scaleSize(40),
        marginLeft: scaleSize(40),
        paddingTop: scaleSize(56),
        paddingBottom: scaleSize(56),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    },
    inputLeftTxt: {
        fontSize: scaleSize(36),
        color: '#9B9B9B',
    },
    copyBtn: {
        width: scaleSize(120),
        height: scaleSize(62),
        backgroundColor: '#BEBEBE',
    },
    btnArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
    }
});
