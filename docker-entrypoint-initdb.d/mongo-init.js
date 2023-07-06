db = db.getSiblingDB('sample_db');

db.createCollection('admin');

db.admin.insertOne({
  "login": "adminlogin"
});

db.createCollection('users');

db.users.insertMany([
  { "name": "Vasya_shell1", "email": "email1@test.com", "token": "", "refreshToken": "" },
  { "name": "Petro_shell2", "email": "email2@test.com", "token": "", "refreshToken": "" },
  { "name": "Kostya_shell3" , "email": "email3@test.com", "token": "", "refreshToken": "" }
]);