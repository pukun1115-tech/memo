const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("HTMLファイルを読み込めませんでした");
            return;
        }
        
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(fileData);
    });
});

server.listen(3000, () => {
    console.log("サーバーが起動しました");
    console.log("http://localhost:3000");
});
