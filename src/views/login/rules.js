export const mobileRules = [
  { required: true, message: '请填手机号' },
  { pattern: /^1[0-9]\d{9}$/, message: '手机号格式不合法' }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^[0-9]{6}$/, message: '验证码格式不正确' }
]
