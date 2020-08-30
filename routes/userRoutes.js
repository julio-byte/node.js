const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUser = () => {
    const data = fs.existsSync(filePath)
     ? fs.readFileSync(filePath)
     : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
        
    }

}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoutes = (app) => {
    app.route('/Users/:id?')
       .get((req, res) => {
           const users = getUser()
           res.send({ users })
       
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.send(201).send('Ok')
        })
        .put((req, res) => {
            const users =getUser()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user

            }))
            
            res.send(201).send('ok')
        })
        
}

module.exports = userRoutes
