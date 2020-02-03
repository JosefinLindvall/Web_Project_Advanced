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
    PRIMARY KEY(accountID)
);

CREATE TABLE IF NOT EXISTS ContactMessage (
    contactMessageID INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255),
    content VARCHAR(255),
    email VARCHAR(255), 
    timeWhenSent TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(ContactMessage)
);

CREATE TABLE IF NOT EXISTS Post (
    postID INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255),
    content VARCHAR(255),
    category VARCHAR(255),
    cityLocation VARCHAR(255),
    FOREIGN KEY (cityLocation) REFERENCES `Location`(cityLocation),
    FOREIGN KEY (category) REFERENCES Categorys(category),
    PRIMARY KEY(postID) 
);

CREATE TABLE IF NOT EXISTS Categorys (
    categoryID INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255),  
    PRIMARY KEY(categoryID)
);

CREATE TABLE IF NOT EXISTS `Location` (
    locationID INT NOT NULL AUTO_INCREMENT,
    cityLocation VARCHAR(255),  
    PRIMARY KEY(locationID)
);
