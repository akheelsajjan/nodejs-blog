const response = require('../libs/responseLib');
const time = require('../libs/libs');

let errorHandler = (err,req, res, next) => {
   
    console.log("application error handler called");
    console.log(err);
    console.log(time.getLocalTime);
    let apiResponse = response.generate(true, 'Some error occured at global level', 500, null);
    res.send(apiResponse);
  
    
}// end request ip logger function 

let notFoundHandler = (req,res,next)=>{

    console.log("Global not found handler called");
    
    
    let apiResponse = response.generate(true, 'Route not found in the application', 404, null);
    res.send(apiResponse);

}// end not found handler

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}
