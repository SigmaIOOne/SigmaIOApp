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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { checkPhone, checkCode, checkImgCode } from '../../utils/valiServices';
import Toast from '../../utils/myToast';
import Timer from '../../utils/timer';
// import {changeLoginState} from "../../store/reducers/login";
import {getPhoneCode, checkPhoneCode} from '../../api/login';
import SetNewPsd from "./setNewPsd";

class Registry extends React.Component {
    static propTypes = {
        netInfo: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            imgCode: '',
            phoneCode: '',
            count: 60,
            canSendCode: true, // 可以点击发送验证码
            firstSendCode: true, // 第一次发送验证码
            imgUrl: 'http://m.isong.xin/Admin/Index/verify?code=' + Math.random(),
        }
    }
    // 获取手机号验证码
    _getPhoneCode = async () => {
        try {
            const { account, imgCode } = this.state;
            await this.setState({canSendCode: false});
            await checkPhone(account);
            await checkImgCode(imgCode);
            let result = await getPhoneCode(account, 'register', imgCode);
            result = result.data;
            if (result.status === 200) {
                this.setState({
                    count: 60,
                    firstSendCode: false,
                });
            } else {
                await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.setState({canSendCode: true});
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
    // 立即注册
    _clickToregister = async () => {
        try {
            const { account, phoneCode } = this.state;
            const { origin } = this.props.navigation.state.params;
            await checkPhone(account);
            await checkCode(phoneCode);
            let result = await checkPhoneCode(account, phoneCode);
            result = result.data;
            if (result.status === 200) {
                this.props.navigation.navigate('SetNewPsd', {origin: 'registry', loginGoTarget: origin, account})
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    render() {
        const { account, imgCode, phoneCode, canSendCode, firstSendCode, count, imgUrl } = this.state;
        const { origin } = this.props.navigation.state.params;
        let getCodeTxt = '';
        if(firstSendCode) getCodeTxt = I18n.t('public.getCode'); // 获取验证码
        else if(!canSendCode) getCodeTxt = count + I18n.t('public.getCodeWait'); // s后重新获取
        else getCodeTxt = I18n.t('public.getCodeAgain'); // 重新获取
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../assets/images/sigm/login_logo.png')}/>
                    {/* 请输入您的邮箱或手机号 */}
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.accountPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={account}
                        onChangeText={(account) => { this.setState({account}) }}
                    />
                    {/* 请输入图片验证码 */}
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.imgCode')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/img_code.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        rightIcon={
                            <View>
                                <TouchableOpacity style={styles.imgCode} onPress={() => this.setState({imgUrl: 'http://m.isong.xin/Admin/Index/verify?code=' + Math.random()})}>
                                    <Image key='imgCode' style={{width: scaleSize(120), height: scaleSize(48)}} source={{uri:imgUrl}}/>
                                </TouchableOpacity>
                            </View>
                        }
                        rightIconContainerStyle={styles.imgRightIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={imgCode}
                        onChangeText={(imgCode) => this.setState({imgCode})}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.phoneCode')}
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
                        title={I18n.t('sigm.loginPart.registryPart.registryBtn')}
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToregister()}
                    />
                    <View style={[styles.flexRow]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('login', {origin})}>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.psdLogin')}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.loginBottomText, styles.splitLine]}>|</Text>
                        <TouchableOpacity>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.registerBtn')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Toast modalType='white' onRef={toast => this.toast = toast}/>
                </ImageBackground>
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        netInfo: state.netInfo,
    }),{
        // changeLoginState,
    }
)(Registry)

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
    imgRightIconContainerStyle: {
        marginRight: scaleSize(24),
        width: scaleSize(100),
    },
    imgCode: {
        borderColor: '#FFFFFF',
        borderWidth: scaleSize(2),
        borderRadius: scaleSize(4),
        padding: scaleSize(4),
    },
    // imgCodeTxt: {
    //     color: '#FFFFFF',
    //     fontSize: scaleSize(30),
    // },
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
    },
    loginBottomText: {
        color: '#FFFFFF',
        lineHeight: scaleSize(84),
        fontSize: scaleSize(32),
    },
    splitLine: {
        marginLeft: scaleSize(40),
        marginRight: scaleSize(40),
    }
});
