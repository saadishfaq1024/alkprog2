const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var moment = require("moment");
const mysql = require("mysql");
// helps extract data from client
const bodyParser = require("body-parser");
// cors is not best to be used on production; will need to do something different on prod
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

var Users = require("./Users");
app.use("/users", Users);

var RegisterMembers = require("./registerMembers");
app.use("/members", RegisterMembers);

var RegisterClients = require("./registerClients");
app.use("/clients", RegisterClients);

var AssignClients = require("./assignClients");
app.use("/assignClients", AssignClients);

var GetTherapists = require("./getTherapists");
app.use("/therapists", GetTherapists);

var NewTransaction = require("./newTransaction");
app.use("/trans", NewTransaction);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Artm@y08",
  database: "dev2qa"
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// connect to database
con.connect(err => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

// creating a test GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO0001 REACT" });
});

// show all calendar events
app.get("/events", function(req, res) {
  var sql = "SELECT * FROM testevent";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show all calendar (copy) events
app.get("/eventscopy", function(req, res) {
  var sql = "SELECT * FROM testevent";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show all members
app.get("/members", function(req, res) {
  var sql = "SELECT * FROM members";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show active members
app.get("/members/active", function(req, res) {
  var sql = "SELECT * FROM members WHERE active = 1";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show accounts
app.get("/accounts", function(req, res) {
  var sql = "SELECT * FROM accounts";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      res.json(rows);
    }
  });
});

// show all transactions transactions
app.get("/transactions", function(req, res) {
  var sql =
    "SELECT DATE_FORMAT(date, '%m/%d/%Y') as transDate, transType, payor, amount, method, description  from transactions";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      res.json(rows);
    }
  });
});

// show all invoices
app.get("/invoices", function(req, res) {
  var sql = "SELECT * FROM invoices";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      res.json(rows);
    }
  });
});

