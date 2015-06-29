var mysql = require('mysql');
var dbconfig = require('../models/dbconfig');

var connection = mysql.createConnection(dbconfig.connection);

/*jshint multistr: true */
connection.query('\
CREATE DATABASE IF NOT EXISTS `' + dbconfig.database + '` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`user` (\
  `uid` INT NOT NULL AUTO_INCREMENT,\
  `username` VARCHAR(45) NOT NULL,\
  `password` VARCHAR(60) NULL,\
  `email` VARCHAR(45) NULL,\
  `phone` VARCHAR(45) NULL,\
  `addrid` VARCHAR(45) NULL,\
  PRIMARY KEY (`uid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`follow` (\
  `followeeid` INT NOT NULL,\
  `followerid` INT NOT NULL,\
  `date` DATETIME NULL,\
  PRIMARY KEY (`followeeid`, `followerid`),\
  INDEX `follower_fk_idx` (`followerid` ASC),\
  CONSTRAINT `followee_fk`\
    FOREIGN KEY (`followeeid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `follower_fk`\
    FOREIGN KEY (`followerid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`item` (\
  `itemid` INT NOT NULL,\
  `itemno` VARCHAR(45) NULL,\
  `description` LONGTEXT NULL,\
  `status` INT NULL,\
  `price` DECIMAL(20) NULL,\
  `type` VARCHAR(45) NULL,\
  `origintime` DATETIME NULL,\
  PRIMARY KEY (`itemid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`comment` (\
  `cmtid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  `fromuserid` INT NULL,\
  `touserid` INT NULL,\
  `content` LONGTEXT NULL,\
  `date` DATETIME NULL,\
  PRIMARY KEY (`cmtid`),\
  INDEX `from_user_id_fk_idx` (`fromuserid` ASC),\
  INDEX `to_user_id_fk_idx` (`touserid` ASC),\
  INDEX `cmt_item_id_fk_idx` (`itemid` ASC),\
  CONSTRAINT `cmt_item_id_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `from_user_id_fk`\
    FOREIGN KEY (`fromuserid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `to_user_id_fk`\
    FOREIGN KEY (`touserid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`trackinghistory` (\
  `hisid` INT NOT NULL,\
  `uid` INT NOT NULL,\
  `time` DATETIME NULL,\
  PRIMARY KEY (`hisid`),\
  INDEX `user_id_fk_idx` (`uid` ASC),\
  CONSTRAINT `login_user_id_fk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`tag` (\
  `tagid` INT NOT NULL,\
  `tagname` VARCHAR(45) NULL,\
  PRIMARY KEY (`tagid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`tagitemrela` (\
  `tagid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  PRIMARY KEY (`tagid`, `itemid`),\
  INDEX `post_id_fk_idx` (`itemid` ASC),\
  CONSTRAINT `tag_id_fk`\
    FOREIGN KEY (`tagid`)\
    REFERENCES `' + dbconfig.database + '`.`tag` (`tagid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `item_id_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`wishlist` (\
  `uid` INT NOT NULL,\
  `tagid` INT NOT NULL,\
  PRIMARY KEY (`uid`, `tagid`),\
  INDEX `tag_id_fk_idx` (`tagid` ASC),\
  CONSTRAINT `wishlist_user_id_fk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `wishlist_tag_id_fk`\
    FOREIGN KEY (`tagid`)\
    REFERENCES `' + dbconfig.database + '`.`tag` (`tagid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`location` (\
  `locid` INT NOT NULL,\
  `country` VARCHAR(45) NULL,\
  `state` VARCHAR(45) NULL,\
  `city` VARCHAR(45) NULL,\
  PRIMARY KEY (`locid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`address` (\
  `addrid` INT NOT NULL,\
  `uid` INT NOT NULL,\
  `addrline1` VARCHAR(45) NULL,\
  `addrline2` VARCHAR(45) NULL,\
  `zipcode` VARCHAR(45) NULL,\
  `phone` VARCHAR(45) NULL,\
  `locid` INT NULL,\
  PRIMARY KEY (`addrid`),\
  INDEX `location_id_fk_idx` (`locid` ASC),\
  INDEX `user_id_fk_idx` (`uid` ASC),\
  CONSTRAINT `location_id_fk`\
    FOREIGN KEY (`locid`)\
    REFERENCES `' + dbconfig.database + '`.`location` (`locid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `addr_user_id_fk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`offer` (\
  `oid` INT NOT NULL,\
  `itemid` INT NULL,\
  `uid` INT NULL,\
  `date` DATETIME NULL,\
  PRIMARY KEY (`oid`),\
  INDEX `offeruidfk_idx` (`uid` ASC),\
  INDEX `offersidfk_idx` (`itemid` ASC),\
  CONSTRAINT `offersidfk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `offeruidfk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`video` (\
  `videoid` INT NOT NULL,\
  `videourl` VARCHAR(45) NULL,\
  PRIMARY KEY (`videoid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`itemvideo` (\
  `videoid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  PRIMARY KEY (`videoid`, `itemid`),\
  INDEX `item_id_fk_idx` (`itemid` ASC),\
  CONSTRAINT `itemvideo_item_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `itemvideo_video_fk`\
    FOREIGN KEY (`videoid`)\
    REFERENCES `' + dbconfig.database + '`.`video` (`videoid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`inventory` (\
  `invid` INT NOT NULL,\
  `uid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  `status` VARCHAR(45) NULL,\
  `addeditme` DATETIME NULL,\
  PRIMARY KEY (`invid`),\
  INDEX `user_id_fk_idx` (`uid` ASC),\
  INDEX `item_id_fk_idx` (`itemid` ASC),\
  CONSTRAINT `inv_user_id_fk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `inv_item_id_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`sellpost` (\
  `sid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  `price` DECIMAL(20) NULL,\
  `date` DATETIME NULL,\
  `sellingcol` VARCHAR(45) NULL,\
  `userid` VARCHAR(45) NULL,\
  PRIMARY KEY (`sid`),\
  INDEX `salepost_itemid_fk_idx` (`itemid` ASC),\
  CONSTRAINT `salepost_itemid_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`like` (\
  `uid` INT NOT NULL,\
  `itemid` INT NOT NULL,\
  PRIMARY KEY (`uid`, `itemid`),\
  INDEX `likesidfk_idx` (`itemid` ASC),\
  CONSTRAINT `likeuidfk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `likesidfk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`share` (\
  `itemid` INT NOT NULL,\
  `uid` INT NOT NULL,\
  `content` BLOB NULL,\
  `date` DATETIME NULL,\
  `confidencerating` DECIMAL(10) NULL,\
  PRIMARY KEY (`itemid`, `uid`),\
  INDEX `shareuidfk_idx` (`uid` ASC),\
  CONSTRAINT `sharesidfk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `shareuidfk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`deal` (\
  `dealid` INT NOT NULL,\
  `oid` INT NULL,\
  `sid` INT NULL,\
  `date` DATETIME NULL,\
  `status` INT NULL,\
  PRIMARY KEY (`dealid`),\
  INDEX `dealoidfk_idx` (`oid` ASC),\
  INDEX `dealsidfk_idx` (`sid` ASC),\
  CONSTRAINT `dealoidfk`\
    FOREIGN KEY (`oid`)\
    REFERENCES `' + dbconfig.database + '`.`offer` (`oid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `dealsidfk`\
    FOREIGN KEY (`sid`)\
    REFERENCES `' + dbconfig.database + '`.`sellpost` (`sid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`ratinghistory` (\
  `uid` INT NOT NULL,\
  `dealid` INT NOT NULL,\
  `rating` VARCHAR(45) NULL,\
  `date` DATETIME NULL,\
  PRIMARY KEY (`uid`, `dealid`),\
  INDEX `ratingdealidfk_idx` (`dealid` ASC),\
  CONSTRAINT `ratinguidfk`\
    FOREIGN KEY (`uid`)\
    REFERENCES `' + dbconfig.database + '`.`user` (`uid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `ratingdealidfk`\
    FOREIGN KEY (`dealid`)\
    REFERENCES `' + dbconfig.database + '`.`deal` (`dealid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`img` (\
  `imgid` INT NOT NULL,\
  `imgurl` VARCHAR(45) NULL,\
  PRIMARY KEY (`imgid`))\
ENGINE = InnoDB;\
 ');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`itemimg` (\
  `itemid` INT NOT NULL,\
  `imgid` INT NOT NULL,\
  PRIMARY KEY (`itemid`, `imgid`),\
  INDEX `itemimg_img_fk_idx` (`imgid` ASC),\
  CONSTRAINT `itemimg_img_fk`\
    FOREIGN KEY (`imgid`)\
    REFERENCES `' + dbconfig.database + '`.`img` (`imgid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `itemimg_item_fk`\
    FOREIGN KEY (`itemid`)\
    REFERENCES `' + dbconfig.database + '`.`item` (`itemid`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION)\
ENGINE = InnoDB;\
 ');

console.log('Success: Database Created!');

connection.end();