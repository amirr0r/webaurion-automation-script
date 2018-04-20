const Nightmare = require('nightmare')
const { each, reduce } = require('lodash')

let nm = new Nightmare({
    show: true,
})

const p = new Proxy(nm, {
    get: (src, key) => actions[key]
        || function () {
            return (nm = nm[key].apply(nm, arguments), p)
        }
})

const actions = each({
    waitAndClick: q => nm.wait(1500).wait(q).click(q),
    waitAndType: (q, text) => nm.wait(1500).wait(q).type(q, text),
}, (fn, key, acc) => acc[key] = (...args) => (nm = fn(...args), p))

module.exports = p