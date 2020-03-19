const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/split/name', (req, res) => {
    let newName = [];
    name = req.query.fullName;
    newName = name.split(' ');
      firstName=newName[0],
      lastName = newName[1]
    let response = {
        "firstname":firstName,
        "lastname": lastName
    }
    res.send(response);


});// end split name

app.get('/calculate/age', (req, res) => {
    /*
    let _age;
    dateString = req.query.dob;
    let birthday = new Date(dateString);
    this._age = new CalculateAge(birthday).age;

    function CalculateAge(birthday) {
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        let age = ageDate.getUTCFullYear() - 1970;
        _age = (age > 0) ? age : 0;
        return _age;
    }
    let response = {
        "age" : _age
    }
    res.send(response);



*/









/*



    date1 = req.query.dob;
    date = new Date(date1);
    year = date.getFullYear();
    
    month =date.getMonth();
    day =date.getDay();
    console.log(year)      
    console.log(month) 
    console.log(day)
    var today = new Date();

  var curr_date = today.getDate();

  var curr_month = today.getMonth();

  var curr_year = today.getFullYear();

  curr_month = curr_month + 1
  var age_diff = curr_year - year;

  if (curr_month < month) {
    age_diff = age_diff - 1;

  } else if (curr_month == month && curr_date < day) {
    age_diff = age_diff - 1;

  }

  return res.send({ data: age_diff })
*/
    
    date = req.query.dob;
    let birth = new Date(date);
    var today = new Date();
    var date2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let currentdate = new Date(date2);


    const diffTime = Math.abs(currentdate - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    newage = Math.floor(diffDays / 365);
    age = newage;
    let response = {
        "age": age
    }
    res.send(response)



});// end calculate age

app.listen(3000, () => {


})
