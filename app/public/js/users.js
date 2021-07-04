//即時関数でモジュール化
const usersModule = (() => {
    const BASE_URL = "http://localhost:8080/api/v2/users"

    //ヘッダーの設定 fetchメソッドに渡すパラメーター
    const headers = new Headers()
    headers.set("Content-type","application/json")//リクエストのbodyにjsonを渡すと伝える

    return { 
        fetchAllUsers: async () => {
            const res = await fetch(BASE_URL)//jsonでかえってきている
            const users = await res.json()//jsonの値をパースしてjavascriptのオブジェクトの配列にする

            for (let i=0; i < users.length; i++) {　//usersの配列の要素分だけfor分でまわっていく
                const user = users[i]//usersの１列分だけとる
                const body = `<tr>                 
                                <td>${user.last_name}</td>
                                <td>${user.first_name}</td>
                                <td>${user.temperature}</td>
                                <td>${user.attendance}</td>
                                <td>${user.feelings}</td>
                                <td>${user.reason}</td>
                                <td>${user.other_reason}</td>
                                <td>${user.date}</td>
                              </tr>`
            document.getElementById('users-table').insertAdjacentHTML('beforeend', body)
            }
        },
        
        createUser: async() => {
            const last_name = document.getElementById("last_name").value
            const first_name = document.getElementById("first_name").value
            const last_name_kana = document.getElementById("last_name_kana").value
            const first_name_kana = document.getElementById("first_name_kana").value
            //const schoolclass = document.querySelector(".class-search").value
            const normal_temperature = document.querySelector(".normal_temperature").value

            //リクエストのbody
            const body = {
              last_name: last_name,
              first_name: first_name, 
              last_name_kana: last_name_kana,
              first_name_kana: first_name_kana,
              //class: schoolclass,
              normal_temperature: normal_temperature
            }

            const res = await fetch(BASE_URL,{
                method: "POST",
                headers: headers,
                body: JSON.stringify(body) //オブジェクトをJSON文字列に変換（javasciriptの文字列をそのままjsonに渡せない）
            })

            const resJson = await res.json()

            alert(resJson.message)
            window.location.href = "/"
        },

        setExistingValue: async (uid) => {
            const res = await fetch(BASE_URL + "/" + uid)
            const resJson = await res.json()

            document.getElementById('last_name').value = resJson.last_name
            document.getElementById('first_name').value = resJson.first_name
            document.getElementById('last_name_kana').value = resJson.last_name_kana
            document.getElementById('first_name_kana').value = resJson.first_name_kana
            document.getElementById('email').value = resJson.email
            //document.querySelector(".class-search").value = resJson.class
            document.querySelector(".normal_temperature").value = resJson.normal_temperature
        },

        saveUser: async(uid) => {
            const last_name = document.getElementById("last_name").value
            const first_name = document.getElementById("first_name").value
            const last_name_kana = document.getElementById("last_name_kana").value
            const first_name_kana = document.getElementById("first_name_kana").value
            const email = document.getElementById("email").value
            //const schoolclass = document.querySelector(".class-search").value
            const normal_temperature = document.querySelector(".normal_temperature").value

            //リクエストのbody

            const body = {
              last_name: last_name,
              first_name: first_name, 
              last_name_kana: last_name_kana,
              first_name_kana: first_name_kana,
              email: email,
              //class: schoolclass,
              normal_temperature: normal_temperature
            }

            const res = await fetch(BASE_URL + "/" + uid,{
                method: "PUT",
                headers: headers,
                body: JSON.stringify(body)
            })

            const resJson = await res.json() 

            alert(resJson.message)
            window.location.href = "/"
        },


        
        getUsersConditions: async (uid) => {
            const res = await fetch(BASE_URL + "/" + uid +"/conditions") 
            const users = await res.json()


            for (let i=0; i < users.length; i++) {
                const user = users[i]
                const body = `<tr>
                                <td>${user.date}</td>
                                <td>${user.temperature}</td>
                                <td>${user.attendance}</td>
                                <td>${user.feelings}</td>
                              </tr>`
                
            document.getElementById('conditions-table').insertAdjacentHTML('beforeend', body)
            }

            const singleres = await fetch(BASE_URL + "/" + uid +"/condition")
            const singleuser = await singleres.json()

            document.getElementById('last_name').insertAdjacentHTML('beforeend', `<div>${singleuser.last_name}&nbsp;${singleuser.first_name}さん</div>`)
  
            },

        createUserConditions: async(uid) => {
            

            const date = document.getElementById("date").value
            const temperature = document.getElementById("temperature").value
            const attendance = document.getElementById("attendance").value
            const reason = document.getElementById("reason").value
            const other_reason = document.getElementById("other_reason").value
            const feelings = document.getElementById("feelings").value


            //リクエストのbody
            const body = {
              date: date,
              temperature: temperature, 
              attendance: attendance,
              reason: reason,
              other_reason: other_reason,
              feelings: feelings
            }

            const res = await fetch(BASE_URL + "/" + uid +"/conditions",{
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })

            const resJson = await res.json()

            alert(resJson.message)
            window.location.href = "/"

        },

        //タイトルの下に記載するユーザー名

        getUsersName: async (uid) => {
            const singleres = await fetch(BASE_URL + "/" + uid +"/condition")
            const singleuser = await singleres.json()
            document.getElementById('name').insertAdjacentHTML('beforeend', `<div>${singleuser.last_name}&nbsp;${singleuser.first_name}さん</div>`)

        }


    }
})()