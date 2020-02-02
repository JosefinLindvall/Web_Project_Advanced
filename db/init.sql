USE `webAppDb`;

CREATE TABLE IF NOT EXISTS `Account` (
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber`VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthDate` DATE NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `flag` VARCHAR(255), 
    PRIMARY KEY(`email`)
);

CREATE TABLE IF NOT EXISTS Post (
    email VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(255),
    category VARCHAR(255),
    `location` VARCHAR(255),
    FOREIGN KEY(email) REFERENCES Account(email),
    PRIMARY KEY(email, title)
);

CREATE TABLE IF NOT EXISTS ContactMessage (
    title VARCHAR(255),
    content VARCHAR(255),
    email VARCHAR(255), 
    timeWhenSent TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(email, title)
);

-- INSERT INTO Account (`firstName`, `lastName`, `email`, `password`, `birthDate`, `gender`, `flag`) VALUES ('Dennis', 'Andersson', 'dennisfram@hotmail.com', '5555', '1996-04-28', 'male', 'admin');
-- INSERT INTO Account (`firstName`, `lastName`, `email`, `password`, `birthDate`, `gender`, `flag`) VALUES ('Josefin', 'Lindvall', 'josefin.margareta.lindvall@gmail.com', '1234', '1997-12-26', 'female', 'admin');