const Database = require("@replit/database");
const db = new Database();

const writeView = function(req, res){
  res.render('write.ejs');
}

const listView = async function(req, res){
  var keyList = [];
  var dataArr = [];
  await db.list().then(keys => {
    keyList = keys;
  });

  for(let element of keyList){
    await db.get(element).then(value =>{
      dataArr.push(value);
    });
  }

  console.log(dataArr);
  res.render('list.ejs', { posts : dataArr });
}

const addPost = function(req, res){
  //console.log(req.body.name);  
  var key = req.body.name;
  var mydata ={
    name: req.body.name,
    title: req.body.title,
    cotent: req.body.content
  }
  if(key == ""){
    res.status(400).send('name 오류');
  }
  else{
    db.set(key, mydata).then(() => {});
    res.send('데이터 전송 완료');
  }  
}

const deletePost = function(req, res){
  //console.log(req.body);
  db.delete(req.body.name).then(() => {
    res.status(200).send('삭제 완료');
  });
}

const getPost = function(req, res){
  console.log(req.params.key);
  
  db.get(req.params.key).then(value => {
    if(value == null){
      res.status(400).send("NOT FOUND !");
    }
    else{
      res.status(200).send(value);
    }
  });
}

module.exports = {
  writeView,
  listView,
  addPost,
  deletePost,
  getPost
}