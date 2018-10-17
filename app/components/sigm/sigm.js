import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import MiningPart from "./miningPart";

class Sigm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }
    componentDidMount() {
        storage.load({ key: 'walletInfo'})
            .then((res) => {
                if (res.walletAddress) {
                    this.setState({
                        logged: true
                    })
                }
            })
            .catch(() => {
                this.setState({
                    logged: false
                })
            });
    }

    _clickToNavigate = (target) => {

    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.sigmBg} source={require('../../assets/images/sigm/sigm_bg.png')}/>
                <View style={styles.content}>
                    <View style={[styles.header, styles.spaceBetween]}>
                        <View style={styles.headerLeft}>
                            <Image style={styles.headerLeftImg} source={require('../../assets/images/sigm/sigm_title.png')}/>
                            <Text style={styles.headerLeftText}>SigmalO</Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.headerRightText}>{I18n.t('sigm.login')}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 卡片 */}
                    {/* 总资产 */}
                    <View style={styles.perCard}>
                        <View style={[styles.cardRow1, styles.spaceBetween]}>
                            <View style={[styles.cardTitle, styles.spaceBetween]}>
                                <Image style={styles.cardIcon} source={require('../../assets/images/sigm/icon_1.png')}/>
                                <Text style={styles.cardTitleText}>{I18n.t('sigm.totalAsset')}</Text>
                            </View>
                            <TouchableOpacity style={styles.rightArrowView} onPress={() => this.props.navigation.navigate('AccountDetail')}>
                                <Image style={styles.rightArrow} source={require('../../assets/images/sigm/right_arrow.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.cardRow2, styles.spaceBetween]}>
                            <View style={[styles.spaceBetween]}>
                                <Text style={[styles.cardRow2LeftText, styles.cardRow2LeftTextVal]}>0.00</Text>
                                <Text style={styles.cardRow2LeftText}>SIGM</Text>
                            </View>
                            <Text style={styles.cardRow2Right}>≈0.00$</Text>
                        </View>
                        <View style={[styles.cardRow3, styles.spaceBetween]}>
                            <Text style={styles.cardRow3Left}>{I18n.t('sigm.totalProfit')}</Text>
                            <Text style={styles.cardRow3Right}>0.00</Text>
                        </View>
                    </View>
                    {/* 挖矿账户 */}
                    <View style={styles.perCard}>
                        <View style={[styles.cardRow1, styles.spaceBetween]}>
                            <View style={[styles.cardTitle, styles.spaceBetween]}>
                                <Image style={styles.cardIcon} source={require('../../assets/images/sigm/icon_2.png')}/>
                                <Text style={styles.cardTitleText}>{I18n.t('sigm.minerAccount')}</Text>
                            </View>
                            <TouchableOpacity style={styles.rightArrowView} onPress={() => this.props.navigation.navigate('MiningPart')}>
                                <Image style={styles.rightArrow} source={require('../../assets/images/sigm/right_arrow.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.cardRow2, styles.flexRow]}>
                            <Text style={[styles.cardRow2LeftText, styles.cardRow2LeftTextVal]}>0.00</Text>
                            <Text style={styles.cardRow2LeftText}>SIGM</Text>
                        </View>
                        <View style={[styles.cardRow3, styles.spaceBetween]}>
                            <View style={[styles.spaceBetween]}>
                                <Text style={[styles.cardRow3Left, styles.card2Row3LeftText]}>{I18n.t('sigm.waitingGet')}</Text>
                                <Text style={[styles.cardRow3Left, styles.card2Row3LeftText]}>0.00</Text>
                            </View>
                            <TouchableOpacity style={styles.card2Row3Right}>
                                <Text style={styles.card2Row3RightText}>{I18n.t('sigm.immediatelyGet')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    }),{}
)(Sigm)

const styles = StyleSheet.create({
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#f0f2f5'
    },
    sigmBg: {
        height: scaleSize(340),
    },
    content: {
        position: 'absolute',
        top: scaleSize(134)
    },
    header: {
        marginBottom: scaleSize(16),
    },
    headerLeft: {
        width: scaleSize(300),
        flexDirection: 'row',
    },
    headerLeftImg: {
        width: scaleSize(64),
        height: scaleSize(64),
        marginRight: scaleSize(24),
        marginLeft: scaleSize(18)
    },
    headerLeftText: {
        fontSize: scaleSize(48),
        color: '#FFFFFF',
    },
    headerRight: {
        width: scaleSize(100),
    },
    headerRightText: {
        fontSize: scaleSize(36),
        color: '#FFFFFF',
    },
    perCard: {
        width: scaleSize(686),
        height: scaleSize(306),
        backgroundColor: '#ffffff',
        borderRadius: scaleSize(12),
        marginBottom: scaleSize(38),
        padding: scaleSize(40)
    },
    cardRow1: {
        height: scaleSize(50),
        marginTop: scaleSize(-9),
    },
    cardIcon: {
        width: scaleSize(32),
        height: scaleSize(32),
        marginRight: scaleSize(28),
        marginTop: scaleSize(9),
    },
    cardTitleText: {
        lineHeight: scaleSize(50),
        fontSize: scaleSize(32),
    },
    rightArrowView: {
        width: scaleSize(70),
        height: scaleSize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrow: {
        width: scaleSize(20),
        height: scaleSize(32),
    },
    cardRow2: {
        height: scaleSize(66),
        marginTop: scaleSize(26),
        marginBottom: scaleSize(26),
    },
    cardRow2LeftText: {
        fontSize: scaleSize(48),
        color: '#4A90E2',
        lineHeight: scaleSize(66)
    },
    cardRow2LeftTextVal: {
        marginRight: scaleSize(24),
    },
    cardRow2Right: {
        fontSize: scaleSize(28),
        color: '#4A90E2',
        lineHeight: scaleSize(66)
    },
    cardRow3: {
        backgroundColor: '#F2F2F5',
        width: scaleSize(606),
        height: scaleSize(64),
        paddingLeft: scaleSize(12),
        paddingRight: scaleSize(12),
        borderRadius: scaleSize(12),
    },
    cardRow3Left: {
        color: '#F5A623',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(64),
    },
    cardRow3Right: {
        color: '#F5A623',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(64),
    },
    card2Row3LeftText: {
        color: '#4A90E2',
    },
    card2Row3Right: {
        width: scaleSize(166),
        height: scaleSize(44),
        borderRadius: scaleSize(22),
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(10),
    },
    card2Row3RightText: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
    }
});