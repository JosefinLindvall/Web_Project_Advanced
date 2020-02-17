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
    `typeOfUser` VARCHAR(255), 
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
    title VARCHAR(255),
    content VARCHAR(255),
    categoryID INT,
    locationID INT,
    timeWhenPosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (locationID) REFERENCES `Location`(locationID),
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID),
    PRIMARY KEY(postID) 
);


-- INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Help', 'Could I get som help getting firends? I am so lonely.', 'lonely@me.com')

-- INSERT INTO Category (`category`) VALUES ('Hiking')
-- INSERT INTO Category (`category`) VALUES ('Cinema')

-- INSERT INTO `Location` (`location`) VALUES('Stockholm')
-- INSERT INTO `Location` (`location`) VALUES('Aneby')