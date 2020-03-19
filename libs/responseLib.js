let generate = (err, message, status, data) => {
    let response = {
        err : err,
        msg : message,
        status : status,
        data : data 
    }

    return response;
}

module.exports = {
    generate: generate
}