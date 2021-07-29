const searchModule2 =(() => {
    const BASE_URL = "http://localhost:8080/api/v2/search-date"

    return{
        searchDays : async () => {
            //検索窓への入力値を取得

            const query = document.querySelector('.day').value
            document.querySelector('.day').value

            
            const res = await fetch(BASE_URL + '?q=' + query)
            const result = await res.json()

            let body = ""

            for (let i=0; i < result.length; i++){
                const user = result[i]
                body += `<tr>
                            
                            <td>${user.last_name}</td>
                            <td>${user.first_name}</td>
                            <td>${user.temperature}</td>
                            <td>${user.attendance}</td>
                            <td>${user.feelings}</td>
                            <td>${user.reason}</td>
                            <td>${user.other_reason}</td>            
                        </tr>`
            }
            document.getElementById('users-table').innerHTML = body

            
            const attendances = result.map(item => item.attendance)//result配列からmap()メソッドで出欠だけの配列を作成

            //出欠だけの配列から、出席・欠席・早退・遅刻のそれぞれをカウント
            const count = {};
                for (let i = 0; i < attendances.length; i++) {
                const elm = attendances[i];
                count[elm] = (count[elm] || 0) + 1;
                }

                const shusseki = count.出席 ? count.出席 : 0 ;
                const kesseki = count.欠席 ? count.欠席 : 0 ;
                const soutai = count.早退 ? count.早退 : 0 ;
                const chikoku = count.遅刻 ? count.遅刻 : 0 ;

         
 
        // グラフデータ（ドーナツチャートに描画するためのデータ）
        let chartVal = []; 

        // ページ読み込み時にグラフを描画
        getRandom(); // グラフデータにランダムな値を格納
        drawChart(); // グラフ描画処理を呼び出す


        // ボタンをクリックしたら、グラフを再描画
        document.querySelector('.day').onchange = function() {
        // すでにグラフ（インスタンス）が生成されているグラフを破棄
            myChart.destroy();
        }

        

        // グラフデータに　出席・欠席・早退・遅刻のそれぞれの数を代入
        function getRandom() {
        chartVal = []; // 配列を初期化
        
            chartVal.push(shusseki,kesseki,soutai,chikoku);
        }

        // グラフ描画処理
        function drawChart() {
        var ctx = document.getElementById('myPieChart').getContext('2d');
        window.myChart = new Chart(ctx, { // インスタンスをグローバル変数で生成
            type: 'doughnut',
            data: { // ラベルとデータセット
            labels: ["出席", "欠席", "早退", "遅刻"],
            datasets: [{
                data: chartVal, // グラフデータ
                backgroundColor: [
                    "#F3B346",
                    "#7ADF92",
                    "#46A2F3",
                    "#D58AFF"
                ] // 棒の塗りつぶし色
                
            }],
            },
            options: {
            legend: {
                display: false, // 凡例を非表示
            }
            }
        });
        }
        }
    }
})()