const response = require('../libs/responseLib');
const logger  = require('../libs/logger');


let isAuthenticated = (req, res, next) => {
  if(req.params.authToken  || req.query.authToken  || req.header('auth')){
    if(req.params.authToken =='a' || req.query.authToken == 'a' || req.header('auth')=='a'){
        req.user = { fullName: 'a' , userId: 'a'}
        next();
    }else{
       let api_response = response.generate(true,"Api token incorrect",5);
       res.send(api_response);
       logger.error("AuthToken incorrect","Auth: middleware",5);
    }
  }else{
    let api_response = response.generate(true,"Api token missing",5);
    res.send(api_response);
    logger.error("AuthToken Missing","Auth: middleware",5);
  }
    
}

module.exports = {
    isAuthenticated : isAuthenticated
}