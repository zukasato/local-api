const indexModule = (() => {
    const path = window.location.pathname
    const uid = window.location.search.split('uid=')[1]

    switch (path) {

        case'/':


        //カレンダーの初期値に今日の日付を入れる
        let date = new Date();

        let yyyy = date.getFullYear();
        let mm = ("0"+(date.getMonth()+1)).slice(-2);
        let dd = ("0"+date.getDate()).slice(-2);

        document.getElementById("date").value=yyyy+'-'+mm+'-'+dd;

        //クラスで絞り込みをした時のイベントリスナー設定
        //const selectElement = document.querySelector('.class-search');    
        //selectElement.addEventListener('change', (event) => {      
            //return searchModule.searchUsers(), searchModule3.graphIndex()
            
        //})
        


        //日付で絞り込みをした時のイベントリスナー設定
        
          const selectDay = document.querySelector('.day');    
          selectDay.addEventListener('change', (event) => {      
              return searchModule2.searchDays()
          })


            
        //日付で絞り込みをした時（初期値＝今日）のsearchModule2メソッドを呼び出す
        return searchModule2.searchDays()

        

     


        case '/create.html':

        document.getElementById('save-btn').addEventListener('click',()=>{
            return usersModule.createUser()
        })

        break;
        

   
        case '/edit.html':
            

        document.getElementById('save-btn').addEventListener('click',()=>{
            return usersModule.saveUser(uid)
        })
        return usersModule.setExistingValue(uid)


        case '/conditions-edit.html':


        
            return usersModule.getUsersConditions(uid)

          
            
    

        case '/conditions.html':

            document.getElementById('save-condition-btn').addEventListener('click',()=>{
            return usersModule.createUserConditions(uid)
        })
        return usersModule.getUsersName(uid)
        
        

        default:
            break;
    }
})()
    



