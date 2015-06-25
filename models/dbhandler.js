var mysql = require('mysql');

var db = {};

db.pool = mysql.createPool({
  connectionLimit : 10, //important
  host     : 'localhost',
  user     : 'root',
  password : '63141716',
  database : 'test',
  debug    :  false
});

db.test = function (req,res) {
    
    db.query("select * from Persons", req, res);
};

db.query = function (queryString, req, res) {

    if (!queryString) {
        res.json({"code" : 101, "status" : "Empty query!"});
        return;
    }

    this.pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query(queryString,function(err,rows){
            connection.release();
            if(!err) {
              res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;     
        });
    });
}

db.queryWithCallback = function (queryString, callBack) {

    if (!queryString) {
        callBack("Error: Empty query", null);
        return;
    }

    this.pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            callBack(err, null);
            return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query(queryString,function(err,rows){
            connection.release();
            if(!err) {
              callBack(null, rows);
            }           
        });

        connection.on('error', function(err) {      
            callBack(err, null);
            return;     
        });
    });
}

module.exports = db;