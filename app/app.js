const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const path = require('path')
const bodyParser = require('body-parser')

const dbPath = "app/db/database.sqlite3"

//リクエストのbodyをパースをする設定
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//publicディレクトリを静的ファイル群のルートディレクトリとして設定
app.use(express.static(path.join(__dirname, 'public')))

//Get all users
app.get('/api/v2/users', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)

    db.all(`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id` , (err, rows) => {
        res.json(rows)
    })

    db.close()
})



//Get a user
app.get('/api/v2/users/:id', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    db.get(`SELECT * FROM users WHERE id = ${id}` , (err, row) => {
        res.json(row)
    })
    
    db.close()
})

//Get a user's conditions(複数)
app.get('/api/v2/users/:id/conditions', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    db.all(`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE users.id = ${id};` , (err, row) => {
        res.json(row)
    })
    
    db.close()
})

//Get a user's condition(単数)
app.get('/api/v2/users/:id/condition', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    db.get(`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE users.id = ${id};` , (err, row) => {
        res.json(row)
    })
    db.close()
})



//Search users matching keyword
app.get('/api/v2/search', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const keyword = req.query.q

    db.all(`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE class LIKE "${keyword}"`, (err, rows) => {
        res.json(rows)
    })
    db.close()
})

//Search day matching keyword
app.get('/api/v2/search-date', (req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const keyword = req.query.q

    db.all(`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE date LIKE "${keyword}"`, (err, rows) => {
        res.json(rows)
    })
    db.close()
})





const run = async(sql, db, res, message) =>  {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if(err) {
                res.status(500).send(err)
                return reject()
            } else {
                res.json({message: message})
                return resolve()
            }
        })
    })
}

//Create a new user
app.post('/api/v2/users',async(req, res) => {
     //Conect database
     const db = new sqlite3.Database(dbPath)

     const last_name = req.body.last_name
     const first_name = req.body.first_name
     const email = req. body.email
     const schoolclass = req.body.class
     const normal_temperature = req. body .normal_temperature


     await run(`INSERT INTO users (last_name, first_name, email, class, normal_temperature) VALUES("${last_name}", "${first_name}", "${email}", "${schoolclass}", "${normal_temperature}")`,
     db,
     res,
     "登録が完了しました"
     )
     db.close()
})

//Create a new condition
app.post('/api/v2/users/:id/conditions',async(req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    const date = req.body.date
    const temperature = req.body.temperature
    const attendance = req. body.attendance
    const reason = req.body.reason
    const other_reason = req. body .other_reason
    const feelings = req. body .feelings


    await run(`INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings) VALUES("${id}","${date}", "${temperature}", "${attendance}", "${reason}", "${other_reason}", "${feelings}")`,
    db,
    res,
    "送信しました"
    )
    db.close()
})





//Update a user data
app.put('/api/v2/users/:id', async(req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    //現在のユーザー情報を取得する
    db.get(`SELECT * FROM users WHERE id = ${id}` , async (err, row) => {
        
        const last_name = req.body.last_name ? req.body.last_name : row.last_name
        const first_name = req.body.first_name ? req.body.first_name : row.first_name
        const email = req. body.email ? req.body.email : row.email
        const schoolclass = req.body.class ? req.body.class : row.class
        const normal_temperature = req. body .normal_temperature ? req.body.normal_temperature : row.normal_temperature


        await run(
            `UPDATE users SET last_name="${last_name}", first_name="${first_name}", email="${email}", class="${schoolclass}", normal_temperature="${normal_temperature}" WHERE id=${id}`,
        db,
        res,
        "更新しました"
        )
    })

    db.close()
})

//Delete a user data
app.delete('/api/v2/users/:id', async(req, res) => {
    //Conect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id



        await run(
            `DELETE FROM users WHERE id=${id}`,
        db,
        res,
        "削除しました"
        )

    db.close()
})







const port = process.env.PORT || 8080;
app.listen(port)

console.log("Listen on port:" + port)