const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

app.get('/', (req, res) => {
  res.send('App Alive')
})

app.post('/Receipt', (req, res) => {
    const { paidBy, receiptDate, amount, receivedBy } = req.body;
    console.log(req.body)

    const data = fs.readFileSync('./receiptTemplate.html', {encoding:'utf8', flag:'r'});
    
    let template = data

    template = template.replace('paidBy', `${paidBy}`)
    template = template.replace('receiptDate', `${receiptDate}`)
    template = template.replace('amount', `${amount}`)
    template = template.replace('receivedBy', `${receivedBy}`)
    console.log(`\nafter replacing \n ${template}`)
    
    res.send(template)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})