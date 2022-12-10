const falso = require('@ngneat/falso')

let ret =
  '{"items":[' +
  '{"text":"Do this thing.","completed":true },' +
  '{"text":"Then do this.","completed":false },' +
  '{"text":"Finally do that.","completed":true }]}'

console.log(JSON.stringify(ret))
