USE `webAppDb`;

CREATE TABLE IF NOT EXISTS `Account` (
    accountID INT NOT NULL AUTO_INCREMENT, 
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `phoneNumber`VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthDate` DATE NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `typeOfUser` VARCHAR(255) NOT NULL, 
    PRIMARY KEY(accountID)
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
    category VARCHAR(255) UNIQUE,  
    PRIMARY KEY(categoryID)
);

CREATE TABLE IF NOT EXISTS `Location` (
    locationID INT NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(255) UNIQUE,  
    PRIMARY KEY(locationID)
);

CREATE TABLE IF NOT EXISTS Post (
    postID INT NOT NULL AUTO_INCREMENT, 
    accountID INT NOT NULL, 
    title VARCHAR(255),
    content VARCHAR(255),
    categoryID INT,
    locationID INT,
    timeWhenPosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (locationID) REFERENCES `Location`(locationID),
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID),
    FOREIGN KEY (accountID) REFERENCES `Account`(accountID), 
    PRIMARY KEY(postID) 
);


-- INSERT INTO Account (firstName, lastName, `password`, email, phoneNumber, birthDate, gender, typeOfUser) VALUES ('Dennis', 'Andersson', '$2b$10$LcOebxeCpIRiFLuZuVfNI.bY4qr88w1Lc4NqtLBtK8czjZP1EVK8e', 'dennisfram@hotmail.com', '0730896460', '1996-04-28', 'male', 'Admin');
-- INSERT INTO Account (firstName, lastName, `password`, email, phoneNumber, birthDate, gender, typeOfUser) VALUES ('Josefin', 'Lindvall', '$2b$10$LcOebxeCpIRiFLuZuVfNI.bY4qr88w1Lc4NqtLBtK8czjZP1EVK8e', 'j@j', '0703721510', '1997-12-26', 'female', 'Admin');

-- INSERT INTO Category (`category`) VALUES ('Hiking');
-- INSERT INTO Category (`category`) VALUES ('Cinema');
-- INSERT INTO Category (`category`) VALUES ('Dance');

-- INSERT INTO `Location` (`location`) VALUES('Stockholm');
-- INSERT INTO `Location` (`location`) VALUES('Aneby');
-- INSERT INTO `Location` (`location`) VALUES('Lund');