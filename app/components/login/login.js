import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';

import Toast from '../../utils/myToast';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { checkAccount, checkPwd } from '../../utils/valiServices';
import { changeLoginState } from "../../store/reducers/login";
import { login } from '../../api/login';

class Login extends React.Component {
    static propTypes = {
        changeLoginState: PropTypes.func,
        netInfo: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            psd: ''
        }
    }
    componentDidUpdate() {
        // 网络未连接
        // 不能用isConnected来判断，因为如果之前是没网，现在还是没网，就不会渲染，
        // toast也就不会触发
        const {netInfo} = this.props;
        if (netInfo.noNetworkClickNum) {
            this.toast.show(netInfo.errMsg);
        }
    }
    _clickToLogin = async () => {
        try {
            const { account, psd } = this.state;
            const { origin } = this.props.navigation.state.params;
            await checkAccount(account);
            await checkPwd(psd);
            let result = await login(account, psd);
            console.log('login ', result);
            result = result.data;
            // 别用===了，因为有些接口返回status是数字，有些是字符串
            if (result.status == 200) {
                this.props.changeLoginState(true);
                storage.save({ 
                    key: 'login', 
                    data: { loginState: true }, 
                    expires: null
                });
                this.props.navigation.navigate(origin);
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    render() {
        const { account, psd } = this.state;
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../assets/images/sigm/login_logo.png')}/>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.phonePlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={account}
                        onChangeText={(account) => this.setState({account})}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.psdPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../assets/images/sigm/psd_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                        value={psd}
                        onChangeText={(psd) => this.setState({psd})}
                    />
                    <Button
                        title={I18n.t('sigm.loginPart.loginBtn')}
                        // "立即登录"
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToLogin()}
                    />
                    <View style={[styles.flexRow]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FindPsd')}>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.findPsdBtn')}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.loginBottomText, styles.splitLine]}>|</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Registry')}>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.registerBtn')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Toast onRef={toast => this.toast = toast}/>
                </ImageBackground>
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        netInfo: state.netInfo,
    }),{
        changeLoginState,
    }
)(Login)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgBg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - scaleSize(40),
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
