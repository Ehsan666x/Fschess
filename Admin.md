[ ]Admin panel:

    [] status of website . viwers/games/users with date

    []search user
    []search game with game code
    []search tournament with code
    []search bill
        []with code
        []with date

    [] 50 Users each page => 
        [] each user
            []profile page link 
            []register info - name, hashed pass, email, date, etc
            []personal info - age, experience, paypal etc
            []role -(user,GM,WGM,IM,etc)
            []rating
            []active
            []number of strikes
            []reports
              []report code
            []Coach
            []Previous classes
               []each class
                  [] class code
                  [] rate
                  [] status (cancelled,passed)
                  [] student
                  [] Coach
                  [] hours
                  [] date
                  [] student rate and comment 
            []Next class
              []class code
              []rate
              []student
              []teacher
              []hours
              []date  
            [] chat log 
                [] channels 
                    [] chat
            [] DM
            [] Game requests
            [] Games
               []game codes
               []tournament codes
            [] profile
               []discription
               []picture code
            []bills
            []delete user
                []reason
                []submit

    []tournaments
        []date
            []name
            []type
            []creator
            []games
                []game codes
            []standings



    []suggestions
        []username
            []comment

    []user reports
       []reported username
           []game code
           []username reports
           []comment

    []buggs
       []username
           []comment
           []game code

    []Finance
        []search for bill number
        []completed bill number
            []previous balance
            []type
                []class transaction                 
                    [] class code
                    [] rate
                    [] status (cancelled,passed)
                    [] student
                    [] Coach
                    [] hours
                    [] date
                    [] student rate and comment 
                []subscribe
                    []user name
                    []channel
                []donations
                    []username
                    []anonymous
                []withdrawal
                    []coach
                        []coach name
                    []personal user payment
                        []staff/user name
                    []other
                        []comment
                []deposit
                    []comment
            []amount
            []requested date
            []completed date
            []current balance

        []in_process requests
            []username
                []bill number



    
    []Transaction
        []type
            []withdrawal
                []coach
                    []coach name
                []personal user payment
                    []staff/user name
                []other
                    []comment
            []deposit
                []comment
        []date
        []amount
        []generate bill and download  
            

    []create user

    []disable payment bottons
       []date
           []reason
           []enable date
        
    []events
        []date
            []comment

  
           
           


--------------------
CREATE TABLE Users(
id SERIAL PRIMARY KEY,
Username VARCHAR(20) NOT NULL UNIQUE,
psw TEXT NOT NULL ,
email VARCHAR(20) NOT NULL UNIQUE,
role VARCHAR(10) NOT NULL,
active BOOLEAN NOT NULL,
strikes JSON,
report integer[],
Coach BOOLEAN, 
previous_classes integer[],
next_classes integer[],
dm integer REFERENCES dms(id),
game_requests JSON,
games BIGINT[],
tournaments INTEGER[],
description JSON,
pic_code INTEGER UNIQUE,
bill BIGINT[],
rapid INTEGER,
blitz INTEGER,
classic INTEGER,
fide INTEGER,
class_note json,
);

CREATE TABLE reports(
id SERIAL PRIMARY KEY,
report JSON
);
CREATE TABLE completed_classes(
id SERIAL PRIMARY KEY,
rate MONEY,
status VARCHAR(10),
student VARCHAR(20),
coach VARCHAR(20),
hours NUMERIC,
date TIMESTAMP,
student_rate_comment JSON
);
CREATE TABLE next_classes(
id SERIAL PRIMARY KEY,
rate MONEY NOT NULL,
student VARCHAR(20),
coach VARCHAR(20),
hours NUMERIC,
date timestamp 
);

CREATE TABLE dms(
id SERIAL PRIMARY KEY,
user1 VARCHAR(20) NOT NULL,
user2 VARCHAR(20) NOT NULL,
message JSON NOT NULL
);

CREATE TABLE games(
id BIGINT PRIMARY KEY,
pgn JSON
);

CREATE TABLE tournaments(
id SERIAL PRIMARY KEY,
name TEXT,
date TIMESTAMP,
time_control VARCHAR(10),
creator VARCHAR(20),
winners TEXT[],
games BIGINT[][]
);

CREATE TABLE bills(
id BIGINT PRIMARY KEY,
bill JSON
);