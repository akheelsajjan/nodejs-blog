const moment  =  require('moment');

const timezone = 'Asia/Calcutta';

let now = () =>{
    return moment().utc.format();
}

let getLocalTime = () =>{
    return moment().tz(timezone).format();
}

module.exports = {
    now: now,
    getLocalTime: getLocalTime
}