CREATE SCHEMA `sticky` ;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` text,
  `role` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`id`)
);

CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note` text,
  `status` varchar(45) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`)
)

CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `userID` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_idx` (`userID`),
  CONSTRAINT `user` FOREIGN KEY (`userID`) REFERENCES `user` (`id`)
)

-- Register and create a user, and then run this query to promote the user to admin
-- This admin has elevated permissions like promoting users, access to activity log, and CRUD applications on all notes
UPDATE `sticky`.`user` SET `role` = 'admin' WHERE (`id` = '1');


-- Dummy users
INSERT INTO user (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Doe', 'jane@example.com'),
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com'),
('Emily Davis', 'emily@example.com'),
('Michael Wilson', 'michael@example.com'),
('Sarah Brown', 'sarah@example.com'),
('David Taylor', 'david@example.com');

-- Dummy notes
INSERT INTO notes (userID, note, status) VALUES
(2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'public'),
(3, 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'private'),
(4, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'public'),
(6, 'Nulla quis lorem ut libero malesuada feugiat.', 'public'),
(5, 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 'private'),
(8, 'Cras ultricies ligula sed magna dictum porta.', 'public'),
(7, 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.', 'public'),
(2, 'Vivamus suscipit tortor eget felis porttitor volutpat.', 'private'),
(3, 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', 'public'),
(1, 'Proin eget tortor risus.', 'public'),
(8, 'Donec rutrum congue leo eget malesuada.', 'private'),
(6, 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.', 'public');

INSERT INTO log (description, userID) VALUES
('Created a note', 2),
('Created a note', 3),
('Created a note', 4),
('Created a note', 6),
('Created a note', 5),
('Created a note', 8),
('Created a note', 7),
('Created a note', 2),
('Created a note', 3),
('Created a note', 1),
('Created a note', 8),
('Created a note', 6);




