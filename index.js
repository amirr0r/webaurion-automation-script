const csv = require('csvtojson')
const csvFilePath = 'applications.csv'
const { execSync } = require('child_process')

const applications = []

csv()
    .fromFile(csvFilePath)
    .on('json', (application) => {
        const date = `${application['Date d\'envoi  de candidature']}`
        const company = `${application.Entreprise}`
        const comment = `${application.Poste} ${application.ID ? ` (${application.ID})\n` : ''}. Lien vers l'offre => ${application['Offre (lien)']}`

        applications.push({ date, company, comment })
    })
    .on('done', async () => {
        for (let app of applications) {
            console.log(app.date, app.company, app.comment, '\n-------------')
            execSync(`node browser-automation.js ${app.date} \"${app.company}\" \"${app.comment}\"`)
        }
    })
