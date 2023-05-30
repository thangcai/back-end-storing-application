CREATE TABLE Users ( 
    id SERIAL NOT NULL, 
    firstName varchar(255) NOT NULL, 
    lastName varchar(255) NOT NULL,
    userName varchar(255) NOT NULL,  
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
