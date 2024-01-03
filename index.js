const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/index.html`))
})

app.use('/public', express.static(path.join(`${__dirname}/frontend/public`)))

app.get('/api/users', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data.json`), (err) => {
    if (err) {
      console.log(err)

      res.send(err)
    } else {
      console.log('user data has been sent')
    }
  })
})

app.post('/api/users', (req, res) => {
  //console.log(req.body)

  fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)

      res.send(err)
    } else {
      const users = JSON.parse(data)
      //console.log(users)
      //console.log(users.length)
      const lastId = users[users.length - 1].id
      
      const newUser = req.body
      newUser.id = lastId + 1
      //console.log(newUser)
      
      //console.log(users)
      users.push(newUser)
      //console.log(users)

      fs.writeFile(`${__dirname}/data.json`, JSON.stringify(users, 0, 2), (err) => {
        if (err) {
          console.log(err)

          res.send(err)
        } else {
          console.log(`user created: ${newUser.id}`)

          res.send(`user created: ${newUser.id}`)
        }
      })
    }
  })
})

app.delete('/api/users/:id', (req, res) => {
  console.log('delete user: ', req.params.id)

  res.send(`delete user: ${req.params.id}`)
})

app.patch('/api/users/:id', (req, res) => {
  console.log('patching user: ', req.params.id)

  res.send(`patching user: ${req.params.id}`)
})

app.put('/api/users/:id', (req, res) => {
  console.log('changing user: ', req.params.id)

  res.send(`changing user: ${req.params.id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})