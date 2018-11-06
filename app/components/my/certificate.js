/**
 * 我的 -> 安全中心 -> 身份认证
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';
import { checkIDNumber } from '../../utils/valiServices';
import Toast from '../../utils/myToast';
import { certificatePerson } from '../../api/my';
import { changeSecurityState } from '../../store/reducers/data';

class Certificate extends React.Component {
    static propTypes = {
        changeSecurityState: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            id: '',
        }
    }

    _renderItem = (data, index) => {
        return (
            <View style={styles.inputView} key={index}>
                <Text style={styles.inputLeftTxt}>{I18n.t('my.securityPart.certificatePart.' + data.title)}</Text>
                <View>
                    <Input
                        placeholder={I18n.t('my.securityPart.certificatePart.' + data.inputPlaceholder)}
                        placeholderTextColor="#BEBEBE"
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={this.state[data.target]}
                        onChangeText={(val) => { this.setState({[data.target]: val}) }}
                    />
                </View>
            </View>
        );
    }

    _clickToCheck = async () => {
        try {
            const { account, id } = this.state;
            if (!account || !id) await Promise.reject(I18n.t('error.orderNotFill')); // 您当前的信息未填写完全
            else {
                await checkIDNumber(id); // 验证身份证号
                let result = await certificatePerson(
                    id,
                    account
                );
                result = result.data;
                if (result.status == 200) {
                    this.props.changeSecurityState('hasCertificated', true);
                    this.props.navigation.goBack();
                }else await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    render() {
        const list = [
            {
                // 姓名栏
                title: 'name',
                target: 'account',
                inputPlaceholder: 'namePlaceholder',
            },
            {
                // 身份证号码栏
                title: 'certificateId',
                target: 'id',
                inputPlaceholder: 'certificateIdPlaceholder',
            },
        ];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        list.map((data, index) => this._renderItem(data, index))
                    }
                    <Button
                        title={I18n.t('public.check')}
                        // "确认"
                        buttonStyle={styles.checkBtnStyle}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        onPress={() => this._clickToCheck()}
                    />
                </View>
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
            </ScrollView>
        );
    }
}

export default connect(
    null, {
        changeSecurityState,
    }
)(Certificate)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: scaleSize(40),
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: scaleSize(750),
        height: scaleSize(90),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
    checkBtnStyle: {
        width: scaleSize(654),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginTop: Dimensions.get('window').height / 2,
        marginBottom: scaleSize(94),
    },
    inputLeftTxt: {
        color: 'rgba(85, 85, 85, .8)',
        fontSize: scaleSize(30),
        width: scaleSize(170),
        marginRight: scaleSize(84),
    },
    // inputViewRight: {
    //     width: scaleSize(480),
    // },
    inputStyle: {
        color: 'rgba(85, 85, 85, .8)',
        fontSize: scaleSize(30),
    },
    inputContainerStyle: {
        width: scaleSize(440),
        height: scaleSize(34),
        borderBottomWidth: 0,
    },
    firstInput: {
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
});
