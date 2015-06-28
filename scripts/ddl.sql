
-- -----------------------------------------------------
-- Schema firstAttempt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `firstAttempt` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

-- -----------------------------------------------------
-- Table `firstAttempt`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`user` (
  `uid` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `addrid` VARCHAR(45) NULL,
  PRIMARY KEY (`uid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`follow` (
  `followeeid` INT NOT NULL,
  `followerid` INT NOT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`followeeid`, `followerid`),
  INDEX `follower_fk_idx` (`followerid` ASC),
  CONSTRAINT `followee_fk`
    FOREIGN KEY (`followeeid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `follower_fk`
    FOREIGN KEY (`followerid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`item` (
  `itemid` INT NOT NULL,
  `itemno` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `status` INT NULL,
  `price` DECIMAL(20) NULL,
  `type` VARCHAR(45) NULL,
  `origintime` DATETIME NULL,
  PRIMARY KEY (`itemid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`comment` (
  `cmtid` INT NOT NULL,
  `itemid` INT NOT NULL,
  `fromuserid` INT NULL,
  `touserid` INT NULL,
  `content` LONGTEXT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`cmtid`),
  INDEX `from_user_id_fk_idx` (`fromuserid` ASC),
  INDEX `to_user_id_fk_idx` (`touserid` ASC),
  INDEX `cmt_item_id_fk_idx` (`itemid` ASC),
  CONSTRAINT `cmt_item_id_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `from_user_id_fk`
    FOREIGN KEY (`fromuserid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `to_user_id_fk`
    FOREIGN KEY (`touserid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`trackinghistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`trackinghistory` (
  `hisid` INT NOT NULL,
  `uid` INT NOT NULL,
  `time` DATETIME NULL,
  PRIMARY KEY (`hisid`),
  INDEX `user_id_fk_idx` (`uid` ASC),
  CONSTRAINT `login_user_id_fk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`tag` (
  `tagid` INT NOT NULL,
  `tagname` VARCHAR(45) NULL,
  PRIMARY KEY (`tagid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`tagitemrela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`tagitemrela` (
  `tagid` INT NOT NULL,
  `itemid` INT NOT NULL,
  PRIMARY KEY (`tagid`, `itemid`),
  INDEX `post_id_fk_idx` (`itemid` ASC),
  CONSTRAINT `tag_id_fk`
    FOREIGN KEY (`tagid`)
    REFERENCES `firstAttempt`.`tag` (`tagid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_id_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`wishlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`wishlist` (
  `uid` INT NOT NULL,
  `tagid` INT NOT NULL,
  PRIMARY KEY (`uid`, `tagid`),
  INDEX `tag_id_fk_idx` (`tagid` ASC),
  CONSTRAINT `wishlist_user_id_fk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `wishlist_tag_id_fk`
    FOREIGN KEY (`tagid`)
    REFERENCES `firstAttempt`.`tag` (`tagid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`location` (
  `locid` INT NOT NULL,
  `country` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  PRIMARY KEY (`locid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`address` (
  `addrid` INT NOT NULL,
  `uid` INT NOT NULL,
  `addrline1` VARCHAR(45) NULL,
  `addrline2` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `locid` INT NULL,
  PRIMARY KEY (`addrid`),
  INDEX `location_id_fk_idx` (`locid` ASC),
  INDEX `user_id_fk_idx` (`uid` ASC),
  CONSTRAINT `location_id_fk`
    FOREIGN KEY (`locid`)
    REFERENCES `firstAttempt`.`location` (`locid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `addr_user_id_fk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`offer` (
  `oid` INT NOT NULL,
  `itemid` INT NULL,
  `uid` INT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`oid`),
  INDEX `offeruidfk_idx` (`uid` ASC),
  INDEX `offersidfk_idx` (`itemid` ASC),
  CONSTRAINT `offersidfk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `offeruidfk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`video` (
  `videoid` INT NOT NULL,
  `videourl` VARCHAR(45) NULL,
  PRIMARY KEY (`videoid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`itemvideo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`itemvideo` (
  `videoid` INT NOT NULL,
  `itemid` INT NOT NULL,
  PRIMARY KEY (`videoid`, `itemid`),
  INDEX `item_id_fk_idx` (`itemid` ASC),
  CONSTRAINT `itemvideo_item_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `itemvideo_video_fk`
    FOREIGN KEY (`videoid`)
    REFERENCES `firstAttempt`.`video` (`videoid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`inventory` (
  `invid` INT NOT NULL,
  `uid` INT NOT NULL,
  `itemid` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  `addeditme` DATETIME NULL,
  PRIMARY KEY (`invid`),
  INDEX `user_id_fk_idx` (`uid` ASC),
  INDEX `item_id_fk_idx` (`itemid` ASC),
  CONSTRAINT `inv_user_id_fk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `inv_item_id_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`sellpost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`sellpost` (
  `sid` INT NOT NULL,
  `itemid` INT NOT NULL,
  `price` DECIMAL(20) NULL,
  `date` DATETIME NULL,
  `sellingcol` VARCHAR(45) NULL,
  `userid` VARCHAR(45) NULL,
  PRIMARY KEY (`sid`),
  INDEX `salepost_itemid_fk_idx` (`itemid` ASC),
  CONSTRAINT `salepost_itemid_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`like` (
  `uid` INT NOT NULL,
  `itemid` INT NOT NULL,
  PRIMARY KEY (`uid`, `itemid`),
  INDEX `likesidfk_idx` (`itemid` ASC),
  CONSTRAINT `likeuidfk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `likesidfk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`share`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`share` (
  `itemid` INT NOT NULL,
  `uid` INT NOT NULL,
  `content` BLOB NULL,
  `date` DATETIME NULL,
  `confidencerating` DECIMAL(10) NULL,
  PRIMARY KEY (`itemid`, `uid`),
  INDEX `shareuidfk_idx` (`uid` ASC),
  CONSTRAINT `sharesidfk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shareuidfk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`deal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`deal` (
  `dealid` INT NOT NULL,
  `oid` INT NULL,
  `sid` INT NULL,
  `date` DATETIME NULL,
  `status` INT NULL,
  PRIMARY KEY (`dealid`),
  INDEX `dealoidfk_idx` (`oid` ASC),
  INDEX `dealsidfk_idx` (`sid` ASC),
  CONSTRAINT `dealoidfk`
    FOREIGN KEY (`oid`)
    REFERENCES `firstAttempt`.`offer` (`oid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `dealsidfk`
    FOREIGN KEY (`sid`)
    REFERENCES `firstAttempt`.`sellpost` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`ratinghistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`ratinghistory` (
  `uid` INT NOT NULL,
  `dealid` INT NOT NULL,
  `rating` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`uid`, `dealid`),
  INDEX `ratingdealidfk_idx` (`dealid` ASC),
  CONSTRAINT `ratinguidfk`
    FOREIGN KEY (`uid`)
    REFERENCES `firstAttempt`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ratingdealidfk`
    FOREIGN KEY (`dealid`)
    REFERENCES `firstAttempt`.`deal` (`dealid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`img`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`img` (
  `imgid` INT NOT NULL,
  `imgurl` VARCHAR(45) NULL,
  PRIMARY KEY (`imgid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstAttempt`.`itemimg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstAttempt`.`itemimg` (
  `itemid` INT NOT NULL,
  `imgid` INT NOT NULL,
  PRIMARY KEY (`itemid`, `imgid`),
  INDEX `itemimg_img_fk_idx` (`imgid` ASC),
  CONSTRAINT `itemimg_img_fk`
    FOREIGN KEY (`imgid`)
    REFERENCES `firstAttempt`.`img` (`imgid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `itemimg_item_fk`
    FOREIGN KEY (`itemid`)
    REFERENCES `firstAttempt`.`item` (`itemid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


