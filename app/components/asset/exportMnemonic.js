import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import lightwallet from 'eth-lightwallet';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { Polygon } from 'react-native-svg';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
const screen = Dimensions.get('window');

export class ExportMnemonic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Mnemonic: ' ',
			// backupBtnText: '请备份您的助记词',
			backupBtnText: I18n.t('assets.mnemonic.backUpMnemonic'),
			backupBtnOpacity: 0.6,
			onPress: null,
			step: 'backup',
			words: null,
			selectWordsText: ' ',
			selectWords: [],
			randomWords: [],
			next: true
		};
		this.navigate = this.props.navigation.navigate;
		this.nextStep = this.nextStep.bind(this);
		this.confirmWords = this.confirmWords.bind(this);
		this.renderWord = this.renderWord.bind(this);
		this.clickWord = this.clickWord.bind(this);
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		storage.save({ key: 'mnemonic', data: { mnemonic: true }, expires: null})
		storage.load({ key: 'walletInfo' }).then((res) => {
			let mneKeystore = lightwallet.keystore.deserialize(JSON.stringify(res.ks));
			mneKeystore.keyFromPassword(params.walletPassword, (err, pwDerivedKey) => {
				let Mnemonic = mneKeystore.getSeed(pwDerivedKey);
				this.setState({
					Mnemonic: Mnemonic
				});
			});
		});

		setTimeout(() => {
			this.setState({
				backupBtnText: I18n.t('public.next'),
				// backupBtnText: '下一步',
				backupBtnOpacity: 1,
				next: false
			});
		}, 10000);
	}

	// 抄写完 点击下一步时 去确认
	nextStep() {
		let randomWords = this.state.Mnemonic.toString().split(' ').sort();
		words = randomWords.map((w, i) => this.renderWord(w, i));
		this.setState({
			step: 'confirm',
			randomWords,
			words
		});
	}

	// 选择助记词完 点击确认完成
	confirmWords() {
		if (this.state.selectWordsText == this.state.Mnemonic) {
			// 助记词正确, 请妥善保管您的助记词！
			Alert.alert(null, I18n.t('assets.mnemonic.mnemonicSuccess'), [
				{
					text: 'OK',
					onPress: () => {
						let resetAction = StackActions.reset({
							index: 0,
							actions: [
								NavigationActions.navigate({
									routeName: 'Home'
								})
							]
						});
						this.props.navigation.dispatch(resetAction);
					}
				}
			]);
		} else {
			Alert.alert(null, I18n.t('assets.mnemonic.mnemonicError'));
			// Alert.alert(null, '助记词有误，请重新输入')
			this.setState({
				selectWords: [],
				selectWordsText: ' '
			});
		}
	}

	clickWord(i) {
		let word = this.state.randomWords[i];
		let selectWords = this.state.selectWords;
		selectWords.push(word);
		selectWordsText = selectWords.join(' ');
		this.setState({
			selectWords,
			selectWordsText
		});
	}

	renderWord(word, i) {
		return (
			<Text
				key={i}
				style={styles.word}
				onPress={() => {
					this.clickWord(i);
				}}
			>
				{word}
			</Text>
		);
	}

	render() {
		let currentStep = null;
		if (this.state.step == 'backup') {
			currentStep = (
				<View style={styles.container}>
					<View style={styles.warning}>
						<Text style={styles.warning_item}>
							·{I18n.t('assets.mnemonic.copyYourMnemonic')}
							{/* 抄写下你的助记词 */}
						</Text>
						<Text style={styles.color_999}>
							{I18n.t('assets.walletInfo.keystore_save_item')}
							{/* 请复制黏贴keystore文件到安全、离线的地方进行保存。 切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险。 */}
						</Text>
					</View>

					<TouchableHighlight style={styles.mnemonic_area}>
						<View>
							<Text style={styles.mnemonic}>{this.state.Mnemonic}</Text>
						</View>
					</TouchableHighlight>
					<Button
						title={this.state.backupBtnText}
						disabled={this.state.next}
						disabledStyle={styles.disabledButtonStyle}
						buttonStyle={styles.backupBtn}
						onPress={this.nextStep}
					/>
				</View>
			);
		}
		if (this.state.step == 'confirm') {
			currentStep = (
				<View style={styles.container}>
					<View style={styles.warning}>
						<Text style={styles.warning_item}>
							·{I18n.t('assets.mnemonic.confirmMnemonic')}
							{/* 确认你的钱包助记词 */}
						</Text>
						<Text style={styles.color_999}>
							{I18n.t('assets.mnemonic.confirmMnemonicWring')}
							{/* 请按顺序点击助记词，以确认你备份的助记词正确。 */}
						</Text>
					</View>
					<TouchableHighlight style={styles.mnemonic_area}>
						<View>
							<Text style={styles.mnemonic}>{this.state.selectWordsText}</Text>
						</View>
					</TouchableHighlight>
					<View style={styles.wordsCon}>{this.state.words}</View>
					<Button
						title={I18n.t('public.define')}
						buttonStyle={styles.backupBtn}
						onPress={this.confirmWords}
					/>
				</View>
			);
		}

		return <View style={styles.container}>{currentStep}</View>;
	}
}

export default withNavigation(ExportMnemonic);

const styles = StyleSheet.create({
	color_999: {
		color: '#959595',
		fontSize: 13,
		lineHeight: scaleSize(36),
		marginBottom: scaleSize(32)
	},
	container: {
		flex: 1,
		// padding: scaleSize(32),
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	warning: {
		width: scaleSize(686),
		marginTop: scaleSize(32)
	},
	warning_item: {
		color: '#4A90E2',
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: scaleSize(8)
	},
	mnemonic_area: {
		width: scaleSize(686),
		padding: scaleSize(32),
		backgroundColor: '#F1F1F1',
		borderRadius: scaleSize(8),
	},
	mnemonic: {
		lineHeight: 20
	},
	backupBtn: {
		backgroundColor: '#4A90E2',
		height: scaleSize(88),
		width: scaleSize(654),
		// borderColor: 'transparent',
		// borderWidth: 0,
		borderRadius: scaleSize(44),
		marginTop: scaleSize(100)
	},
	disabledButtonStyle: {
		borderRadius: 30
	},
	word: {
		backgroundColor: '#eee',
		color: '#555',
		paddingVertical: 10,
		paddingHorizontal: 6,
		margin: 8,
		borderRadius: 6
	},
	wordsCon: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 30,
		width: scaleSize(696)
	}
});
