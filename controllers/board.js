var dataArr = [{
	name: "김노드",
	title: "노드의 글",
	content: "안녕하세요 ~! Node.js 공부 중입니다"
}, {
	name: "아마존",
	title: "아마존의 글",
	content: "저는 서버 구축을 도와줍니다."
}, {
	name: "강큐밀",
	title: "강큐밀의 글",
	content: "hi KUSITMS !"
}, {
	name: "컴과생",
	title: "컴과생의 글",
	content: "cs공부하는 컴과생입니다..."
}, {
	name: "흑호랑",
	title: "흑호랑의 글",
	content: "올해는 호랑이해 @-@"
}]

const writeView = function (req, res) {
	res.render('write.ejs');
}

const listView = function (req, res) {
	console.log(dataArr);
	res.render('list.ejs', { posts: dataArr });
}

const addPost = function (req, res) {
	console.log(req.body);
	var key = req.body.name;
	var mydata = {
		name: req.body.name,
		title: req.body.title,
		content: req.body.content
	}
	if (key == "") {
		res.status(400).send('name 오류 !');
	}
	else {
		dataArr.push(mydata);
		res.status(200).send('데이터 전송 완료');
	}
}

const deletePost = function (req, res) {
	var value = req.body.name;
	dataArr = dataArr.filter(function (item) {
		return item.name !== value;
	})
	res.status(200).send('삭제 완료');
}

const getPost = function (req, res) {
	var ck = 0;
	var key = dataArr.filter(function (item) {
		if (req.params.key == item.name) {
			ck = 1;
			res.status(200).send(item);
			return;
		}
	})
	if (ck == 0) {
		res.status(400).send('NOT FOUND !')
	}
}

module.exports = {
	writeView,
	listView,
	addPost,
	deletePost,
	getPost
}