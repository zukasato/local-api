# heroku 
全員の情報を見る（日付で絞り込み）<br>
https://hccs.herokuapp.com/<br>

ユーザー登録ページ<br>
https://hccs.herokuapp.com/create.html<br>
ユーザー編集ページ<br>
https://hccs.herokuapp.com/edit.html?uid=1<br>
出席・体温・体調の入力ページ<br>
https://hccs.herokuapp.com/conditions.html?uid=1<br>
出席・体温・体調の一覧ページ<br>
https://hccs.herokuapp.com/conditions-edit.html?uid=1<br>




# local-api （Heroku PostgreSQLバージョン）
全員の情報を見る（日付で絞り込み）<br>
http://localhost:8080/<br>

ユーザー登録ページ<br>
http://localhost:8080/create.html<br>
ユーザー編集ページ<br>
http://localhost:8080/edit.html?uid=1<br>

出席・体温・体調の入力ページ<br>
http://localhost:8080/conditions.html?uid=1<br>
出席・体温・体調の一覧ページ<br>
http://localhost:8080/conditions-edit.html?uid=1<br>

```
CREATE TABLE users (
  id SERIAL NOT NULL primary key,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name_kana TEXT,
  first_name_kana TEXT,
  email TEXT NOT NULL,
  normal_temperature NUMERIC NOT NULL
);
```

```
INSERT INTO users (last_name, first_name, email, normal_temperature) VALUES ('山田', '太郎', 'yamada@gmail.com', '36.6' );
INSERT INTO users (last_name, first_name, email, normal_temperature) VALUES ('鈴木', '春子', 'suzuki@gmail.com', '36.7' );
INSERT INTO users (last_name, first_name, email, normal_temperature) VALUES ('遠藤', '一郎', 'endo@gmail.com', '36.8' );
INSERT INTO users (last_name, first_name, email, normal_temperature) VALUES ('市川', '夏子', 'ichikawa@gmail.com', '36.9' );
INSERT INTO users (last_name, first_name, email, normal_temperature) VALUES ('大木', '次郎', 'oki@gmail.com', '36.7' );
```

```
CREATE TABLE conditions (
  id integer,
  date TIMESTAMP NOT NULL,
  temperature NUMERIC NOT NULL,
  attendance TEXT NOT NULL,
  reason TEXT,
  other_reason TEXT,
  feelings TEXT NOT NULL,
  FOREIGN KEY (id) references users(id) on delete cascade
);
```


```
INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings ) VALUES ('1', '2021-07-30', '37.0', '欠席', '熱', '明日も休みます','&#x1f616;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('2', '2021-07-30', '36.5', '出席','&#x1f603;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('3', '2021-07-30', '36.3', '出席','&#x1f603;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('4', '2021-07-30', '36.2', '出席','&#x1f610;' );
INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings ) VALUES ('5', '2021-07-30', '37.0', '欠席', '咳', '病院にいきます','&#x1f616;' );
```

NodeアプリをHerokuで公開する<br>
https://teech-lab.com/category/programming/node-js/

herokuのアプリにPostgreSQLを導入し接続してみる<br>
https://creepfablic.site/2019/05/14/heroku-postgresql/#index_id0


Next.js + Express + TypeScript + PostgreSQL の WEBアプリをさくっと立ち上げてプロトタイプ開発をしよう<br>
https://www.forcia.com/blog/001559.html

Node.jsとPostgreSQLでシンプルなアプリケーションを作成（1）準備編<br>
https://qiita.com/tami/items/267cf5a32ce0547eaa46

Express + PostgreSQL で DB 接続してみた<br>
https://better-life.blog/posts/200

PostgreSQLの使い方 ＞ FOREIGN KEY制約(外部キー制約を設定する)<br>
https://www.dbonline.jp/postgresql/table/index11.html#section2<br>

git pushがreject（拒否）されたときの対処法<br>
https://qiita.com/Takao_/items/5e563d5ea61d2829e497<br>

postgresql参考<br>
https://www.dbonline.jp/postgresql/<br>

docker参考<br>
https://youtu.be/DNnW4I43wyU

node.js herokuへのデプロイ参考<br>
https://devcenter.heroku.com/ja/articles/deploying-nodejs

