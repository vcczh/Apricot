var mysql = require('mysql');
var dbconfig = require('./dbconfig');
var db = {};

db.pool = mysql.createPool(dbconfig.connectionPool);

db.test = function (req,res) {
    
    db.query("select * from Users", req, res);
};

db.query = function (queryString, req, res) {

    if (!queryString) {
        res.json({"code" : 101, "status" : "Error in query String!"});
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