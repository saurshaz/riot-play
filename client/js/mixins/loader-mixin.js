module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  load: function () {
    debugger
    this.on('updated', function () { console.log('Updated!') })
  }
}
