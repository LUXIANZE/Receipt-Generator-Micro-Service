const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const cors = require('cors')
const { json } = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com',
    pass: 'examplepassword'
  }
});

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000
// const startCPU = process.cpuUsage()

app.get('/', (req, res) => {
    const uptime = process.uptime()
    const cpuUsage = process.cpuUsage()
    const alliveMessage = `<h1>System Alive</h1>`
    const appUsage = `<p><h3>Up Time</h3></p> <ul><li>Up Time : ${uptime} seconds</li></ul> <p><h3>CPU Usage</h3></p> <ul><li>User: ${cpuUsage.user}</li><li>System: ${cpuUsage.system}</li></ul>`
    res.type('pdf')
    res.send(alliveMessage + appUsage)
})

app.post('/Receipt', (req, res) => {
    /**
     * Logic for pdf Receipt Generator:
     * - Load Template html locally
     * - Replace necessary info
     * - Email to destination with the updated template email (with transaction data)
     **/
    const { paidBy, receiptDate, amount, receivedBy } = req.body;

    const data = fs.readFileSync('./receiptTemplate.html', {encoding:'utf8', flag:'r'})
    
    let template = data

    template = template.replace('paidBy', `${paidBy}`)
    template = template.replace('receiptDate', `${receiptDate}`)
    template = template.replace('amount', `${amount}`)
    template = template.replace('receivedBy', `${receivedBy}`)

    var mailOptions = {
        from: 'sender@gmail.com',
        to: 'receiver@siswa.um.edu.my',
        subject: 'Sending Email using Node.js',
        html: `${template}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    res.send(template)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
