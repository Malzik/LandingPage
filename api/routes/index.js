const redis = require("../bin/redis");
const client = redis.client;
const axios = require('axios');
const moment = require('moment');
const {getClass} = require("../bin/class");

const createUrl = function (name, date) {
  return `https://edt.mathiasughetto.fr/api/week/${name}/${date}`;
}

const getEdtFromApi = function (name, date) {
  return new Promise((resolve, reject) =>
      axios.get(createUrl(name, date))
          .then(response => {
            const data = response.data.slice(0, -1)
            client.set(`${name}:${date}`, JSON.stringify(data));
            resolve(data);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
  )};

exports.get_week = function(req, res) {
  let {classe, groupe, date} = req.params;

  if(date === undefined) {
    date = moment().startOf('week').add(1, 'day').format('D-M-YYYY');
  }

  const logDate = moment().format("DD/M/YYYY-H:m:ss");

  const name = getClass(classe, groupe);

  client.exists(`${name}:${date}`, function(err, reply) {
    if (reply === 1) {
      client.get(`${name}:${date}`, function(err, reply) {
        console.log(`${logDate} - From redis: ${name}:${date}`)
        res.json({data: JSON.parse(reply)})
      });
    } else {
      console.log(`${logDate} - From api: ${name}:${date}`)
      getEdtFromApi(name, date).then(data => {
        res.json({data})
      }).catch(error => {
        res.json({status: error.status, message: error.message})
      });
    }
  });
}

exports.refresh = function (req, res) {
  let {classe, groupe, date} = req.params;

  const name = getClass(classe, groupe);

  const logDate = moment().format("DD/M/YYYY-H:m:ss");
  client.exists(`${name}:${date}`, function(err, reply) {
    console.log(err ,name, date)
    if (reply === 1) {
      console.log(`${logDate} - From api: ${name}:${date}`)
      getEdtFromApi(name, date).then(data => {
        res.json({data})
      }).catch(error => {
        res.json({status: error.status, message: error.message})
      });
    }
  })
}