// show full name of active therapists
app.get("/gettherapists", function(req, res) {
  var sql = "SELECT member_full_name FROM members WHERE active = 1 ";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show all active clients
app.get("/getclients", function(req, res) {
  var sql = "SELECT client_full_name FROM clients WHERE active = 1 ";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// clients from hardcoded member
app.get("/selectedclients", function(req, res) {
  var sql =
    "SELECT * FROM clients WHERE assi_therapist_full_name = 'Harry Potter'";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show all clients
app.get("/allclients", function(req, res) {
  var sql = "SELECT * FROM clients";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show all active clients
app.get("/clients/active", function(req, res) {
  var sql = "SELECT * FROM clients WHERE active = 1";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// get id, first and last name from clients
app.get("/clientlist", function(req, res) {
  var sql = "SELECT id, first_name, last_name FROM clients";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// get id and show payor full name
app.get("/payors", function(req, res) {
  var sql = "SELECT id, billing_full_name FROM clients";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// hardcoded member information
app.get("/memberInfo", function(req, res) {
  var sql =
    "SELECT title, first_name, last_name, role, email, phone, street_address, city, zip, location, npi, pass, confirm_pass FROM members WHERE first_name = 'Harry'";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// show basic member information
app.get("/membersTable", function(req, res) {
  var sql = "SELECT first_name, last_name, role, email, phone FROM members";
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

// instert manual transaction
app.post("/putTrans", function(req, res) {
  //var title = req.body.title;
  con.query(
    "INSERT INTO transactions (date, transType, payor, amount, method, description) VALUES (?, ?, ?, ?, ?,?) ",
    [
      req.body.date,
      req.body.transactionType,
      req.body.payor,
      req.body.amount,
      req.body.paymentMethod,
      req.body.description
    ],
    function(err, rows) {
      if (err) {
        res.json({ Error: true, Message: "Error Execute Sql", err });
      } else {
        // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
        res.json(rows);
      }
    }
  );
});

// INSERT CALENDAR EVENT
app.post("/insertevent", function(req, res) {
  //var logs = [];
  var formdata = req.body;
  var newClient = formdata.newClient;
  var newBillType = formdata.newBillType;
  // var newClientType = formdata.newClientType;
  //var newClient = formdata.newClient;
  var newTherapist = formdata.newTherapist;
  var newLocation = formdata.newLocation;
  var newCategory = formdata.newCategory;
  var checkedRepeat = formdata.checkedRepeat; //true,false
  var repeatOption = formdata.repeatOption; //"Daily","Weekly","Monthly","Custom"
  var newEndRepeat = formdata.newEndRepeat; //"After","On Date"
  var newCustomFreq = formdata.newCustomFreq; //"Specifid Days","Every x days","Weekly","Monthly"
  var newRepeatEveryNumDays = formdata.newRepeatEveryNumDays;
  var newRepeatEveryNumWeeks = formdata.newRepeatEveryNumWeeks;
  var newRepeatEveryNumMonths = formdata.newRepeatEveryNumMonths;
  var sun = formdata.sun;
  var mon = formdata.mon;
  var tues = formdata.tues;
  var wed = formdata.wed;
  var thu = formdata.thu;
  var fri = formdata.fri;
  var sat = formdata.sat;
  var selected_days = [sun, mon, tues, wed, thu, fri, sat];
  var start_dates = [];
  var end_dates = [];

  //------------------occurances-----------------------------
  var existingNumOccurences = formdata.existingNumOccurences; //"4"
  var occurances_to_add = 0;
  if (existingNumOccurences)
    occurances_to_add = parseInt(existingNumOccurences);
  var occurances_added = 0;
  var interval = 0;
  var interval_unit = "days";
  //---------------------------------------------------------
  //------------------dates----------------------------------
  var selectedDate = formdata.selectedDate; //start date
  var endSelectedDate = formdata.endSelectedDate; //end date
  var first_start_date = moment(selectedDate, "YYYY-MM-DD HH:mm:ss");
  var start_date_to_add = moment(selectedDate, "YYYY-MM-DD HH:mm:ss");
  var end_date_to_add = moment(endSelectedDate, "YYYY-MM-DD HH:mm:ss");

  var date_limit = moment(start_date_to_add).add(1, "seconds");
  var selectedDateOccurenceEnd = formdata.selectedDateOccurenceEnd; // repeat end date "2019-09-18 03:41:00"
  if (selectedDateOccurenceEnd) {
    var date_limit_str =
      selectedDateOccurenceEnd.substring(0, 10) +
      " " +
      selectedDate.substring(11, 19);
    date_limit = moment(date_limit_str, "YYYY-MM-DD HH:mm:ss");
  }
  //---------------------------------------------------------

  //these logs are added to response just for debugging
  //after full testing, these may be removed
  /*
  logs.push("start_date_to_add");
  logs.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
  logs.push("end_date_to_add");
  logs.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
  logs.push("date_limit");
  logs.push(date_limit.format("YYYY-MM-DD HH:mm:ss"));
  logs.push("checkedRepeat");
  logs.push(checkedRepeat);
  logs.push("repeatOption");
  logs.push(repeatOption);
  logs.push("newCustomFreq");
  logs.push(newCustomFreq);
  logs.push("newEndRepeat");
  logs.push(newEndRepeat);
  logs.push("existingNumOccurences");
  logs.push(existingNumOccurences);
  */

  /*
  
    In the while loop  these two arrays start_dates and end_dates are filled
    and then used the dates in them to make insert queries whether its one appointment
     or multiple appointments that needs to be created

     The while loop runs until the required number of occourances are added or
     the last date comes as given by user to stop the repeat appointments

     The dates are created by adding up days to the first date (provided by user)
     The number of days to be added is decided based on the interval (provided by user)
     or just 1 day is added in each iteration and only the specific days get added
     */
  while (
    (!checkedRepeat && occurances_added < 1) ||
    (checkedRepeat &&
      newEndRepeat === "After" &&
      occurances_added < occurances_to_add) ||
    (checkedRepeat &&
      newEndRepeat === "On Date" &&
      start_date_to_add <= date_limit)
  ) {
    //logs.push("while");
    if (repeatOption === "Daily") interval = 1;
    else if (repeatOption === "Weekly") interval = 7;
    else if (repeatOption === "Monthly") {
      interval = 1;
      interval_unit = "months";
    } else if (repeatOption === "Custom") {
      if (newCustomFreq === "Every x days") interval = newRepeatEveryNumDays;
      else if (newCustomFreq === "Weekly")
        interval = newRepeatEveryNumWeeks * 7;
      else if (newCustomFreq === "Monthly") {
        interval = newRepeatEveryNumMonths;
        interval_unit = "months";
      }
    }

    if (repeatOption === "Custom" && newCustomFreq === "Specific Days") {
      //logs.push("specific days");
      if (
        occurances_added < 1 ||
        (occurances_added > 0 && selected_days[start_date_to_add.day()])
      ) {
        start_dates.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
        end_dates.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
        occurances_added++;
      }
      start_date_to_add.add(1, "days");
      end_date_to_add.add(1, "days");
    } else {
      occurances_added++;
      start_dates.push(start_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
      end_dates.push(end_date_to_add.format("YYYY-MM-DD HH:mm:ss"));
      start_date_to_add = start_date_to_add.add(interval, interval_unit);
      end_date_to_add = end_date_to_add.add(interval, interval_unit);

      // for a special case e.g. a user creates an appointment on 31st and sets a monthly repetition
      //using moment library 31st + 1 month -> 30th and then 30th + 1 month -> 30th (even if month has 31 days)
      //so I have checked each repitition's date and adjusted it to set the real date wheneever available
      if (interval_unit === "months") {
        var month_end_diff = first_start_date.date() - start_date_to_add.date();
        if (month_end_diff > 0) {
          var new_start_date_to_add = moment(start_date_to_add).add(
            month_end_diff,
            "days"
          );
          var new_end_date_to_add = moment(end_date_to_add).add(
            month_end_diff,
            "days"
          );
          if (start_date_to_add.month() === new_start_date_to_add.month())
            start_date_to_add = new_start_date_to_add;
          end_date_to_add = new_end_date_to_add;
        }
      }
    }
  }

  var sql =
    "INSERT INTO testevent (title, bill_type, client, therapist, location, category, start, end ) VALUES";
  for (var i = 0; i < start_dates.length; i++) {
    sql +=
      " ('" +
      newClient +
      "','" +
      newBillType +
      "','" +
      //newClientType + "','" +
      newClient +
      "','" +
      newTherapist +
      "','" +
      newLocation +
      "','" +
      newCategory +
      "','" +
      start_dates[i] +
      "','" +
      end_dates[i] +
      "')";
    if (i < start_dates.length - 1) sql += ",";
  }
  // res.json({logs:logs,start_dates:start_dates,end_dates:end_dates,query:sql});
  con.query(sql, function(err, rows) {
    if (err) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});

//WHERE EXISTS TABLE; Need to eventually cleanup for protection
app.post("/putNewMember2", function(req, res) {
  //var title = req.body.title;

  var sql =
    "INSERT INTO members (role, title, first_name, last_name, email, phone, street_address, city, zip, location, npi, pass, confirm_pass) VALUES ('" +
    req.body.newRole +
    "','" +
    req.body.newTitle +
    "','" +
    req.body.newFirstName +
    "','" +
    req.body.newLastName +
    "','" +
    req.body.newEmail +
    "','" +
    req.body.newPhone +
    "','" +
    req.body.newStreetAddress +
    "','" +
    req.body.newCity +
    "','" +
    req.body.newZip +
    "','" +
    req.body.newLocation +
    "','" +
    req.body.newNPI +
    "','" +
    req.body.newPass +
    "','" +
    req.body.newConfirmPass +
    "') WHERE NOT EXISTS SELECT email from members WHERE email = '" +
    req.body.newEmail +
    "'";
  con.query(sql, function(err, rows) {
    if ((req.body.newEmail = con.query("EXISTS SELECT email from members"))) {
      res.json({ Error: true, Message: "Error Execute Sql", err });
    } else {
      // res.json({ "Error": false, "Message": "Success", "Visitors": rows });
      res.json(rows);
    }
  });
});
