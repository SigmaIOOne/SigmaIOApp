import React from 'react';
import {
    Image,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { checkPwd } from '../../utils/valiServices';
import { registrySetPsd } from '../../api/login';
import Toast from '../../utils/myToast';
import {changeLoginState} from "../../store/reducers/login";

class SetNewPsd extends React.Component {
    static propTypes = {
        changeLoginState: PropTypes.func,
        netInfo: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            psd1: '',
            psd2: '',
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
    _clickToFinish = async () => {
        try {
            const { psd1, psd2 } = this.state;
            const { origin } = this.props.navigation.state.params;
            await checkPwd(psd1);
            await checkPwd(psd2);
            if (psd1 !== psd2) {
                this.toast.show(I18n.t('sigm.loginPart.twoPsdNoSame'));
            }
            let result = await registrySetPsd(psd1);
            result = result.data;
            console.log('result ', result);
            if (result.status == 200) {
                if (origin === 'registry') {
                    this.props.changeLoginState(true);
                    storage.save({
                        key: 'login',
                        data: { loginState: true },
                        expires: null
                    });
                    this.props.navigation.navigate('Sigm');
                } else this.props.navigation.navigate('Login');
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    render() {
        const { psd1, psd2 } = this.state;
        const { origin } = this.props.navigation.state.params;
        const inputTxt1 = origin === 'registry' ? 'setPsd' : 'findPsdPart.newPsdPlaceholder';
        const btnTxt = origin === 'registry' ? 'public.check': 'public.finish';
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../assets/images/sigm/login_logo.png')}/>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.' + inputTxt1)}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                        value={psd1}
                        onChangeText={(psd1) => this.setState({psd1})}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.findPsdPart.checkPsdPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                        value={psd2}
                        onChangeText={(psd2) => this.setState({psd2})}
                    />
                    <Button
                        title={I18n.t(btnTxt)}
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToFinish()}
                    />
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
)(SetNewPsd)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
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
});
