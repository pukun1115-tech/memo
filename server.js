const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const server = http.createServer((request, response) => {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("index.htmlを読み込めませんでした。");
            return;
        }
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(fileData);
    });
});

server.on("upgrade", (request, socket, head) => {
    console.log("websocket接続を要求されました。");
    const websocketKey = request.headers["sec-websocket-key"];
    if (!websocketKey) {
        socket.destroy();
        return;
    }
    const magicString = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    const acceptKey = crypto
        .createHash("sha1")
        .update(websocketKey + magicString)
        .digest("base64");

    const response =
        "HTTP/1.1 101 Switching Protocols\r\n" +
        "Upgrade: websocket\r\n" +
        "Connection: Upgrade\r\n" +
        `Sec-WebSocket-Accept: ${acceptKey}\r\n` +
        "\r\n";

    socket.write(response);

    console.log("websocket接続が成功しました。");

    socket.on("end", () => {
        console.log("websocket接続が終了しました。");
    });

    socket.on("error", (error) => {
        console.log("websocketエラー:", error.message);
    });
});

server.listen(3000, () => {
    console.log("サーバーが起動しました");
    console.log("http://localhost:3000");
});
