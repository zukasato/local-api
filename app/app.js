const express = require('express')//expressを利用してappへインスタンス化
const app = express()//ルーディング処理
const path = require('path')//パス指定用のモジュール
const bodyParser = require('body-parser')
const db = require('./db/pool.js')//poolを読み込み



//リクエストのbodyをパースをする設定

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//publicディレクトリを静的ファイル群のルートディレクトリとして設定（同じサーバーでHTMLを表示する）
app.use(express.static(path.join(__dirname, 'public')))


//Get all users
app.get('/api/v2/users', (req, res) => {
  　

    db.query (`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id`, function(error, results){
        // エラーの場合
        if (error) {
        throw error
        }
         res.status(200).json(results.rows);
         
  
    });
});
    
    
//Get a user
app.get('/api/v2/users/:id', (req, res) => {

    const id = req.params.id　//urlのパラメーターからidを取得

    db.query (`SELECT * FROM users WHERE id = ${id}`, function(error, results){
        // エラーの場合
        if (error) {
          throw error
          }
          res.status(200).json(results.rows[0]);

      })
    });


//Get a user's conditions(複数)　特定のユーザーのcondirionを複数日抽出する
app.get('/api/v2/users/:id/conditions', (req, res) => {
  　
    const id = req.params.id
  
   db.query (`SELECT TO_CHAR(date, 'YYYY-MM-DD') AS datenew,* FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE users.id = ${id}` , function(err,results){
     
  
   // エラーの場合
       if (err) {
        throw err
        }
        // 正常なら取得したデータを返却
        res.status(200).json(results.rows);

       });
      });


//Get a user's condition(単数)　特定のユーザーのcondirionを１日分だけ抽出する
app.get('/api/v2/users/:id/condition', (req, res) => {
    
    const id = req.params.id　//urlのパラメーターからidを取得

    db.query (`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE users.id = ${id};` , function(error, results){
    // エラーの場合
    if (error) {
        throw error
        }
        // 正常なら取得したデータを返却
        res.status(200).json(results.rows[0]);

       
    });
});




//Search users matching keyword クラスで抽出する場合
    //app.get('/api/v2/search', (req, res) => {
    
    //const keyword = req.query.q

    //db.query (`SELECT * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE class LIKE '${keyword}'`,  function(error, results){
        // エラーの場合
        //if (error) {
            //throw error
            //}
            // 正常なら取得したデータを返却
            //res.status(200).json({
            //data: results.rows
            //});
        //});
    //});

//Search day matching keyword　日付で抽出する場合
    app.get('/api/v2/search-date', (req, res) => {
    
    const keyword = req.query.q

    db.query (`SELECT  * FROM users LEFT OUTER JOIN conditions ON users.id = conditions.id WHERE date = to_date('${keyword}', 'yyyy-mm-dd')`,  function(error, results){
        // エラーの場合
        if (error) {
            throw error
            }
            // 正常なら取得したデータを返却
            res.status(200).json(results.rows);
        });
    });




//Create a new user　新規ユーザー追加
app.post('/api/v2/users', async(req, res) => {
  
     const last_name = req.body.last_name
     const first_name = req.body.first_name
     const last_name_kana = req.body.last_name_kana
     const first_name_kana = req.body.first_name_kana
     const email = req. body.email
     const normal_temperature = req. body .normal_temperature

    

     await db.query (`INSERT INTO users (last_name, first_name, last_name_kana, first_name_kana, email, normal_temperature) VALUES('${last_name}', '${first_name}', '${last_name_kana}', '${first_name_kana}', '${email}', '${normal_temperature}')`,
     function (error, results) {
        if (error) {
          res.status(500).json({
            status: '500 Internal Server Error',
            error: error,
          })
        }
        // 登録できたらsuccessを返却
        res.status(201).json({
          message: '新規ユーザーを追加しました',
        })
      },
    )
  })
  

//Create a new condition 　特定の人を抽出して日々のコンディションを新規で追加する
app.post('/api/v2/users/:id/conditions',async(req, res) => {

    const id = req.params.id　//urlのパラメーターからidを取得

    const date = req.body.date
    const temperature = req.body.temperature
    const attendance = req. body.attendance
    const reason = req.body.reason
    const other_reason = req. body .other_reason
    const feelings = req. body .feelings


    await db.query (`INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings) VALUES('${id}','${date}', '${temperature}', '${attendance}', '${reason}', '${other_reason}', '${feelings}')`,
    function (error, results) {
        if (error) {
          res.status(500).json({
            status: '500 Internal Server Error',
            error: error,
          })
        }
        
        // 登録できたらsuccessを返却
        res.status(201).json({
          message: '体調を記録しました'
          
        })
      },
    )
  })


  
  
//Update a user data 　ユーザー情報を変更する
app.put('/api/v2/users/:id',  (req, res) => {
    
    //urlのパラメーターからidを取得
  const id = req.params.id //urlのパラメーターからidを取得
  

      db.query (`SELECT * FROM users WHERE id=${id}`, async(err, responce) => {
      
      const row = responce.rows[0];

      const last_name = req.body.last_name ? req.body.last_name : row.last_name;
      const first_name = req.body.first_name ? req.body.first_name : row.first_name;
      const email = req.body.email ? req.body.email : row.email;
      const normal_temperature = req.body.normal_temperature ? req.body.normal_temperature : row.normal_temperature;

      db.query (  
        `UPDATE users SET last_name='${last_name}',first_name='${first_name}', email='${email}', normal_temperature ='${normal_temperature}' WHERE id ='${id}'`,

        function (error, results) {
          
          if (error) {
            
            res.status(500).json({
              status: '500 Internal Server Error',
              error: error,
            })
          }
          // 登録できたらsuccessを返却
          res.status(201).json({
            message: 'ユーザー情報を更新しました'
          })

        })
      })
    })





//Delete a user data
app.delete('/api/v2/users/:id', async(req, res) => {
  
    const id = req.params.id

    

    await db.query(`DELETE FROM users WHERE id= ${id}`, function (error, results) {
        if (error) {
          res.status(500).json({
            status: '500 Internal Server Error',
            message: error,
          })
        }
        if (results.rowCount === 0) {
          // 削除するデータがなかった場合
            res.status(400).json({
            status: '400 Bad Request',
            message: 'データが存在しません。',
          })
        } else {
          // 削除できたらsuccessを返却
            res.status(200).json({
            status: 'success',
          })
        }
      })
    })



const port = process.env.PORT || 8080;
app.listen(port)

console.log("Listen on port:" + port)