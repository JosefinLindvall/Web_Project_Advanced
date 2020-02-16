USE `webAppDb`;

CREATE TABLE IF NOT EXISTS `Account` (
    accountID INT NOT NULL AUTO_INCREMENT, 
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber`VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthDate` DATE NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `flag` VARCHAR(255), 
    PRIMARY KEY(accountID), 
    UNIQUE (`email`)
);

CREATE TABLE IF NOT EXISTS ContactMessage (
    contactMessageID INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255),
    content VARCHAR(255),
    email VARCHAR(255), 
    timeWhenSent TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(ContactMessageID)
);

CREATE TABLE IF NOT EXISTS Category (
    categoryID INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255),  
    PRIMARY KEY(categoryID)
);

CREATE TABLE IF NOT EXISTS `Location` (
    locationID INT NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(255),  
    PRIMARY KEY(locationID)
);

CREATE TABLE IF NOT EXISTS Post (
    postID INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255),
    content VARCHAR(255),
    categoryID INT,
    locationID INT,
    FOREIGN KEY (locationID) REFERENCES `Location`(locationID),
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID),
    PRIMARY KEY(postID) 
);