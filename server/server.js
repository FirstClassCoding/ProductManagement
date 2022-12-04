const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const getData = require('../database/data.json');
const changeData = JSON.stringify(getData);
const data = JSON.parse(changeData);

const getHistory = require('../database/history.json');
const changeHistory = JSON.stringify(getHistory);
const history = JSON.parse(changeHistory);

var urlencodedParser = bodyParser.urlencoded({extended: false});

function getTime() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  return `${(h < 10 ? '0' + h : h)}:${(m < 10 ? '0' + m : m)}:${(s < 10 ? '0' + s : s)}`;
}

function getDate() {
  let d = new Date().getDate();
  let m = new Date().getMonth() + 1;
  let y = new Date().getFullYear();
  return `${(d < 10 ? '0' + d : d)}/${(m < 10 ? '0' + m : m)}/${y}`;
}

function saveData(data) {
  fs.writeFile('../database/data.json', JSON.stringify(data), 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File. (data)');
        return console.log(err);
    }
    console.log('JSON data file has been saved.');
  })
}

function saveHistory(data) {
  fs.writeFile('../database/history.json', JSON.stringify(data), 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File. (history)');
        return console.log(err);
    }
    console.log('JSON history file has been saved.');
  })
}

function updateHistory(getData, method) {
  let key = 0;

  for (key in history.Name) {}
  key++;

  history.Name[key] = getData.name;
  history.Transaction[key] = method + getData.amount;
  for (let dataKey in data.Name) {
    if (data.Name[dataKey] === getData.name) {
      history.Amount[key] = data.Amount[dataKey];
      break;
    }
  }
  history.Date[key] = getDate();
  history.Time[key] = getTime();

  saveHistory(history);
}

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/data', (req, res) => {
    let newData = [];

    for (let key in data.Name) {
      newData.push({
        Name: data.Name[key],
        Description: data.Description[key],
        Amount: data.Amount[key],
        Price: data.Price[key],
        Date: data.Date[key],
        Time: data.Time[key]
      });
    }

    res.json(newData);
});

app.post('/data', (req, res) => {
    let getData = req.body.listData;
    let key = 0;

    for (key in data.Name){}
    key++;

    data.Name[key] = getData.name;
    data.Description[key] = getData.description;
    data.Amount[key] = (getData.amount == '' ? '0' : getData.amount);
    data.Price[key] = getData.price;
    data.Date[key] = getDate();
    data.Time[key] = getTime();

    saveData(data);

    console.log('[', getDate(), getTime(), ']', 'Method : POST, Addlist');
    console.log(getData);
});

app.put('/data', (req, res) => {
  let getData = req.body.listData;

  for (let key in data.Name) {
    if (data.Name[key] === getData.name) {
      data.Name[key] = getData.name;
      data.Description[key] = getData.description;
      data.Amount[key] = (getData.amount == '' ? '0' : getData.amount);
      data.Price[key] = getData.price;
      break;
    }
  }

  saveData(data);

  console.log('[', getDate(), getTime(), ']', 'Method : PUT, Editlist');
  console.log(getData);
});

app.delete('/data', (req, res) => {
  let getData = req.body.listData;
  let newData = {
    Name: {},
    Description: {},
    Amount: {},
    Price: {},
    Date: {},
    Time: {}
  };

  let check = false;
  
  for (let key in data.Name) {
    if (data.Name[key] === getData.name) {
      delete data.Name[key];
      delete data.Description[key];
      delete data.Amount[key];
      delete data.Price[key];
      delete data.Date[key];
      delete data.Time[key];
      check = true;
    }
    if (check) {
      if (data.Name[parseInt(key)+1] == undefined) {
        break;
      }
      newData.Name[key] = data.Name[parseInt(key)+1];
      newData.Description[key] = data.Description[parseInt(key)+1];
      newData.Amount[key] = data.Amount[parseInt(key)+1];
      newData.Price[key] = data.Price[parseInt(key)+1];
      newData.Date[key] = data.Date[parseInt(key)+1];
      newData.Time[key] = data.Time[parseInt(key)+1];
    }
    else {
      newData.Name[key] = data.Name[key];
      newData.Description[key] = data.Description[key];
      newData.Amount[key] = data.Amount[key];
      newData.Price[key] = data.Price[key];
      newData.Date[key] = data.Date[key];
      newData.Time[key] = data.Time[key];
    }
  }

  saveData(newData);

  console.log('[', getDate(), getTime(), ']', 'Method : DELETE, Deletelist');
  console.log(getData);
});

app.put('/data/buygoods', (req, res) => {
  let getData = req.body.listData;

  for (let key in data.Name) {
    if (data.Name[key] === getData.name) {
      data.Amount[key] = parseInt(data.Amount[key]) + (getData.amount == '' ? 0 : parseInt(getData.amount));
    }
  }

  saveData(data);
  updateHistory(getData, '+');

  console.log('[', getDate(), getTime(), ']', 'Method : PUT, Buygoods');
  console.log(getData);
});

app.put('/data/sellgoods', (req, res) => {
  let getData = req.body.listData;

  for (let key in data.Name) {
    if (data.Name[key] === getData.name) {
      data.Amount[key] = parseInt(data.Amount[key]) - (getData.amount == '' ? 0 : parseInt(getData.amount));
    }
  }

  saveData(data);
  updateHistory(getData, '-');

  console.log('[', getDate(), getTime(), ']', 'Method : PUT, Sellgoods');
  console.log(getData);
});

app.get('/history', (req, res) => {
  let newData = [];

  for (let key in history.Name) {
    newData.push({
      Name: history.Name[key],
      Transaction: history.Transaction[key],
      Amount: history.Amount[key],
      Date: history.Date[key],
      Time: history.Time[key]
    });
  }

  res.json(newData);
});

app.listen(3000, () => {
    console.log('[', getDate(), getTime(), ']', 'Start server at port 3000');
});