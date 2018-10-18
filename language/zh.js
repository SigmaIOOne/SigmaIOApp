export default {
	guide: {
		welcome: '欢迎来到自游俱乐部',
		importWallet: '导入钱包',
		createWallet: '创建钱包',
		importInstructions: '在已有钱包中导出助记词，点击“导入钱包”，输入导出的助记词；导入钱包后请立即备份助记词。',
		createInstructions: '没有钱包，请点击“创建钱包”，创建钱包时，请牢记您的密码；创建钱包后轻立即备份助记词。'
	},
	wallet: {
		mnemonic: '助记词',
        officialWalletPlaceholder: '直接复制粘贴以太坊官方钱包keystore 文件内容至输入框',
		mnemonicPlaceholder: '助记词,按空格分隔',
		officialWallet: '官方钱包',
		privateKey: '私钥',
        privateKeyPlaceholder: '请输入您的私钥',
		path: '路径',
        psdTitle1: '密码',
		enterPwd: '密码不少于8位字符',
        psdTitle2: '确认密码',
		confirmPwd: '请再次输入密码',
		creatWallet: '创建钱包',
		createWalletTip: '请输入钱包名称',
		pwdSuggest: '建议密码不少于8位字符',
		pwdIsWrong: '两次密码不一致',
		agreeTerm: '请同意服务及隐私条款',
		createWalletTipOfPwd: '密码用于加密私钥，强度非常重要！',
		createWalletTipOfNoStore: '自游链钱包不会储存密码，也无法帮您找回，请务必牢记！',
		// iAgreeTerm: '我已仔细阅读并同意',
		iAgreeTerm: '我已阅读并同意',
		term: '服务及隐私条款',
		mnemonicTip: '助记词首尾不能有空格,请重新输入',
		mnemonicIsWrong: '助记词有误，请重新输入',
		mnemonicIsNull: '助记词不能为空',
		privateKeyIsNull: '私钥不能为空',
		privateKeyIsWrong: '私钥有误，请重新输入',
		keystoreIsNull: '请输入keystore信息',
		wrongByKeystoreOrPwd: '导入钱包失败, 请检查keystore或者密码是否正确',
		copyKeystoreTip: '直接复制粘贴以太坊官方钱包keystore文件内容至输入框。'
	},
	tab: {
		assets: '资产',
		node: '挖矿',
		my: '我的'
	},
	myOld: {
        _title: '我的',
		home: {
			walletManagement: '钱包管理',
			transactionRecord: '我的操作',
			systemSetting: '系统设置',
			Versions: {
				_title: '版本日志'
			},
			//新加的
			invitationCode: {
				_title: '绑定邀请码',
                myInvitationCode: '我的邀请码',
                myBoundCode: '我绑定的邀请码',
                myBoundMember: '我绑定的用户',
                notBind: '还未绑定',
                button: '去绑定',
                myBinders: '我推荐的用户',
                noBinders: '还没有人使用',
                notUsed: '还未使用',
				codeNotExists: '推荐码不存在',
				circle:'您当前输入的邀请码不可用',
                userWrong: '请确保您已经绑定矿机',
                hasBound: '您已经绑定过推荐码',
                passwordWrong: '交易密码错误',
                numberLimited: '该推荐码已使用两次，您可以选择相关的推荐人：'
			},
            verificationCode: {
                _title: '短信验证码'
            },
			bindPhone: {
				_title: '绑定手机',
                bindPhoneNumber: '绑定的手机号',
                notBind: '还未绑定',
				button: '去绑定'
			},
			changePwd: {
				_title: '修改交易密码',
				bindPhoneNumber: '当前绑定的手机号',
				enterPassword: '输入验证码',
				pwdIsNull: '请输入验证码',
				getCodeWrong: '获取验证码失败',
				codeWrong: '验证码失败',
				userNotExists: '用户不存在'
			},
            bindingCode: {
                _title: '绑定邀请码',
                inputCode: '输入邀请码',
                pleaseInputCode: '请输入邀请码',
                codeUsed: '您当前输入的邀请码已被使用，请重新输入',
                getIt: '知道了'
            },
			helpCenter: {
				_title: '帮助中心',
				mnemonic: '什么是助记词',
				keystore: '什么是keystore',
				privateKey: '什么是私钥'
			},
			aboutUs: {
				_title: '关于我们',
				currentVersion: '当前版本',
				introduction: '自游俱乐部是一款移动端轻钱包APP,它旨在为普通用户提供一款安全放心，简单好用，功能强大的数字资产钱包应用。',
				useAgreement: '用户协议',
				privacyPolicy: '隐私条款',
				versionLog: '版本日志',
				checkVersion: '检测新版'
			}
		},
		sysSetting: {
			_title: '系统设置',
			language: {
				_title: '语言设置',
				multi_language: '多语言',
				changeToChinese: '简体中文',
				changeToEnglish: 'English'
			},
            jnb: {
                _title: 'JNB 交易所设置',
                alert: '请等待交易所上币后开启'
            }
		},
		version: {
			_newVersion: '发现GoGlobe',
			_version: '版本',
			upgradeNow: '立即升级',
			noEscalation: '暂不升级',
			noUpdate: '当前已是最新版本，无需更新'
		},
		webHost: 'Web3 设置',
        // lxy新增
        topCard: {
            logout1: '退出登录',
            logout2: '退出'
        },
        message: {
            _title: '消息中心'
        },
        myOrders: {
            _title: '我的订单',
            orderId: '订单号',
            account: '账户安全险',
            payCompleted: '支付完成',
            hyb: '航延宝',
            orderDetail: {
                _title: '订单详情',
                applyCompensation: '申请理赔',
                guaranteeAmount: '保障金额',
                buyer: '购买人',
                idNumber: '身份证号码',
                email: '邮箱',
                guaranteeDuration: '保障期限',
                phone: '手机号码',
                orderAmount: '订单金额'
            }
        },
        compensationProcess: {
            _title: '理赔流程',
            step1: {
                _title: '(一)报案环节:',
                content1: '1、被保障人或其代表应在保障事故发生之日起 24 小时内通知SigmaIO,否则对于无法确定的部分,SigmaIO不承担赔偿责任;',
                content2: '2、为更好的保证案件处理的及时性及核定损失的准确性,报案时需提供事故当事人或知情人的联络方式。'
            },
            step2: {
                _title: '(二)查勘环节:',
                content1: '1、客户将相片上传至我司后,查勘定损岗第一时间审核相关资料相片,通过审核相片和询问案情;',
                content2: '2、根据案件具体情况确定查勘工作内容,例如查勘现场。被保障人须配合查勘工作。'
            },
            step3: {
                _title: '(三)提交理赔资料: ',
                content: '发送损失照片(需标注被保障人姓名)至客服邮箱 sigmaio.one@gmail.com;'
            },
            step4: {
                _title: '(四)领取保障金:',
                content: '对符合保障责任的,资料审核通过后一般赔案 3 个工作日内通知支付赔款、情形复杂赔案 7 个工作日内通知支付赔款。'
            }
        },
        compensation: {
            _title: '申请理赔',
            orderId: '订单号',
            account: '账户安全险',
            hyb: '航延宝',
            compensationManually: '手动理赔',
            compensationAuto: '自动理赔'
        },
        dataUploadRecord: {
            _title: '数据上传记录',
            drivingDuration: '驾驶时长',
            noFatigueDriving: '无疲劳驾驶',
            noOffCourse: '未偏离行驶路线',
            noOverdrive: '无超速报警',
            noDanger: '无危险警告'
        },
        security: {
            _title: '安全中心',
            bindPhone: '绑定手机',
            authenticationID: '认证身份',
            notBound: '未绑定',
            hasBound: '已绑定',
            notCertified: '未认证',
            certifyErr: '审核未通过，请重新认证',
            phone: '手机号',
            phonePlaceholder: '请输入手机号',
            name: '姓名',
            namePlaceholder: '请输入姓名',
            idNumber: '身份证号码',
            idNumberPlaceholder: '请输入身份证号码'
        },
        // 未完待续
        aboutUs: {
            _title: '关于我们',
            usingProtocol: '使用协议',
            privacy: '隐私条款',
            versionLogging: '版本日志',
            updateVersion: '更新新版本',
            hint1: '当前已为最新版本',
            hint2: '检测到新版本',
            btn1: '暂不更新',
            btn2: '立即更新'
        },
        feedback: {
            _title: '意见反馈'
        }
	},
	assets: {
        _title: '我的钱包',
        findNewVersion: '发现新版本',
		totalAssets: '账户总资产',
        notUpdate: '暂不升级',
        update: '立即升级',
		walletInfo: {
			_title: '钱包管理',
			walletName: '钱包名称',
			enterWalletName: '请输入新的钱包名称',
			exportPrivateKey: '导出私钥',
			exportKeystore: '导出keystore',
			exportMnemonic: '导出助记词',
			deleteWallet: '删除钱包',
			keystoreFile: 'Keystore文件',
			qrcode: '二维码',
			privateKeyWarning: '安全警告:私钥未经加密，导出存在风险，建议使用助记词和keystore进行备份',
			copyPrivaateKey: '复制私钥',
			copyKeystore: '复制Keystore',
			keystore_save: '离线保存',
			keystore_save_item: '请复制粘贴keystore文件到安全、离线的地方进行保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险',
			keystore_network: '请勿使用网络传输',
			keystore_network_item: '请勿通过网络工具传输 keystore 文件，一但被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输。',
			keystore_pwdsave: '密码保险箱保存',
			keystore_pwdsave_item: '如需在线保存，则建议使用安全等级更高的 1Password 等密码保管软件保存 keystore。',
			keystore_scanning: '仅供直接扫描',
			keystore_scanning_item: '二维码禁止保存、截图以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包。',
			keystore_surround: '在安全的环境下使用',
			keystore_surround_item: '请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取讲造成不可挽回的资产损失。'
		},
		mnemonic: {
			backUpMnemonic: '请备份您的助记词',
			mnemonicSuccess: '助记词正确,请妥善保管您的助记词！',
			mnemonicError: '助记词有误，请重新输入',
			copyYourMnemonic: '抄写下你的助记词',
			confirmMnemonic: '确认你的钱包助记词',
			mnemonicWring: '助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方。',
			confirmMnemonicWring: '请按顺序点击助记词，以确认你备份的助记词正确。'
		},
		currency: {
			transfer: '转账',
			orderInformation: '订单信息',
			recentTradeRecord: '近期交易记录',
			receipt: '收款',
			receiptAddr: '收款人钱包地址',
            receiptAddrPlaceholder: '复制粘贴或右上角扫一扫',
			transferCount: '转账金额',
			transferCountPlaceholder: '输入转账金额',
			transferRemarks: '备注',
			transferRemarksPlaceholder: '输入备注(可不填)',
			transferFee: '矿工费用',
			transferSpeedSlow: '慢',
			transferSpeedFast: '快',
			nextStep: '下一步',
			copyReceiptAddr: '复制钱包地址'
		},
		transfer: {
			checkAddress: '地址无效，请仔细检查！',
			transferInAddress: '转入地址',
			transferOutAddress: '转出地址'
		},
	},
    sigm: {
	    login: '登录',
        totalAsset: '总资产',
        totalProfit: '累计收益',
        minerAccount: '挖矿账户',
        waitingGet: '待领取',
        immediatelyGet: '马上收取',
        loginPart: {
	        phonePlaceholder: '请输入您的邮箱或手机号',
            psdPlaceholder: '请输入密码',
            loginBtn: '立即登录',
            findPsdBtn: '忘记密码',
            registerBtn: '立即注册',
            findPsdPart: {
                accountPlaceholder: '请输入您的注册时的邮箱或手机号',
                codePlaceholder: '请输入邮箱或手机验证码',
                getCode: '获取验证码',
                newPsdPlaceholder: '请设置新的登录密码',
                checkPsdPlaceholder: '请再次输入密码',
                finishBtn: '完成',
            },
            registryPart: {
                accountPlaceholder: '请输入您的邮箱或手机号',
                imgCode: '请输入图片验证码',
                phoneCode: '请输入邮箱或手机验证码',
                registryBtn: '立即注册'
            }
        },
        accountDetail: {
	        _title: '账户详情',
            allAssets: '全部资产',
            transactionRecord: '交易记录',
            mainAccount: '主账户',
            withdraw: '提取',
            minerAccount: '挖矿账户',
            transfer: '划转',
            withdrawModal: {
	            text1: '今日提取',
                text2: '手续费',
                inputPlaceholder: '请输入提取数额',
                tip: '由SIGM账户提取到资产账户',
                checkBtn: '确认提取',
            },
            transferModal: {
	            text: '今日可划转',
                tip: '系统会根据您的注册时间、活跃数据、好友 数据综合自动评估当天、当次最高划转SIGM数量',
                checkBtn: '确认划转'
            },
            transactionRecordPart: {
	            noRecord: '暂无交易记录'
            },
        },
        miningPart: {
            _title: '挖矿',
            minerAssets: '挖矿资产',
            transfer: '划转',
            mining: '挖矿中',
            miningStrategy: '挖矿攻略',
            realTimeDeposit: '我的实时算力',
            allDeposit: '全网算力',
            depositRank: '我的算力排行',
            signIn: '今日签到',
            getDeposit: '获取算力',
            miningStrategyPart: {
                whatDeposit: '什么是算力？',
                depositDescription: '算力是用户获取SIGM的影响因子，算力越高。每次出矿分得的SIGM越多',
                howDeposit: '如何提高算力？',
                wayDescription: '完成任务如每天登陆、连续登陆，邀请好友，认证身份，绑定车辆等会增加算力',
            },
            transferPart: {
                today: '今日可划转',
                tips: '系统会根据您的注册时间、活跃数据、好友 数据综合自动评估当天、当次最高划转SIGM数量',
                btn: '确认划转',
            },
            getDepositPart: {
                bindCar: '绑定车辆',
                bindCarDescription1: '绑定车辆信息',
                bindCarDescription2: '+40基础算力',
                bindCarBtn1: '去绑定',
                bindCarBtn2: '已绑定',
                daylySignIn: '每日签到',
                daylyDescription1: '每日签到奖励',
                daylyDescription2: '+20基础算力',
                daylyBtn1: '去签到',
                daylyBtn2: '已签到',
                inviteFriends: '邀请好友',
                inviteDescription1: '邀请一个好友',
                inviteDescription2: '+10基础算力',
                inviteBtn1: '去邀请',
                inviteBtn2: '已邀请',
                certificate: '认证身份',
                certificateDescription1: '完成身份认证',
                certificateDescription2: '+200基础算力',
                certificateBtn1: '去认证',
                certificateBtn2: '已认证',
                registry: '注册用户',
                registryDescription1: '完成注册',
                registryDescription2: '+100基础算力',
                registryBtn1: '去注册',
                registryBtn2: '已注册',
            },
            bindCar: {
                listTips1: '*绑定车辆+20算力',
                carId: '车牌号',
                carIdPlaceholder: '请输入车牌号',
                carColor: '车牌颜色',
                carColorPlaceholder: '请输入车辆颜色（如：黄底白字）',
                engineId: '发动机号',
                engineIdPlaceholder: '请输入发动机号',
                carriageId: '车架号',
                carriageIdPlaceholder: '请输入车架号',
                listTips2: '*绑定保单+20算力',
                insuranceCompany: '保险公司',
                insuranceCompanyPlaceholder: '请输入所投保的保险公司',
                insuranceId: '保单号',
                insuranceIdPlaceholder: '请输入保单号',
                insurancePeople: '被保险人名称',
                insurancePeoplePlaceholder: '请输入被保险人名字',
                insurancePeopleId: '被保险人身份证号码 或单位组织机构代码',
                insurancePeopleIdPlaceholder: '请输入号码',
                area: '地区',
                areaPlaceholder: '请输入地区',
                btn: '确认',
            },
            inviteFriends: {
                code: '邀请码',
                copy: '复制',
                leftBtn: '分享邀请链接',
                rightBtn: '分享邀请海报',
            }
        }
    },
    my: {
	    logout: '退出登录',
        message: '消息中心',
        order: '我的订单',
        applyCompensation: '申请理赔',
        uploadRecord: '数据上传记录',
        security: '安全中心',
        aboutUs: '关于我们',
        suggest: '意见反馈',
        noRecord: '暂无记录',
        paySuccess: '支付完成',
        orderDetails: {
	        _title: '订单详情',
            insurance: '账户安全险',
            guaranteeAmount: '保障金额',
            buyer: '购买人',
            id: '身份证号码',
            email: '邮箱',
            guaranteeDeadline: '保障期限',
            phone: '手机号码',
            orderAmount: '订单金额',
            guaranteeAddress: '保障地址',
        },
        applyCompensationContent: {
            _title: '理赔流程',
            title1: '(一)报案环节:',
            text1_1: '1、被保障人或其代表应在保障事故发生之日起 24 小时内通知SigmaIO,否则对于无法确定的部分,SigmaIO不承担赔偿责任;',
            text1_2: '2、为更好的保证案件处理的及时性及核定损失的准确性,报案时需提供事故当事人或知情人的联络方式。',
            title2: '(二)查勘环节:',
            text2_1: '1、客户将相片上传至我司后,查勘定损岗第一时间审核相关资料相片,通过审核相片和询问案情;',
            text2_2: '2、根据案件具体情况确定查勘工作内容,例如查勘现场。被保障人须配合查勘工作。',
            title3: '(三)提交理赔资料: ',
            text3: '发送损失照片(需标注被保障人姓名)至客服邮箱 sigmaio.one@gmail.com；',
            title4: '(四)领取保障金:',
            text4: '对符合保障责任的,资料审核通过后一般赔案 3 个工作日内通知支付赔款、情形复杂赔案 7 个工作日内通知支付赔款。',
        },
        applyCompensationPart: {
	        // id: '订单号：',
            type: '手动理赔',
        },
        securityPart: {
	        bindPhone: '绑定手机',
            bindTxt1: '未绑定',
            bindTxt2: '已绑定',
            certificate: '认证身份',
            certificateTxt1: '未认证',
            certificateTxt2: '已认证',
            certificatePart: {
	            name: '姓名',
                namePlaceholder: '请输入姓名',
                certificateId: '身份证号码',
                certificateIdPlaceholder: '请输入身份证号码',
            }
        },
        serverPoliciesPart: {
	        _title: '隐私条款',
            _title1: '《SigmaIO隐私政策》',
            _title2: '最近更新于：2018年10月26日',
            content: '尊敬的用户： SigmaIO Limited.（以下简称“SigmaIO”或“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，您使用SigmaIO时，SigmaIO将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。 SigmaIO建议您在使用本产品（以下简称“SigmaIO”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与SigmaIO《SigmaIO服务协议》保持一致。 本政策可由SigmaIO在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用SigmaIO，您继续使用SigmaIO将被视为接受修改后的政策。经修改的政策一经在SigmaIO上公布，立即自动生效。 您知悉本政策及其他有关规定适用于SigmaIO及SigmaIO上SigmaIO所自主拥有的DApp。 一、 我们收集您的哪些信息 请您知悉，我们收集您的以下信息是出于满足您在SigmaIO服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您知悉，若您不提供我们服务所需的相关信息，您在SigmaIO的服务体验可能因此而受到影响。 • 1. 我们将收集您的移动设备信息、操作记录、交易记录、钱包地址等个人信息。 • 2. 为满足您的特定服务需求，我们将收集您的姓名、银行卡号、手机号码、邮件地址等信息。 • 3. 您知悉：您在SigmaIO 上的钱包密码、私钥、助记词、Keystore并不存储或同步至SigmaIO服务器。SigmaIO不提供找回您的钱包密码、私钥、助记词、Keystore的服务。 • 4. 除上述内容之外，您知悉在您使用SigmaIO特定功能时，我们将在收集您的个人信息前向您作出特别提示，要求向您收集更多的个人信息。如您选择不同意，则视为您放弃使用SigmaIO该特定功能。 • 5. 当您跳转到第三方DApp后，第三方DApp会向您收集个人信息。SigmaIO不持有第三方DApp向您收集的个人信息。 • 6. 在法律法规允许的范围内，SigmaIO可能会在以下情形中收集并使用您的个人信息无需征得您的授权同意： （1） 与国家安全、国防安全有关的； （2） 与公共安全、公共卫生、重大公共利益有关的； （3） 与犯罪侦查、起诉、审判和判决执行等有关的； （4） 所收集的个人信息是您自行向社会公众公开的； （5） 从合法公开披露的信息中收集您的个人信息，如合法的新闻报道，政府信息公开等渠道； （6） 用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障； （7） 法律法规规定的其他情形。 • 7. 我们收集信息的方式如下： （1） 您向我们提供信息。例如，您在“个人中心”页面中填写姓名、手机号码或银行卡号，或在反馈问题时提供邮件地址，或在使用我们的特定服务时，您额外向我们提供。 （2） 我们在您使用SigmaIO的过程中获取信息，包括您移动设备信息以及您对SigmaIO的操作记录等信息； （3） 我们通过区块链系统，拷贝您全部或部分的交易记录。但交易记录以区块链系统的记载为准。 二、 我们如何使用您的信息 • 1. 我们通过您移动设备的唯一序列号，确认您与您的钱包的对应关系。 • 2. 我们将向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更。 • 3. 我们在SigmaIO的“系统设置”中为您提供“指纹登录”选项，让您方便且更安全地管理您的数字代币。 • 4. 我们通过收集您公开的钱包地址和提供的移动设备信息来处理您向我们提交的反馈。 • 5. 我们收集您的个人信息进行SigmaIO内部审计、数据分析和研究等，以期不断提升我们的服务水平。 • 6. 依照《SigmaIO服务协议》及SigmaIO其他有关规定，SigmaIO将利用用户信息对用户的使用行为进行管理及处理。 • 7. 法律法规规定及与监管机构配合的要求。 三、 您如何控制自己的信息 您在SigmaIO中拥有以下对您个人信息自主控制权： • 1. 您可以通过同步钱包的方式，将您的其他钱包导入SigmaIO中，或者将您在SigmaIO的钱包导入到其他数字代币管理钱包中。SigmaIO将向您显示导入钱包的信息。 • 2. 您知悉您可以通过“资产”版块内容修改您的数字代币种类、进行转账及收款等活动。 • 3. 您知悉在SigmaIO“我”的版块您可以自由选择进行如下操作： （1） 在“联系人”中，您可以随时查看并修改您的“联系人”； （2） 在“系统设置”中，您可以选择不开启“指纹登录”选项，即您可以选择不使用苹果公司提供的Touch ID验证服务； （3） 在“个人中心”中，您并不需要提供自己的姓名、手机号码、银行卡等信息，但当您使用特定服务时，您需要提供以上信息； （4） 在“提交反馈”中，您可以随时向我们提出您对SigmaIO问题及改进建议，我们将非常乐意与您沟通并积极改进我们的服务。 • 4. 您知悉当我们出于特定目的向您收集信息时，我们会提前给予您通知，您有权选择拒绝。但同时您知悉，当您选择拒绝提供有关信息时，即表示您放弃使用SigmaIO的有关服务。 • 5. 您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。 • 6. 您知悉当您使用SigmaIO的功能跳转至第三方DApp之后，我们的《SigmaIO服务协议》、《SigmaIO隐私政策》将不再适用，针对您在第三方DApp上对您个人信息的控制权问题，我们建议您在使用第三方DApp之前详细阅读并了解其隐私规则和有关用户服务协议等内容。 • 7. 您有权要求我们更新、更改、删除您的有关信息。 • 8. 您知悉我们可以根据本政策第一条第6款的要求收集您的信息而无需获得您的授权同意。 四、 我们可能分享或传输您的信息 • 1. SigmaIO在中华人民共和国境内收集和产生的用户个人信息将存储在中华人民共和国境内的服务器上。若SigmaIO确需向境外传输您的个人信息，将在事前获得您的授权，且按照有关法律法规政策的要求进行跨境数据传输，并对您的个人信息履行保密义务。 • 2. 未经您事先同意，SigmaIO不会将您的个人信息向任何第三方共享或转让，但以下情况除外： （1） 事先获得您明确的同意或授权； （2） 所收集的个人信息是您自行向社会公众公开的； （3） 所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道； （4） 与SigmaIO的关联方共享，我们只会共享必要的用户信息，且受本隐私条款中所声明的目的的约束； （5） 根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供； （6） 在涉及合并、收购时，如涉及到个人信息转让，SigmaIO将要求个人信息接收方继续接受本政策的约束。 五、 我们如何保护您的信息 • 1. 如SigmaIO停止运营，SigmaIO将及时停止继续收集您个人信息的活动，将停止运营的通知公告在SigmaIO上，并对所持有的您的个人信息在合理期限内进行删除或匿名化处理。 • 2. 为了保护您的个人信息，SigmaIO将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。 • 3. 我们将在SigmaIO“消息中心”中向您发送有关信息安全的消息，并不时在SigmaIO“帮助中心”版块更新钱包使用及信息保护的资料，供您参考。 六、 对未成年人的保护 我们对保护未满18周岁的未成年人做出如下特别约定： • 1. 未成年人应当在父母或监护人指导下使用SigmaIO相关服务。 • 2. 我们建议未成年人的父母和监护人应当在阅读本政策、《SigmaIO服务协议》及我们的其他有关规则的前提下，指导未成年人使用SigmaIO。 • 3. SigmaIO将根据国家相关法律法规的规定保护未成年人的个人信息的保密性及安全性。 七、 免责声明 • 1. 请您注意，您通过SigmaIO接入第三方DApp后，将适用该第三方DApp发布的隐私政策。该第三方DApp对您个人信息的收集和使用不为SigmaIO所控制，也不受本政策的约束。SigmaIO无法保证第三方DApp一定会按照SigmaIO的要求采取个人信息保护措施。 • 2. 您应审慎选择和使用第三方DApp，并妥善保护好您的个人信息，SigmaIO对其他第三方DApp的隐私保护不负任何责任。 • 3. SigmaIO将在现有技术水平条件下尽可能采取合理的安全措施来保护您的个人信息，以避免信息的泄露、篡改或者毁损。SigmaIO系利用无线方式传输数据，因此，SigmaIO无法确保通过无线网络传输数据的隐私性和安全性。 八、 其他 • 1. 如您是中华人民共和国以外的用户，您需全面了解并遵守您所在司法辖区与使用SigmaIO服务所有相关法律、法规及规则。 • 2. 您在使用SigmaIO服务过程中，如遇到任何有关个人信息使用的问题，您可以通过在SigmaIO提交反馈等方式联系我们。 • 3. 您可以在SigmaIO中查看本政策及SigmaIO其他服务规则。我们鼓励您在每次访问SigmaIO时都查阅SigmaIO的服务协议及隐私政策。 • 4. 本政策的任何译文版本仅为方便用户而提供，无意对本政策的条款进行修改。如果本政策的中文版本与非中文版本之间存在冲突，应以中文版本为准。 • 5. 本政策自2018年10月26日起适用。 本政策未尽事宜，您需遵守SigmaIO不时更新的公告及相关规则。 SigmaIO Limited. ',
        }
    },
	node: {
        miner: '矿机',
        minerCount: '矿机数',
        totalPower: '总算力',
        dailyProducts: '每日产出',
        withdrawCash: '提现',
        balance: '当前持有(GOG)',
        power: '算力',
        id: '编号',
        status: '状态',
        active: '激活',
        inactive: '未激活',
        dailyProduct: '日产出',
        address: '地点',
        registerMiner: {
            _title: '绑定矿机',
			inputMinerNumber: '输入矿机编号',
			inputMinerCode: '输入矿机code',
            emptyNoError: '矿机编号不能为空，请重新输入',
            emptyCodeError: '矿机code不能为空，请重新输入',
            failedError: '绑定失败，请重新输入',
            inputTradingPwd: '输入交易密码'
		},
		powerRule: {
            _title: '算力规则',
            rule1: '1、算力分解后不可充值，请谨慎操作。 ',
            rule2: '2、每次提币的手续费为1%提现数额。 ',
            rule3: '3、请不要直接提现到ICO的众筹地址，这会导致您无法收取众筹到的数字资产。',
            rule4: '4、提币到合约地址可能会导致交易失败，将导致转账失败，资产将退回到GOG。GOG会人工处理将币转回到原账户。 ',
            rule5: '5、网络转账费用及时间是不固定的，取决于转账时合约执行需要消耗的算力。当前支付的Gas limit为90000，用于执行转账或合约执行。如果此次转账消耗超过90000gas，将导致转账失败，资产将退回到GOG。',
            rule6: '6、请务必确认电脑及手机安全，防止信息被泄露或篡改。'
        },
        withdrawRule: {
            _title: '提币规则',
            rule1: '1、每次提现不可少于3000GOG。',
            rule2: '2、每次提币的手续费为1%提现数额。',
            rule3: '3、请不要直接提现到ICO的众筹地址，这会导致您无法收取众筹到的数字资产。',
            rule4: '4、提币到合约地址可能会导致交易失败，将导致转账失败，资产将退回到GOG。GOG会人工处理将币转回到原账户。 ',
            rule5: '5、网络转账费用及时间是不固定的，取决于转账时合约执行需要消耗的算力。当前支付的Gas limit为90000，用于执行转账或合约执行。如果此次转账消耗超过90000gas，将导致转账失败，资产将退回到GOG。',
            rule6: '6、请务必确认电脑及手机安全，防止信息被泄露或篡改。'
        },
        setPassword: {
            _title: '设置交易密码',
            tip1: '1.交易密码必须有大写字母、小写字母、数字，禁止使 用符号',
            tip2: '2.交易密码限定在8-12位之间',
			setPassword: '设置交易密码',
			setNewPassword: '设置新交易密码',
            confirmPassword: '确认交易密码',
            placehoder1: '字母、数字组合 8-12位之间',
            placehoder2: '请重复输入交易密码'
		},
		powers: {
			_title: '分解算力',
			powerRule: '算力规则',
			powerAmount: '算力数量',
			powerFee: '收取1%手续费',
			availableBalance: '手续费',
			powerAll: '全部',
			receivedAmount: '实际到账数量',
			powerToken: '分解'
		},
        withdraw: {
            _title: '提现',
            withdrawRule: '提币规则',
            withdrawAmount: '提币数量',
            withdrawFee: '收取1%手续费',
            availableBalance: '可用余额',
            withdrawAll: '全部提现',
            receivedAmount: '实际到账数量',
            withdrawToken: '提币'
		},
		moreInfo: {
			_title: '矿机信息'
		}
	},
	public: {
		second: '秒',
		next: '下一步',
        check: '确认',
		back: '返回',
		save: '保存',
		payDetail: '确认交易详情',
		enterPassword: '输入密码',
		lockedWarehouse: '锁仓',
		lockedWarehouseAddr: '锁仓地址',
		transferIn: '转入',
		transferOut: '转出',
		verifyPwd: '输入密码',
		inputPwd: '输入您的密码',
		PwdIsNull: '请输入密码',
		OK: '确定',
		define: '确定',
		cancel: '取消',
        copy: '复制',
		copySuccess: '复制成功',
		copyFailed: '复制失败',
		wrongPwd: '密码错误,请重新输入',
		transactionSuccess: '发布交易成功！',
		transactionFailed: '发布交易失败，请稍后重试！',
		score: '分',
		tickets: '票',
		enterMobile: '请输入手机号',
		enterCaptcha: '输入图片验证码',
		enterMobileCode: '输入手机验证码',
		getMobileCode: '获取验证码',
		captchaError: '图形验证码错误,请重新验证!',
		hasBind: '该手机号已绑定地址',
		verificationCodeError: '手机验证码错误',
		enter_the_legal_mobile_number: '请输入合法手机号',
		walletName: '钱包名称',
		nickName: '昵称',
		personaNickName: '个人昵称',
		personalSign: '个人信息',
		scan: '扫描',
		refuse: '拒绝',
		agree: '同意',
		mnemonic:
			'助记词是明文私钥的另一种表现形式, 最早是由 BIP39 提案提出, 其目的是为了帮助用户记忆复杂的私钥 (64位的哈希值)。助记词一般由12、15、18、21个单词构成, 这些单词都取自一个固定词库, 其生成顺序也是按照一定算法而来, 所以用户没必要担心随便输入 12 个单词就会生成一个地址。虽然助记词和 Keystore 都可以作为私钥的另一种表现形式, 但与 Keystore 不同的是, 助记词是未经加密的私钥, 没有任何安全性可言, 任何人得到了你的助记词, 可以不费吹灰之力的夺走你的资产。所以在用户在备份助记词之后, 一定要注意三点:1. 尽可能采用物理介质备份, 例如用笔抄在纸上等, 尽可能不要采用截屏或者拍照之后放在联网的设备里, 以防被黑客窃取 2. 多次验证备份的助记词是否正确, 一旦抄错一两个单词, 那么将对后续找回正确的助记词带来巨大的困难; 3. 将备份后的助记词妥善保管, 做好防盗防丢措施。',
		mnemonic_ps: 'PS: 用户可以使用备份的助记词, 重新导入自游俱乐部钱包 , 用新的密码生成一个新的 Keystore, 用这种方法来修改钱包密码。',
		keystore:
			'Keystore 文件是以太坊钱包存储私钥的一种文件格式(JSON) 。它使用用户自定义密码加密，以起到一定程度上的保护作用, 而保护的程度取决于用户加密该钱包的密码强度, 如果类似于 123456 这样的密码, 是极为不安全的。 在使用 Keystore 时有两点需要注意: 1. 使用不常用, 并且尽可能复杂的密码加密 Keystore文件; 2. 一定要记住加密 Keystore 的密码, 一旦忘记密码, 那么你就失去了 Keystore 的使用权, 并且自游俱乐部钱包 无法帮你找回密码, 所以一定要妥善保管好 Keystore 以及密码。 下面是 keystore 的样式: { "version": 3, "id": "b7467fcb-3c8b-41be-bccf-73d43a08c1b7", "address": "540f18196da5a533fa36577a81de55f0a2f4e751", "Crypto": { "ciphertext": "78ed11b8b6bf29b00f52b42b8542df0e4a6ac078e626af7edcf885c3b68154a4", "cipherparams": { "iv": "4516579601d96695fe30ace985a9066f" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "6276cfda7d40872352c801db5871e5a3368a8d0994cea39ed936760db78d1cdc", "n": 1024, "r": 8, "p": 1 }, "mac": "d889a5dc609c3f312a41394cc47640676d2612501a6f8c837ed55598158336db" } }。',
		keystore_ps: ' PS: Keystore 的密码是唯一、不可更改的, 如果想更改钱包密码需要使用助记词或明文私钥重新导入钱包, 并使用新密码加密, 生成新的 Keystore。',
		privateKey:
			'我们常说，你对钱包中资金的控制取决于相应私钥的所有权和控制权。在区块链交易中, 私钥用于生成支付货币所必须的签名，以证明资金的所有权。私钥必须始终保持机密，因为一旦泄露给第三方，相当于该私钥保护下的资产也拱手相让了。它不同于 Keystore，Keystore 是加密过后的私钥文件，只要密码强度足够强，即使黑客得到 Keystore，破解难度也足够大。 私钥实际上并不是存储在网络中，而是由用户生成并存储在一个文件或者简单的数据库中，称为钱包。存储在用户钱包中的私钥完全独立，可由用户的钱包软件生成并管理，无需区块链或者网络连接。用户的钱包地址就是由私钥通过椭圆曲线加密生成公钥，进而生成以 0x 开头的 42 位地址。私钥的样式为 64 位 16 进制的哈希值字符串，例如: 56f759ece75f0ab1b783893cbe390288978d4d 4ff24dd233245b4285fcc31cf6。',
		privateKey_ps: 'PS: 用户可以使用明文私钥导入自游俱乐部，用新的密码生成一个新的 Keystore (记得要将旧的 Keystore 删除)，用这种方法来修改钱包密码。',
        // lxy新增
        today: '今天',
        code: '验证码',
        getCode: '获取验证码',
        agreeBtn: '确认',
        codePlaceholder: '请输入验证码',
        phone: '手机号',
        phonePlaceholder: '请输入手机号',
        serverPolicies: '《服务条款》'
	},
    error: {
        passwordWrong: '密码错误',
        codeWrong: '验证码错误',
        deviceNotExists: '矿机不存在',
		deviceCodeWrong: '矿机code错误',
		deviceBound: '您输入的矿机号已被绑定',
		codeNumberLimited: '您当前发送的短信已超过本时效限制，请稍后再试'
    }
};
