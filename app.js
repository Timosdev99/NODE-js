const fs = require('fs')
const path = require('path')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const logevent = require('./logevent')
const http = require('http')
const port = process.env.PORT || 3500

const eventemitter = require('events')

class myemitter extends eventemitter {};

const Myemiiter = new myemitter


let product = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'product.json'), 'utf-8')) 

const server = http.createServer()

server.on('request', (req, res) => { 
 
    console.log(req.url, req.method )
    


    let fliepath;

if(req.url ==='/' || req.url === '/index'){
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    fliepath = path.join(__dirname, 'veiws', 'index.html')
    fs.readFile(fliepath, 'utf-8', (err, data) => {
        res.end(data)
        

    } )
    
} else if(req.url ==='/' || req.url === '/about'){
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    fliepath = path.join(__dirname, 'veiws', 'about.html')
    fs.readFile(fliepath, 'utf-8', (err, data) => {
        res.end(data)
        
    

    } )
    
} else if(req.url ==='/' || req.url === '/product'){
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    fliepath = path.join(__dirname, 'data', 'product.json')
   res.end('you and product page ') 
    console.log(product)

} else if(req.url ==='/' || req.url === '/large'){  
   
    let  rs = fs.ReadStream(path.join(__dirname, 'data', 'largefile.txt'), 'utf-8')
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html') 
  
    rs.pipe(res);

    // second way of sending large file  

//    rs.on('data', (large) =>{
//     res.write(large)
//     console.log("large server written succesfully")
//     res.end()
//    }
    
// )

// rs.on('error', (err) => {
//     res.end(err.message); 
// })

} else {
    res.statusCode = 404 
    res.end('page not found')
}



})

server.listen(port, () => { console.log(`this server is runing on port ${port}`)

})


Myemiiter.on('log', (message) => logevent(message))

Myemiiter.emit('log', 'logevent emmitted' ) 

console.log('succesfull')

// Myemiiter.on('log', (message) => logevent(message))

// Myemiiter.emit('log', `logevent emmitted,\t\t ${urlinfo}` ) 

// console.log('succesfull')

// Myemiiter.emit('log', 'logevent emmitted', `${req.url, req.method }`) 


console.log('running event loop')



// node js event loop  


fs.readFile(path.join(__dirname, 'info', 'input.txt'), 'utf-8' ,  () => {
    console.log('input read sucessfully')
     
    setTimeout(
        () => {
            console.log('interval peroid.')
        }, 1000  
    )
    
     setImmediate(
        () => {console.log('running immedaite.')}
    )

    process.nextTick(
        () => {
            console.log('running process.next on the event loop')
        }
    )

    //  setInterval(
    //     () => {
    //         console.log('intervl as been succesfuly set'), 5000
    //     }
    //  )

}) 


console.log('ended');


