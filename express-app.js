const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const path = require('path')
const fs = require('fs')
const { el } = require('date-fns/locale')

const movies = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'movies.json')))

app.use(express.json())

app.get( '/api/v1/movies', (req, res) => {
    res.statusCode = 200;
 res.setHeader('Content-Type','application/json')
    res.json({
        status: "succesful",
        count: movies.length,
        data: {
            movies: movies 
        }
    })

}


)

app.get('/api/v1/movies/:id', (req, res) => {
   
    
    //console.log(req.params, req.method)

    const params = req.params
    const id = Number(params.id)
    let movie = movies.find((el =>  el.id === id))

    if(!movie) {
    
        res.statusCode = 404;
             res.json({
                status: "fail",
                message: 'movie with id:' +id+ ' ' +'not found '
               })
    }


   
    res.statuscode = 200;
    res.setHeader('content-Type', 'application/json') 
    res.json({
        status: "succesful",
        data: {
            movie: movie
        }
    })



} )



app.post( '/api/v1/movies', (req, res) => {
    
const newid = movies[movies.length - 1].id + 1

const newMovies = Object.assign({id: newid}, req.body)

    movies.push(newMovies)
    
   fs.writeFile(path.join(__dirname, 'data', 'movies.json'), JSON.stringify(movies), (err) => {
    res.statusCode = 201;
    res.setHeader('Content-Type','application/json')
       res.json({
           status: "succesful",
           count: movies.length,
           data: {
               movies: newMovies
           }
       })
   })

    
})


app.patch('/api/v1/movies/:id', (req, res) => {
    const params = req.params
    const id = Number(params.id)

    let movietoupdate = movies.find((el =>  el.id === id))
    // let movietoupdate = movies.find((el) => {el.id === id})
   let index = movies.indexOf(movietoupdate)

    Object.assign(movietoupdate, req.body) 

   movies[index] = movietoupdate


fs.writeFile(path.join(__dirname, 'data', 'movies.json'), JSON.stringify(movies), (err) => {
 res.statusCode = 200;
    res.json({
        status: "sucessful",
        data: {
            movie: movietoupdate
        }

    })
})
    



})


app.listen(port, () => {
    console.log('express server as started.')
})