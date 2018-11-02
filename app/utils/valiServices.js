import { I18n } from '../../language/i18n';
// 验证手机号、邮箱 
export function checkAccount(account) {
  const phone = /^1\d{10}$/;
  const email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return new Promise(function(resolve, reject) {
    if (account.length > 0 && ( phone.test(account) || email.test(account))) {
      resolve(account);
    } else if (account.length === 0) {
      reject('手机不能为空');
    } else {
      reject('手机格式错误');
    }
  });
}

// 验证钱包
export function checkWalletName(walletName) {
  return new Promise(function(resolve, reject) {
    walletName = walletName.trim();
    if (walletName.length === 0) {
      reject(I18n.t('wallet.createWalletTip'));
    } else if (walletName.length > 15) {
      reject('钱包名称不能为超过15个字符');
    } else {
      resolve(walletName);
    }
  });
}

// ---------验证密码----------

export function checkPwd(pwd) {
  return new Promise(function(resolve, reject) {
    pwd = pwd.trim();
    const regExp = /\s/;
    if (pwd.length >= 6 && pwd.length <=18 && !regExp.test(pwd)) {
      resolve(pwd);
    } else if (pwd.length === 0) {
      reject(I18n.t('wallet.enterPwd'));
    } else if (pwd.length < 6) {
      reject('密码不能小于六位,请重新输入');
    } else if (pwd.length > 18) {
      reject('密码不能大于十八位,请重新输入');
    } else if (regExp.test(pwd)) {
      reject('密码不能有空格');
    }
  });
}

export function checkTwoPwd(pwd, pwd2) {
  return new Promise(function(resolve, reject) {
    if (pwd !== pwd2) {
      reject(I18n.t('wallet.pwdIsWrong'));
    } else {
      resolve();
    }
  });
}

//验证是否同意协议
export function checkisAgress(isAgress) {
  return new Promise(function(resolve, reject) {
    if (!isAgress) {
      reject(I18n.t('wallet.agreeTerm'));
    } else {
      resolve();
    }
  });
}

//验证交易密码
export function checkPassword(pwd) {
  return new Promise(function(resolve, reject) {
    pwd = pwd.trim();
    const regExp = /^(?!\s)((?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).\S{7,})$/;
    const noRegExp = /[~!@#$%^&*?;:,.'"/]+/;
    if (pwd.length >= 8 && pwd.length <= 12 && regExp.test(pwd) && !noRegExp.test(pwd)) {
      resolve(pwd);
    } else if (pwd.length === 0) {
      reject(I18n.t('wallet.enterPwd'));
    } else if (pwd.length < 8) {
      reject('密码不能小于八位,请重新输入');
    } else if (pwd.length > 12) {
      reject('密码不能大于十二位,请重新输入');
    } else {
      reject('您当前输入的交易密码不符合规则，请重新输入');
    }
  });
}

// 验证验证码
export function checkCode(code) {
  return new Promise(function (resolve, reject) {
    code = code.trim();
    if (code.length === 0) {
      reject('验证码不能为空');
    } else if (code.length === 6) {
      resolve();
    } else {
      reject('验证码是六位数');
    }
  })
}

// 验证图片验证码
export function checkImgCode(code) {
    return new Promise(function (resolve, reject) {
        code = code.trim();
        if (code.length === 0) {
            reject('图片验证码不能为空');
        } else if (code.length !== 4) {
            reject('图片验证码是四位数');
        } else {
            resolve();
        }
    })
}

// 验证昵称，昵称仅仅支持中英文、数字
export function checkNickName(str) {
  const nickName = /^[a-z0-9\u4e00-\u9fa5]+$/igm;
  return new Promise(function (resolve, reject) {
    if (str.length < 2) {
      reject('昵称不能小于两个字');
    } else if (str.length > 8) {
      reject('昵称不能大于八个字');
    } else if (!nickName.test(str)) {
      reject('昵称仅支持中英文、数字');
    } else {
      resolve();
    }
  })
}

// 验证意见反馈内容
export function checkSuggestContent(content) {
    return new Promise((res, rej) => {
        content = content.trim();
        if (content.length === 0) rej('意见内容不能为空');
        else res();
    })
}

/**
 * 备注说明下下面这些不加空验证，是因为这些都是用在订单填写里的，
 * 订单填写有很多参数，我统一在代码前面就做了验证空的判断，
 * 格式验证我这里只打算验证其中几个参数，另外的一些参数就不进行格式验证了
 * by LXY
 */
// 验证手机号码, 只用做11位的长度判断
export function checkPhone(phone) {
    const regExp = /^1\d{10}$/;
    phone = phone.trim();
    return new Promise(function(res, rej) {
        if (regExp.test(phone)) res();
        else rej('手机格式错误');
    });
}

// 验证邮箱
export function checkEmail(email) {
    const regExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    email = email.trim();
    return new Promise(function(res, rej) {
        if (regExp.test(email)) res();
        else rej('邮箱格式错误');
    });
}

// 验证身份证号
export function checkIDNumber(id) {
    const regExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    id = id.trim();
    return new Promise(function(res, rej) {
        if (regExp.test(id)) res();
        else rej('身份证格式错误');
    });
}

// 验证用户输入的日期，必须是20181002这种形式
export function checkDate(date) {
    const regExp = /^[1-2][0-9][0-9][0-9]((1[0-2])|(0[1-9]))((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))$/;
    date = date.trim();
    return new Promise(function(res, rej) {
        if (regExp.test(date)) res();
        else rej('日期格式错误, 格式应如20181003');
    });
}