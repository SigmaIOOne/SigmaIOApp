import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	RefreshControl,
	TouchableHighlight,
	Modal,
	Linking,
	ImageBackground,
	StatusBar,
	BackHandler,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import { scaleSize, ifIphoneX, show } from '../../utils/ScreenUtil';
import actions from '../../store/action/walletInfo';
import getBalance from '../../utils/addTokens';
import abi from '../../utils/abi';
import { I18n } from '../../../language/i18n';
import { checkVersion } from '../../api/index';
import { getUser } from '../../api/bind';
import Toast from 'react-native-easy-toast';
var DeviceInfo = require('react-native-device-info');

class CurrencyList extends Component {
	currencyDetail(title, banlance) {
		this.props.navigate('CurrencyDetail', {
			title: title,
			banlance: banlance
		});
	}

	render() {
		return (
			<TouchableHighlight
				underlayColor={'transparent'}
				onPress={() => this.currencyDetail(this.props.item.currency_name, this.props.item.balance)}
			>
				<View style={styles.currency_list}>
					<View style={styles.currency_left}>
						<View>
							<TouchableHighlight style={styles.currency_logo}>
								<Image style={styles.currency_logo_item} source={this.props.item.logo_url} />
							</TouchableHighlight>
						</View>
						<View>
							<Text style={{ fontSize: 17, color: '#424559', fontWeight: 'bold' }}>{this.props.item.currency_name}</Text>
						</View>
					</View>
					<View>
						<Text style={styles.alignRight}>{this.props.item.balance}</Text>
						{/* <Text style={[ styles.alignRight, styles.currency ]} /> */}
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

class Assets extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
		this.state = {
			walletName: ' ',
			walletAddress: ' ',
			eth_banlance: 0,
			gog_banlance: 0,
			lock_num: 0,
			newVersion: '--',
			modalVisible: false,
			currentVersion: null,
			isRefreshing: true
		};
	}


	getAllBalance() {
		this.setState({
			isRefreshing: true
		});
		web3.eth.getBalance(this.state.walletAddress).then((res) => {
			let eth_banlance = show(web3.utils.fromWei(res, 'ether'));
			this.setState({ eth_banlance });
		});
		getBalance(
			abi,
			this.state.walletAddress,
			store.getState().contractAddr.GOGContractAddr,
			(gog_banlance) => {
				gog_banlance = show(gog_banlance);
				this.setState({ gog_banlance });
			}
		);
		this.updataWalletName();

		setTimeout(() => {
			this.setState({
				isRefreshing: false
			});
		}, 1000);
	}
	componentWillReceiveProps(newProps){
		if(newProps.wallet.walletName){
			this.setState({
				walletName: newProps.wallet.walletName
			})
		}
		// console.log(newProps.wallet.walletName)
	}
	// componentWillMount(){
	// 	BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
	// }
	componentDidMount() {
		// BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
		storage.save({ key: 'mnemonic', data: { mnemonic: false }, expires: null})
		const minHeight = ifIphoneX(0, 20, StatusBar.currentHeight);
		this.setState({
			minHeight: minHeight
		})
		storage
			.load({
				key: 'walletInfo'
			})
			.then((walletInfo) => {
				let walletAddress = '';
				if(this.props.wallet.address){
					walletAddress = this.props.wallet.address
				} else {
					walletAddress = walletInfo.walletAddress;
				}
				getUser(walletAddress).then((res) => {
					if(res.data && res.data.userId){
						storage.save({
							key: 'user',
							data: {
								userId: res.data.userId,
								phone: res.data.phone,
								rcode: res.data.referralCode,
								passwordExists: res.data.passwordExists
							},
							expires: null
						});
					} else {
						storage.save({
							key: 'user',
							data: {
								userId: '',
								phone: '',
								rcode: '',
							},
							expires: null
						});
					}
				}).catch((e) => {
					console.log(e)
				})
				this.setState(
					{
						walletAddress: walletAddress
					},
					() => {
						this.getAllBalance();

					}
				);
			})
			.catch((x) => {
				console.log(x);
			});
		this.updataWalletName();

		// this.setState({
		// 	currentVersion: DeviceInfo.getVersion().replace(/\./g, '')
		// });

		// checkVersion()
		// 	.then((result) => {
		// 		return result.data.data;
		// 	})
		// 	.then((res) => {
		// 		this.setState({
		// 			newVersion: res.version,
		// 			modalVisible: true
		// 		});
		// 		let ver_new = res.version.replace(/\./g, '');
		// 		if (ver_new > this.state.currentVersion) {
		// 			this.setState({ modalVisible: true });
		// 		}
		// 	});
	}
	// onBackPress = () => {
	// 	console.log('ddddddd')
	// 	console.log(this.props.navigation)
	// 	if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
    //         return false
    //     }
	// 	this.lastBackPressed = Date.now();
	// 	Alert.alert(null, this.props.navigation.state.routeName)
    //     this.refs.toast.show('再点击一次退出');
        
    //     return true;
        
	// }
	updataWalletName() {
		storage
			.load({
				key: 'walletName'
			})
			.then((res) => {
				let walletName = res.walletName;
                console.log('res ', res);
                this.setState({
					walletName: walletName
				});
			})
			.catch((x) => {
				console.log('没有发现钱包名称');
			});
	}

	componentWillUpdate() {
		this.props.walletInfo({
			wallet_address: this.state.walletAddress,
			eth_banlance: this.state.eth_banlance,
			gog_banlance: this.state.gog_banlance
		});
	}

	render() {
		const currencyData = [
			{
				currency_name: 'ETH',
				balance: this.state.eth_banlance,
				logo_url: require('../../assets/images/currency_logo/eth_logo.png')
			},
			{
				currency_name: 'GOG',
				balance: this.state.gog_banlance,
				logo_url: require('../../assets/images/currency_logo/gog_logo.png')
			}
		];

		return (
			<View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <ImageBackground style={{ width: scaleSize(670), height: scaleSize(292), paddingLeft: scaleSize(50), paddingTop: scaleSize(26), borderRadius: scaleSize(50), backgroundColor: '#fff', marginBottom: scaleSize(40), marginTop: scaleSize(120) - this.state.minHeight }} source={require('../../assets/images/asset/asset-top.png')}>
                        {/* <View style={styles.walletInfo}> */}
                        <View style={styles.walletInfo_item}>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                            >
                                <Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')} />
                            </TouchableHighlight>
                            <Text numberOfLines={1} style={styles.walletName}>{this.state.walletName}</Text>
                            <Text style={styles.walletAddress_item}>
                                {this.state.walletAddress.replace(
                                    this.state.walletAddress.slice('9', '35'),
                                    '......'
                                )}
                            </Text>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.props.navigation.navigate('WalletInfo')}
                                style={styles.setting}
                            >
                                <Image
                                    style={styles.settingImg}
                                    source={require('../../assets/images/asset/asset-setting.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => this.props.navigation.navigate('Receipt')}
                                style={styles.ercode}
                            >
                                <Image
                                    style={styles.ercodeImg}
                                    source={require('../../assets/images/asset/ercode_2x.png')}
                                />
                            </TouchableHighlight>
                        </View>
                        {/* </View> */}
                    </ImageBackground>
                </View>
				<Toast ref="toast" position="center" />
				<Text style={styles.title}>{I18n.t('assets._title')}</Text>
				<ScrollView
					style={styles.scrollview}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={() => {
								this.getAllBalance();
							}}
							tintColor="#BABEBA"
							title="Loading..."
							titleColor="#9FA3A0"
						/>
					}
				>

					{currencyData.map((item, index) => {
						return <CurrencyList item={item} index={index} key={index} navigate={this.navigate} />;
					})}
				</ScrollView>

				{/* <Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
					}}
					>
					<View style={styles.modalCon}>
						<View style={styles.modal}>
							<Text style={styles.modalTitle}>{I18n.t('assets.findnewVersion')}{this.state.newVersion}</Text>
							<View style={styles.modalBottomBtn}>
								<View>
									<Text
										style={styles.modalBottomBtnNoText}
										onPress={() => {
											this.setState({
												modalVisible: false
											});
										}}
									>
									    {I18n.t('assets.notUpdate')}
									</Text>
								</View>
								<View>
									<Text
										style={styles.modalBottomBtnYesText}
										onPress={() => {
											Linking.openURL('http://wapxk.com/wapindex-1000-6635.html').catch((err) =>
												console.error('An error occurred', err)
											);
										}}
									>
										{I18n.t('assets.update')}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Modal> */}
			</View>
		);
	}
}

export default connect(
	state => ({
		wallet: state.wallet
	}),
	actions
)(Assets);

const styles = StyleSheet.create({
	marginLeft: {
		marginLeft: 20
	},
	alignRight: {
		textAlign: 'right',
		marginRight: scaleSize(32),
		fontSize: 20,
		color: '#4A90E2',
		fontWeight: 'bold'
	},
	container: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 50,
		backgroundColor: '#fff',
		flex: 1,
	},
	walletInfo: {
	},
	walletInfo_item: {
	    position: 'relative'
	},
	avatar: {
		width: scaleSize(128),
		height: scaleSize(128),
        marginBottom: scaleSize(24)
	},
	walletName: {
		color: '#fff',
		fontSize: 20,
		maxWidth: scaleSize(600),
        overflow: 'hidden'
	},
	walletAddress_item: {
		color: '#fff',
		fontSize: 14
	},
    ercodeImg: {
		width: scaleSize(48),
		height: scaleSize(48),
	},
    settingImg: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
	//新增币种
	addCurrency: {
		alignItems: 'center',
		marginTop: -30
	},
	addCurrency_item: {
		borderRadius: 8,
		height: 80,
		padding: 30,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width * 0.85,
		shadowColor: '#938670',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 0,
			height: 2
		}
	},
	currency_text: {
		color: '#ccc',
		fontSize: 12
	},
	currency_item: {
		width: 80,
		height: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#528bf7'
	},
	currency_item_text: {
		color: '#fff'
	},
	title: {
		fontSize: 17,
		color: '#0D0E15',
		fontWeight: 'bold',
		marginLeft: scaleSize(32),
		paddingBottom: scaleSize(24)
	},
	//币种列表
	currency_list: {
		width: scaleSize(670),
		height: scaleSize(160),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: scaleSize(32),
		marginTop: scaleSize(12),
		marginBottom: scaleSize(12),
		borderRadius: scaleSize(20),
		backgroundColor: '#fff',
		shadowOffset: { width: 0, height: 0 },
		shadowColor: 'rgb(34, 34, 34)',
		shadowOpacity: 0.18,
		shadowRadius: scaleSize(27),
		elevation: 4,

	},
	currency_left: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	currency_logo: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 50,
		// padding: 3,
		marginLeft: scaleSize(32),
		marginRight: scaleSize(24)
	},
	currency_logo_item: {
		width: scaleSize(80),
		height: scaleSize(80),
		borderRadius: scaleSize(40)
	},
	currency: {
		color: '#ccc'
	},
	// version
	modalCon: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		backgroundColor: 'white',
		width: 260,
		borderRadius: 10
	},
	modalTitle: {
		fontSize: 16,
		color: '#222',
		lineHeight: 50,
		height: 50,
		textAlign: 'center',
		paddingLeft: 15,
		paddingRight: 15
	},
	versionText: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 20
	},
	modalBottomBtn: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopWidth: 1,
		borderColor: '#eee',
		alignItems: 'center',
		height: 50
	},
	modalBottomBtnNoText: {
		color: 'rgb(0,118,255)',
		fontSize: 16,
		textAlign: 'center'
	},
	modalBottomBtnYesText: {
		color: 'rgb(254,56,36)',
		fontSize: 16,
		textAlign: 'center'
	},
    setting: {
        position: 'absolute',
        top: 0,
        right: scaleSize(24),
    },
    ercode: {
	    position: 'absolute',
        bottom: 0,
        right: scaleSize(24),
    }
});
