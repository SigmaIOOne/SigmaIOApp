/**
 * 注册 --- 获取验证码 --- 忘记密码
 */
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import { Input, Button } from 'native-base';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { checkAccount, checkCode } from '../../utils/valiServices';
import Toast from '../../utils/myToast';
import Timer from '../../utils/timer';
import {getPhoneCode, checkPhoneCode} from '../../api/login';

export default class FindPsd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            phoneCode: '',
            count: 60,
            canSendCode: true, // 可以点击发送验证码
            firstSendCode: true, // 第一次发送验证码
        }
    }
    _clickToNext = async () => {
        try {
            const { account, phoneCode } = this.state;
            const { origin } = this.props.navigation.state.params;
            await checkAccount(account);
            await checkCode(phoneCode);
            let result = await checkPhoneCode(account, phoneCode);
            result = result.data;
            result.status === 200
                ? this.props.navigation.navigate('SetNewPsd', {origin: 'findPsd', loginGoTarget: origin})
                : await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    _onTimer = () => {
        if (!this.state.canSendCode) {
            if (this.state.count > 0) {
                this.setState({
                    count: this.state.count - 1,
                });
                if(this.state.count === 0){
                    this.setState({ canSendCode: true });
                }
            }
        }
    }
    // 获取手机号验证码
    _getPhoneCode = async () => {
        try {
            const { account } = this.state;
            await checkAccount(account);
            let result = await getPhoneCode(account, 'modify');
            result = result.data;
            if (result.status === 200) {
                this.setState({
                    canSendCode: false,
                    count: 60,
                    firstSendCode: false,
                });
            } else await Promise.reject(result.msg)
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    render() {
        const { account, phoneCode, canSendCode, firstSendCode, count } = this.state;
        let getCodeTxt = '';
        if(firstSendCode) getCodeTxt = I18n.t('public.getCode'); // 获取验证码
        else if(!canSendCode) getCodeTxt = count + I18n.t('public.getCodeWait'); // s后重新获取
        else getCodeTxt = I18n.t('public.getCodeAgain'); // 重新获取
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../assets/images/sigm/login_logo.png')}/>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.findPsdPart.accountPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={account}
                        onChangeText={(account) => { console.log('@ ', account); this.setState({account}) }}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.findPsdPart.codePlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/psd_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        rightIcon={
                            <TouchableOpacity disabled={!canSendCode} onPress={() => this._getPhoneCode()}>
                                <View>
                                    <Timer interval={1000} onTimer={this._onTimer}/>
                                    <Text style={styles.codeTxt}>{getCodeTxt}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        rightIconContainerStyle={styles.rightIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={phoneCode}
                        onChangeText={(phoneCode) => this.setState({phoneCode})}
                    />
                    <Button
                        title={I18n.t('public.next')}
                        // "下一步"
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToNext()}
                    />
                    <Toast modalType='white' onRef={toast => this.toast = toast}/>
                </ImageBackground>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    imgBg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    loginLogo: {
        width: scaleSize(160),
        height: scaleSize(208),
        marginTop: scaleSize(80),
        marginBottom: scaleSize(80),
    },
    inputIcon: {
        width: scaleSize(32),
        height: scaleSize(36),
    },
    leftIconContainerStyle: {
        // width: scaleSize(28),
    },
    rightIconContainerStyle: {
        marginRight: scaleSize(24),
        width: scaleSize(180),
    },
    codeTxt: {
        color: '#FFFFFF',
        fontSize: scaleSize(34),
    },
    inputStyle: {
        fontSize: scaleSize(32),
        color: 'rgba(255, 255, 255, 0.6)'
    },
    inputContainerStyle: {
        width: scaleSize(686),
        height: scaleSize(84),
        borderRadius: scaleSize(12),
        backgroundColor: 'rgba(255, 255, 255, .2)',
        borderBottomWidth: 0,
        marginBottom: scaleSize(16),
    },
    loginBtnStyle: {
        width: scaleSize(600),
        height: scaleSize(84),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: scaleSize(24),
        marginTop: Dimensions.get('window').height / 2 - scaleSize(180),
        marginBottom: scaleSize(24),
    }
});
