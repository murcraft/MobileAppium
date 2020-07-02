'use strict'

class RandomHelper {

  static GetRandomString (string) {
    const d = new Date()
    const dateStr = d.getFullYear().toString() + (parseInt(d.getMonth()) + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds()
    return string + dateStr + Math.floor((Math.random() * 100) + 1)
  }

  static GetRandomNumber (number) {
    return Math.floor((Math.random() * number) + 1)
  }

}

export default RandomHelper