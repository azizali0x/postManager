const app = require('./app')
const http = require("http");
const {PORT} = require("./utils/config");

console.clear();

http.createServer(app);
app.listen(PORT,()=>{
    console.log(`application is running is running of port ${PORT}`);
})