export const validateFullName = (name: string) =>
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s W,']+$/g.test(
    name
  )

export const checkExistEmoji = (text: string) =>
  !/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu.test(
    text
  )

export const validatePassworByKey = (password: string) =>
  /^(?=.*[A-Za-z0-9!@#*])[A-Za-z0-9!@#*]+$/.test(password)

export const validateSpace = (text: string) => /^\S*$/.test(text)

export const validateTextMinLength = (text: string, length: number) =>
  text?.trim()?.length >= length

export const validateTextMaxLength = (text: string, length: number) =>
  text?.trim()?.length <= length

export const validateEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

const lengthWrong = 'Chỉ từ 6 đến 30 ký tự'
const lengthWrong_2 = 'Chỉ từ 6 đến 70 ký tự'
const lengthWrong_3 = 'Chỉ từ 100 đến 1000 ký tự'
const spaceWrong = 'Không được chứa khoảng trắng'
const emojiWrong = 'Không được chứa emoji'
const specialWrong = 'Không được chứa ký tự được biệt'
const specialPassWrong = 'Chỉ chứa ký tự được biệt: "!@#*"'
const emailWrong = 'email không đúng định dạng'

export const validateUserName = () => ({
  checkMin: (v: string) => validateTextMinLength(v, 6) || lengthWrong,
  checkMax: (v: string) => validateTextMaxLength(v, 30) || lengthWrong,
  checkValidCharacter: (v: string) => validateFullName(v) || specialWrong,
  checkExistEmoji: (v: string) => checkExistEmoji(v) || emojiWrong
})

export const validateEmailInput = () => ({
  checkMin: (v: string) => validateTextMinLength(v, 6) || lengthWrong,
  checkMax: (v: string) => validateTextMaxLength(v, 30) || lengthWrong,
  checkSpace: (v: string) => validateSpace(v) || spaceWrong,
  checkEmail: (v: string) => validateEmail(v) || emailWrong
})

export const validatePassword = () => ({
  checkMinValue: (v: string) => validateTextMinLength(v, 6) || lengthWrong,
  checkMaxValue: (v: string) => validateTextMaxLength(v, 30) || lengthWrong,
  checkExistEmoji: (v: string) => checkExistEmoji(v) || emojiWrong,
  checkSpace: (v: string) => validateSpace(v) || spaceWrong,
  checkPasswordByKey: (v: string) => validatePassworByKey(v) || specialPassWrong
})

export const validateNameBook = () => ({
  checkMinValue: (v: string) => validateTextMinLength(v, 6) || lengthWrong_2,
  checkMaxValue: (v: string) => validateTextMaxLength(v, 70) || lengthWrong_2
})

export const validateFunctionBook = () => ({
  checkMinValue: (v: string) => validateTextMinLength(v, 100) || lengthWrong_3,
  checkMaxValue: (v: string) => validateTextMaxLength(v, 1000) || lengthWrong_3
})
