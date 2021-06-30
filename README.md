# local-api


```
CREATE TABLE users (
  id serial,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name_kana TEXT,
  first_name_kana TEXT,
  email TEXT NOT NULL,
  normal_temperature NUMERIC NOT NULL,
  primary key (id)
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
  id serial,
  date DATE NOT NULL,
  temperature NUMERIC NOT NULL,
  attendance TEXT NOT NULL,
  reason TEXT,
  other_reason TEXT,
  feelings TEXT NOT NULL,
  FOREIGN KEY (id) references users(id)
);
```

```
INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings ) VALUES ('1', '2021-11-11', '37.0', '欠席', '熱', '明日も休みます','&#x1f616;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('2', '2021-11-11', '36.5', '出席','&#x1f603;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('3', '2021-11-11', '36.3', '出席','&#x1f610;' );
INSERT INTO conditions (id, date, temperature, attendance, feelings ) VALUES ('4', '2021-11-11', '36.2', '出席','&#x1f616;' );
INSERT INTO conditions (id, date, temperature, attendance, reason, other_reason, feelings ) VALUES ('5', '2021-11-11', '37.0', '欠席', '咳', '病院にいきます','&#x1f616;' );
```

herokuのアプリにPostgreSQLを導入し接続してみる<br>
https://creepfablic.site/2019/05/14/heroku-postgresql/#index_id0


Next.js + Express + TypeScript + PostgreSQL の WEBアプリをさくっと立ち上げてプロトタイプ開発をしよう<br>
https://www.forcia.com/blog/001559.html

Node.jsとPostgreSQLでシンプルなアプリケーションを作成（1）準備編<br>
https://qiita.com/tami/items/267cf5a32ce0547eaa46


