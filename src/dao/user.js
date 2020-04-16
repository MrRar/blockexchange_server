const pool = require("../pool");

module.exports.get_by_name = function(name) {
  return new Promise(function(resolve, reject) {
    pool.connect()
    .then(client => {
      client.query("select * from public.user where name = $1", [name])
      .then(sql_res => {
        resolve(sql_res.rows[0]);
        client.release();
      })
      .catch(e => {
        client.release();
        console.error(e.stack);
        reject();
      });
    });
  });
};

module.exports.get_by_id = function(id) {
  return new Promise(function(resolve, reject) {
    pool.connect()
    .then(client => {
      client.query("select * from public.user where id = $1", [id])
      .then(sql_res => {
        resolve(sql_res.rows[0]);
        client.release();
      })
      .catch(e => {
        client.release();
        console.error(e.stack);
        reject();
      });
    });
  });
};

module.exports.get_all = function() {
  return new Promise(function(resolve, reject) {
    pool.connect()
    .then(client => {
      client.query("select * from public.user")
      .then(sql_res => {
        resolve(sql_res.rows);
        client.release();
      })
      .catch(e => {
        client.release();
        console.error(e.stack);
        reject();
      });
    });
  });
};

module.exports.create = function(data) {
  const query = `
    insert into
    public.user(
      name, hash, mail, created
    )
    values(
      $1, $2, $3, $4
    )
    returning *
  `;

  const values = [
    data.name, data.hash, data.mail, Date.now()
  ];

  return new Promise(function(resolve, reject){
    pool.connect()
    .then(client => {
      return client.query(query, values)
      .then(sql_res => {
        resolve(sql_res.rows[0]);
        client.release();
      })
      .catch(e => {
        client.release();
        console.error(e.stack);
        reject();
      });
    });
  });
};
