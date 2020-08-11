//WE'LL MAKE A SIMPLE SERVER USING NODE.JS
//We'll configure the index to use the node http module
const http = require('http');       //Here, we're using the http code modules


const hostname = 'localhost';
const port = '3000';

//Setup the server
const server = http.createServer((req,res) => {             //The http module support this createServer method, which takes a function as a parameter. And this function takes request and response as a parameters
    console.log(req.headers);       //headers is a method which req has.

    //Now we'll construct the response using res parameter
    res.statusCode = 200;           //statusCode method of res, will enable us to set the status for response
    res.setHeader('Content-Type', 'text/html')      //Using the setHeader method we'll set the header for the response. It says that we're sending the response in the form of html format
    res.end('<html><body><h1>HELLO BIATCH</h1></body></html>');    //We'll end the response
})           

server.listen(port, hostname, () => {                //Listen method will start the server and it takes three parameters as showns
    console.log(`Server running at http://${hostname}:${port}`);        //Used backticks cause we used variables                                                //The third parameter is a function which will get executed once the server starts
})      

//This server will send a simply msg to client