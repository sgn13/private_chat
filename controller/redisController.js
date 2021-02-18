var redis = require("redis");
var redisAdapter = require("socket.io-redis");
var connectedUsers = {};

exports.redis = (http) => {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", async (socket) => {
    var pub = redis.createClient();
    var sub = redis.createClient(null, null, { return_buffers: true });
    srv = http();
    var sio = io(srv, {
      adapter: redisAdapter({ pubClient: pub, subClient: sub }),
    });

    var secondConnecting = false;
    var secondId;
    srv.listen(function () {
      sio.on("connection", function (socket) {
        if (secondConnecting) {
          secondId = socket.id;
        } else {
          secondConnecting = true;
        }

        socket.on("broadcast event", function (payload) {
          socket.emit("broadcast event", payload);
        });
      });
    });

    var a = client(srv, { forceNew: true });
    a.on("broadcast event", function (payload) {
      expect().fail();
    });

    var b;
    a.on("connect", function () {
      b = client(srv, { forceNew: true });

      b.on("broadcast event", function (payload) {
        expect(payload).to.be("broadcast payload");
        setTimeout(done, 1000);
      });

      b.on("connect", function () {
        var emitter = ioe({ host: "localhost", port: "6379" });
        emitter
          .to(secondId)
          .broadcast.emit("broadcast event", "broadcast payload");
      });
    });
  });
};
