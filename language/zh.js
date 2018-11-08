export default {
	guide: {
		welcome: '欢迎来到自游俱乐部',
		importWallet: '导入钱包',
		createWallet: '创建钱包',
		importInstructions: '在已有钱包中导出助记词，点击“导入钱包”，输入导出的助记词；导入钱包后请立即备份助记词。',
		createInstructions: '没有钱包，请点击“创建钱包”。创建钱包时，请牢记密码，创建钱包后请立即备份助记词。'
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
				mnemonic: '什么是助记词?',
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
            psdLogin: '密码登录',
            setPsd: '请设置您的登录密码',
            setPsdAgain: '请再次输入密码',
            twoPsdNoSame: '两次输入密码不同',
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
                inputPlaceholder: '请输入划转数量',
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
            hasSign: '已签到',
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
        },
        share: {
	        shareLink: '分享链接',
            wechat: '微信好友',
            friends: '朋友圈',
        }
    },
    product: {
	    _title: '产品',
	    home: {
	        insuranceProduct: '保险产品',
        },
        productInsurance: '账户安全险',
        productNavigation: '航延宝',
        productRaining: '上下班降雨险',
        productDetail: {
	        _title: '产品详情',
            buyBtn: '立即购买',
            productInsuranceTips: '*仅限SigmaIO平台账户',
            productNavigationTips: '*仅限中华人民共和国（不含港澳台）境内民航定期航班',
            productRainingTips: '*本保险需提前至少10天购买，最多购买20份',
            productInsuranceDetails: {
	            _title: '保障详情',
                content1: '保障钱包用户因网络账户或网络账户相关信息遗失、被盗用或被胁迫透露网络账户相关信息，导致的在正式挂失或冻结网络账户前72小时内的资金损失。',
                content2: '注：您兑换的保障合约生效时间以投保通知短信为准（24小时内）',
                note: '（单次事故免赔额200SIGM）'
            },
            productNavigationDetails: {
	            _title: '详情',
                content1: '国内航班延误最高获得',
                content2: '延误一分钟即获得',
                content3: '延误超过2小时再获得',
            },
            productRainingList: {
	            chooseProvince: '选择省份',
                chooseCity: '选择城市',
                guaranteeMonth: '保障月份',
                guaranteeMoney: '保障金额',
                threshold: '赔付阈值',
                buyNum: '购买份数',
            },
            writeOrder: {
	            _title: '填写订单',
                tips0: '*请输入投保信息',
                tips1: '*购买人年龄需在18-80周岁之间',
                tips2: '*请输入投保信息',
                address: '钱包地址',
                buyer: '购买人姓名',
                buyerPlaceholder: '请输入购买人姓名',
                id: '身份证号',
                idPlaceholder: '请输入身份证号码',
                email: '邮箱',
                emailPlaceholder: '请输入邮箱号码',
                deadline: '保障期限',
                deadlinePlaceholder1: '365天',
                deadlinePlaceholder2: '一个月',
                phone: '手机号码',
                phonePlaceholder: '请输入手机号码',
                flightData: '航班日期',
                flightDataPlaceholder: '请输入航班日期（20181002）',
                flightDataId: '航班号',
                flightDataIdPlaceholder: '请输入航班号',
                credentialsType: '证件类型',
                ID: '身份证',
                passport: '护照',
                credentialsId: '证件号码',
                credentialsIdPlaceholder: '请输入证件号码',
                IAgree: '我同意',
                guaranteeItems: '保障条款',
                insureShouldKnow: '投保须知',
                buyShouldKnow: '购买须知',
                productItems: '产品条款',
            },
            payCompleted: {
	            _title: '支付完成',
                paySuccess: '支付成功',
                payFail: '支付失败',
                backToHome: '返回首页',
                repay: '重新支付',
                showDetail: '查看详情',
            }
        }
    },
    my: {
	    login: '登录/注册',
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
            guaranteeAmountMax: '最高保障金额',
            buyer: '购买人',
            id: '身份证号码',
            email: '邮箱',
            guaranteeDeadline: '保障期限',
            phone: '手机号码',
            orderAmount: '订单金额',
            guaranteeAddress: '保障地址',
            flight: '航班',
            flightStartDate: '计划起飞时间',
            guaranteeCity: '保障城市',
            guaranteeMonth: '保障月份',
            threshold: '理赔阈值',
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
        },
        protocolsPart: {
            _title: '使用协议',
            _title1: '《SigmaIO服务协议》',
            _title2: '最近更新于：2018年10月26日',
        },
        aboutUsPart: {
	        protocols: '使用协议',
            policy: '隐私条款',
            release: '版本日志',
            update: '更新新版本',
            updatePart: {
	            tips: '检测到新版本',
                notUpdateBtn: '暂不更新',
                updateBtn: '立即更新',
            },
        },
        suggestPart: {
	        textAreaPlaceholder: '请提出您宝贵的意见，以便为您提供更好的服务',
            inputPlaceholder: 'QQ/手机号/邮箱',
        }
    },
	public: {
		second: '秒',
		next: '下一步',
        finish: '完成',
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
        getCodeAgain: '重新获取',
        getCodeWait: 's后重试',
        agreeBtn: '确认',
        codePlaceholder: '请输入验证码',
        phone: '手机号',
        phonePlaceholder: '请输入手机号',
        serverPolicies: '《服务条款》',
        mnemonicTitle: '什么是助记词',
	},
    error: {
        passwordWrong: '密码错误',
        codeWrong: '验证码错误',
        deviceNotExists: '矿机不存在',
		deviceCodeWrong: '矿机code错误',
		deviceBound: '您输入的矿机号已被绑定',
		codeNumberLimited: '您当前发送的短信已超过本时效限制，请稍后再试',
        noNetwork: '网络未连接',
        noNetworkPageTxt: '当前未连接到网络，请重试',
        tryAgain: '点我重试',
        pleaseSelectAgree: '请勾选我同意',
        orderNotFill: '您当前的信息未填写完全',
        wechatNotInstall: '没有安装微信软件，请您安装微信之后再试',
        requestTimeOut: '请求超时',
    }
};
