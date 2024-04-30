const fs = require('fs')
const fspromises = require('fs').promises
const path = require('path')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')


const logevent =  async (message) => {
    const datetime = `${format(new Date(), 'yy|yMM|dd\tHH:mm:ss')}`
    const logitem = `${datetime}\t\t${uuid()}\t\t${message}\n`
    console.log(logitem)
    
    try{
         
if(!fs.existsSync(path.join(__dirname, 'logs')))  {
    await fspromises.mkdir(path.join(__dirname, 'logs'))
}


         await fspromises.appendFile(path.join(__dirname, 'logs', 'logevent.txt'), logitem)
         await fspromises.readFile(path.join(__dirname, 'logs', 'logevent.txt'))
    } 
    catch (err) {
     console.error(err)
    }
}

module.exports = logevent
 
7