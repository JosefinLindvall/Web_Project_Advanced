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



INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang utbilding', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'Lisa@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('a', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'pelle@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang blåbär', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'sara@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang kärlek', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'prutt@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang gräshoppor', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'sten@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang en stol', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'filt@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang livets mening', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'citronte@gmail.com');
INSERT INTO ContactMessage (`title`, `content`, `email`) VALUES ('Fråga ang droger', 'Hej, jag undrar om ni ens ä utbildade programmerare? Mvh Lisa', 'nemenhej@gmail.com');