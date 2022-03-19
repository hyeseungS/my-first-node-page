const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

var passport = require("passport")
	, session = require("express-session")
	, NaverStrategy = require("passport-naver").Strategy;

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// var port = 8080
var port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`${port} 번 포트에 연결 중 ...`);
})

app.get('/', function(req, res) {
  res.render('index.ejs')
})

app.get('/chat', function(req, res) {
  res.render('chat.ejs')
})

const boardRouter = require("./routers/board");
app.use('/board', boardRouter);

io.on("connection", function (socket) {
	console.log("웹 소켓으로 서버에 연결 !");

	socket.on("enter_room", function (roomName, nickname, done) {
		console.log("방 이름 = " + roomName + ", 닉네임 = " + nickname);
		socket["nickname"] = nickname;
		socket.join(roomName);
		socket.to(roomName).emit("welcome", socket.nickname);
		done();
	})

	socket.on("nickname", function (nickname) {
		socket["nickname"] = nickname;
	})

	socket.on("new_msg", function (msg, roomName, done) {
		socket.to(roomName).emit("new_msg", `${socket.nickname}: ${msg}`);
		done();
	})

  socket.on("disconnecting", () => {
	for (const room of socket.rooms) {
		socket.to(room).emit("bye", socket.nickname);
	}
})
})

var passport = require('./controllers/user')(app);
var userRouter = require('./routers/user')(passport);
app.use("/user", userRouter)

