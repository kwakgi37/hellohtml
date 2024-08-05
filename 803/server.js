const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

let memberTblList = [
  {
    num: 1,
    img: './galleryimage/sky.jfif',
    employeename: '홍길동',
    department: '개발',
    position: '대리',
  },
];
let numCnt = 2;
let commentList = [
  { no: 1, cmt: '댓글1', cmtname: '홍길동' },
  { no: 2, cmt: '댓글2', cmtname: '김길동' },
];
let noCnt = 3;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/members', (req, res) => {
  res.json(memberTblList);
});

app.post('/members', (req, res) => {
  const newMember = {
    num: numCnt++,
    img: req.body.img,
    employeename: req.body.employeename,
    department: req.body.department,
    position: req.body.position,
  };
  memberTblList.push(newMember);
  res.json(newMember);
});

app.delete('/members/:num', (req, res) => {
  memberTblList = memberTblList.filter(
    (member) => member.num != req.params.num
  );
  res.sendStatus(200);
});

app.put('/members/:num', (req, res) => {
  const idx = memberTblList.findIndex((member) => member.num == req.params.num);
  if (idx != -1) {
    memberTblList[idx] = { ...memberTblList[idx], ...req.body };
    res.json(memberTblList[idx]);
  } else {
    res.sendStatus(404);
  }
});

app.get('/comments', (req, res) => {
  res.json(commentList);
});

app.post('/comments', (req, res) => {
  const newComment = {
    no: noCnt++,
    cmt: req.body.cmt,
    cmtname: req.body.cmtname,
  };
  commentList.push(newComment);
  res.json(newComment);
});

app.delete('/comments/:no', (req, res) => {
  commentList = commentList.filter((comment) => comment.no != req.params.no);
  res.sendStatus(200);
});

app.put('/comments/:no', (req, res) => {
  const idx = commentList.findIndex((comment) => comment.no == req.params.no);
  if (idx != -1) {
    commentList[idx] = { ...commentList[idx], ...req.body };
    res.json(commentList[idx]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
