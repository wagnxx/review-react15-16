var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('whatsapp-clone.db');

const users = 'users';
const userTableCreateSql =
  'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT  , name chart(50) ,nick_name chart(50),email chart(150))';

db.serialize(async function () {
  let exist = await getTable(users, db);

  if (!exist) {
    db.run(userTableCreateSql);
  }

  const userRowsNums = await getTableRowsNum(users, db);
  console.log(userRowsNums);
  if (userRowsNums < 20) {
    var stmt = db.prepare('INSERT INTO users VALUES (NULL,?,?,?)');
    for (var i = 0; i < 10; i++) {
      stmt.run(
        'Ipsum ' + i,
        'nick_name' + i * 10,
        'emalcompany' + i + '@qq.com'
      );
    }
    stmt.finalize();
  } else {
    console.log('已经超过20条数据');
  }

  db.each('SELECT rowid as rid,* FROM users limit 5', function (err, row) {
    console.log(row.email);
  });
  db.close();
});

function getTable(tbname) {
  let sql =
    "SELECT COUNT(*) as count FROM sqlite_master where type ='table' and name ='" +
    tbname +
    "'";

  return new Promise((resolve, reject) => {
    db.each(sql, function name(err, row) {
      if (row.count >= 1) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function getTableRowsNum(tbname) {
  let sql = 'SELECT COUNT(*) as count FROM "' + tbname + '"';
  return new Promise((resolve, reject) => {
    db.each(sql, function name(err, row) {
      resolve(row.count);
    });
  });
}
