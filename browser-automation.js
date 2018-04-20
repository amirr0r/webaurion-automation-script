const nightmare = require('./config')
const username = ""
const password = ""

const date = process.argv[2]
const company = process.argv[3]
const comment = process.argv[4]

nightmare
    .goto('https://webaurion.esiee.fr/faces/Login.xhtml')
    .type('#j_username', username)
    .type('#j_password', password)
    .click('#j_idt27')
    .waitAndClick('#mobile-menu-btn')
    .waitAndClick('.ui-menuitem-icon.ui-icon.fa.fa-industry')
    .evaluate(() => document.getElementById('form:entree_3875686').click())
    .wait('.div-grille-composants')
    .evaluate(() => document.getElementById('form:tabPanelPrincipalFormulaireSupport:composant_0_2_label').click())
    .evaluate(() => document.getElementById('form:tabPanelPrincipalFormulaireSupport:composant_0_2_6').click())
    .type('[name="form:tabPanelPrincipalFormulaireSupport:composant_0_4_input"]', date)
    .type('[name="form:tabPanelPrincipalFormulaireSupport:composant_0_5"]', company)
    .type('[name="form:tabPanelPrincipalFormulaireSupport:composant_0_10"]', comment)
    .click('[name="form:j_idt221"]') // submit
    .end() // close the window
    .then(console.log)
    .catch(err => console.error('Search failed:', err))