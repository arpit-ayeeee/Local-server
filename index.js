//WE'LL MAKE A SIMPLE SERVER USING NODE.JS
//We'll configure the index to use the node http module
const http = require('http');       //Here, we're using the http code modules
const fs = require('fs');       //We're gonna import the file system core module in order to serve the files, as it allows to read/write files in the local system
const path =require('path');        //Path module allow to specify the path of the file in the local system

const hostname = 'localhost';
const port = '3000';

//Setup the server
const server = http.createServer((req,res) => {             //The http module support this createServer method, which takes a function as a parameter. And this function takes request and response as a parameters
    console.log("Request for " + req.url + " by method " + req.method);  //headers is a method which req has. along with request url and method

    //STANDARD HELLO WORLD RESPONSE
    // res.statusCode = 200;           //statusCode method of res, will enable us to set the status for response
    // res.setHeader('Content-Type', 'text/html')      //Using the setHeader method we'll set the header for the response. It says that we're sending the response in the form of html format
    // res.end('<html><body><h1>HELLO BIATCH</h1></body></html>');    //We'll end the response
    
    //RESPONSE WITH FILE DIRECTORY
    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';      //For default
        else fileUrl = req.url;     //This way we'll construct which file to serve

        var filePath = path.resolve('./public' + fileUrl);      //path module supports resolve which sets the path for the request
        const fileExt = path.extname(filePath);     //We'll get the extension of the requested file
        if(fileExt == '.html'){                 //We'll check for an html file
            fs.exists(filePath, (exists) => {   //exists method of fs module checks if the file exists and gives us true or false, takes filePath and a callback function parameters
                if(!exists){            //Callback function takes value of exists as para, and if its false, it return a error response
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404 ' + fileUrl + ' not found</h1></body></html>');

                    return;
                }
                res.statusCode = 200;       //Otherwise the response will be this below
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);    //createreadstream method in fs module reads the file in the file path and then we'll pipe it in response     
            });
        }
        else{         //Here we'll send the error response, for not an html file
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404 ' + req.method + ' not supported.</h1></body></html>');
        }
    }
    else{         //We'll send an error response for wrong method
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404 ' + fileUrl + ' not found</h1></body></html>');

    }

})              

server.listen(port, hostname, () => {                //Listen method will start the server and it takes three parameters as showns
    console.log(`Server running at http://${hostname}:${port}`);        //Used backticks cause we used variables                                                //The third parameter is a function which will get executed once the server starts
})      

//This server will send a simply msg to client
