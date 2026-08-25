const fs = require('fs')
const path = require('path')
const dirs = ['app', 'components', 'lib']
const exts = ['.tsx', '.ts', '.css', '.js', '.mjs']
const refs = new Set()
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (exts.includes(path.extname(e.name))) {
      const c = fs.readFileSync(p, 'utf8')
      const re = /['"`]\/(?!https?:\/\/)([^\s'"`)]+\.(?:jpg|jpeg|png|webp|avif|svg|mp4|jfif))['"`]/gi
      let m
      while ((m = re.exec(c))) refs.add('/' + m[1])
    }
  }
}
dirs.forEach((d) => { if (fs.existsSync(d)) walk(d) })
const pub = 'public'
const missing = [...refs].filter((r) => !fs.existsSync(path.join(pub, r))).sort()
console.log('TOTAL REFS', refs.size)
console.log('ALL REFS:')
;[...refs].sort().forEach((x) => console.log('  ' + x))
console.log('MISSING IMAGES/ASSETS:')
missing.forEach((x) => console.log('  ' + x))
