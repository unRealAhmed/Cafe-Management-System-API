CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  role VARCHAR(20) ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO user (name, email, password,role) 
VALUES ('Ahmed', 'ahmed@cafe.io', 'test1234','user')

UPDATE user
SET role = 'admin'
WHERE name = 'Ahmed';

create table category(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL UNIQUE,
  primary key(id)
);