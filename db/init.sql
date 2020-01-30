-- CREATE TABLE IF NOT EXISTS Account (
--     firstName varchar(255),
--     lastName varchar(255),
--     email VARCHAR(255) PRIMARY KEY,
--     password VARCHAR(255),
--     birthDate DATE(255),
--     gender VARCHAR(255),
--     flag VARCHAR(255)
-- );

-- CREATE TABLE IF NOT EXISTS Post (
--     email VARCHAR(255) FOREIGN KEY ON Account email,
--     title VARCHAR(255),
--     content VARCHAR(255),
--     email + title PRIMARY KEY  
-- );

-- CREATE TABLE IF NOT EXISTS ContactMessage (
--     title VARCHAR(255),
--     content VARCHAR(255),
--     email VARCHAR(255), 
--     email + title PRIMARY KEY
-- );

-- INSERT INTO accounts (username, password) VALUES ("Alice", "abc123")