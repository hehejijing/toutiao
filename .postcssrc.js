module.exports = {
  plugins: {

    'postcss-pxtorem': {
      rootValue: ({file}) => (/vant/i.test(file) ? 37.5 :75),
      propList: ['*']
    }
  }
}