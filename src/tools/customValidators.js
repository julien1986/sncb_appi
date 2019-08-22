export default {
  pattern(exp) {
    return (value) => {
      return exp.test(value)
    }
  },
  intraMail() {
    var exp = /@forem\.be$/
    return this.pattern(exp)
  }
}