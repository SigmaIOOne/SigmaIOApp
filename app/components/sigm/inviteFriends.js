/**
 * SIGM -> 挖矿账户 -> 获取算力 -> 邀请好友
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Clipboard,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import { Input, Button } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';
import Modal from 'react-native-modalbox';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import Toast from '../../utils/myToast';
import NoNetworkPage from '../public/noNetworkPage';
import { getInviteFriendsData } from '../../api/sigm';

class InviteFriends extends React.Component {
    static propTypes = {
        netInfo: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            qc: '',
        };
    }

    componentDidMount() {
        this._init();
    }

    _init = () => {
        this._getInviteFriendsData();
    }

    // 获取邀请好友页的数据信息
    _getInviteFriendsData = async () => {
        try {
            let result = await getInviteFriendsData();
            result = result.data;
            console.log('result ', result);
            if (result.status == 200) {
                result = result.data;
                this.setState({
                    code: result.ic,
                    qc: result.qc,
                });
            } else await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    // 复制到剪切板
    _setClipboardContent = async () => {
        try {
            await Clipboard.setString(this.state.code);
            this.toast.show(I18n.t('public.copySuccess'));
        } catch (e) {
            this.toast.show(I18n.t('public.copyFailed'));
        }
    };

    render() {
        const {code, qc} = this.state;
        const {netInfo} = this.props;
        const isConnected = netInfo.isConnected;
        return(
            <View>
                {
                    isConnected
                    ? <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.blueArea}></View>
                            <ImageBackground style={styles.bigImg} source={require('../../assets/images/sigm/invite_friends.png')}>
                                {
                                    !!qc && <Image style={styles.codeImg} source={{uri: qc}}/>
                                }
                            </ImageBackground>
                            <View style={styles.graySplitLine}></View>
                            <View style={styles.codeArea}>
                                <View style={styles.codeAreaLeft}>
                                    <Text style={styles.codeAreaLeftTitle}>{I18n.t('sigm.miningPart.inviteFriends.code')}</Text>
                                    <Text style={styles.codeAreaLeftVal}>{code}</Text>
                                </View>
                                <Button
                                    title={I18n.t('sigm.miningPart.inviteFriends.copy')}
                                    buttonStyle={styles.copyBtn}
                                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(36)}}
                                    onPress={() => this._setClipboardContent()}
                                />
                            </View>
                            {/*<Input*/}
                                {/*// placeholder={I18n.t(data.placeholder)}*/}
                                {/*// placeholderTextColor="#E8E8E8"*/}
                                {/*leftIcon={*/}
                                    {/*<Text style={styles.inputLeftTxt}>{I18n.t('sigm.miningPart.inviteFriends.code')}</Text>*/}
                                {/*}*/}
                                {/*rightIcon={*/}
                                    {/*<Button*/}
                                        {/*title={I18n.t('sigm.miningPart.inviteFriends.copy')}*/}
                                        {/*buttonStyle={styles.copyBtn}*/}
                                        {/*titleStyle={{color: '#FFFFFF', fontSize: scaleSize(36)}}*/}
                                        {/*onPress={() => {}}*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*inputStyle={styles.inputStyle}*/}
                                {/*inputContainerStyle={styles.inputContainerStyle}*/}
                                {/*value={code}*/}
                                {/*onChangeText={(code) => this.setState({code})}*/}
                            {/*/>*/}
                            <View style={styles.btnArea}>
                                {/* 分享邀请链接 */}
                                <Button
                                    title={I18n.t('sigm.miningPart.inviteFriends.leftBtn')}
                                    buttonStyle={[styles.btnStyle, styles.leftBtnStyle]}
                                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                                    onPress={() => this.shareModal.open()}
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
                        {/* 分享弹窗 */}
                        <Modal
                            style={styles.shareModal}
                            position={'bottom'}
                            coverScreen={true}
                            ref={shareModal => this.shareModal = shareModal}
                        >
                            <View style={styles.shareModalMain}>
                                <View style={styles.shareModalTitleView}>
                                    <Text style={styles.shareModalTitle}>{I18n.t('sigm.share.shareLink')}</Text>
                                </View>
                                <View style={styles.shareArea}>
                                    <TouchableOpacity style={[styles.shareIconArea]}>
                                        <Image style={styles.shareIcon} source={require('../../assets/images/sigm/wechat.png')}/>
                                        <Text style={styles.shareIconTxt}>{I18n.t('sigm.share.wechat')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.shareIconArea}>
                                        <Image style={styles.shareIcon} source={require('../../assets/images/sigm/wechat_friends.png')}/>
                                        <Text style={styles.shareIconTxt}>{I18n.t('sigm.share.friends')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.cancelShareBtn} onPress={() => this.shareModal.close()}>
                                <Text style={styles.cancelShareTxt}>{I18n.t('public.cancel')}</Text>
                            </TouchableOpacity>
                        </Modal>
                        {/* 点击发生网络未连接或者别的报错状况 */}
                        <Toast onRef={toast => this.toast = toast}/>
                    </ScrollView>
                    : <NoNetworkPage tryAgainFunc={this._init}/>
                }
            </View>

        );
    }
}

export default connect(
    state => ({
        netInfo: state.netInfo,
    })
)(InviteFriends)

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        alignItems: 'center',
    },
    blueArea: {
        // height: scaleSize(636),
        width: scaleSize(750),
        height: scaleSize(580),
        backgroundColor: '#4A90E2',
        marginTop: scaleSize(98),
    },
    bigImg: {
        position: 'absolute',
        width: scaleSize(400),
        height: scaleSize(712),
        top: scaleSize(40),
        left: scaleSize(175),
        alignItems: 'center',
    },
    codeImg: {
        width: scaleSize(96),
        height: scaleSize(96),
        marginTop: scaleSize(524),
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
        marginRight: scaleSize(42),
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
    },
    shareModal: {
        width: scaleSize(750),
        height: scaleSize(464),
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    shareModalMain: {
        width: scaleSize(750),
        height: scaleSize(350),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    shareModalTitleView: {
        width: scaleSize(666),
        height: scaleSize(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#BEBEBE',
        borderBottomWidth: scaleSize(1),
        marginBottom: scaleSize(48),
    },
    shareModalTitle: {
        color: '#9B9B9B',
        fontSize: scaleSize(28),
    },
    shareArea: {
        flexDirection: 'row',
    },
    shareIconArea: {
        width: scaleSize(100),
        marginRight: scaleSize(48),
        alignItems: 'center',
        backgroundColor: '#abcdef',
    },
    shareIcon: {
        width: scaleSize(80),
        height: scaleSize(80),
        marginBottom: scaleSize(8),
    },
    shareIconTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
    },
    cancelShareBtn: {
        marginTop: scaleSize(8),
        width: scaleSize(750),
        height: scaleSize(106),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelShareTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(36),
    },
    codeArea: {
        width: scaleSize(670),
        height: scaleSize(162),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    },
    codeAreaLeft: {
        flexDirection: 'row',
    },
    codeAreaLeftTitle: {
        fontSize: scaleSize(36),
        color: '#9B9B9B',
    },
    codeAreaLeftVal: {
        fontSize: scaleSize(36),
        color: '#4A90E2',
        marginLeft: scaleSize(28),
    }
});
