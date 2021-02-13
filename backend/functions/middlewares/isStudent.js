const { admin, db } = require('../admin');

module.exports=(req,res,next)=>{
  let token;
  if(req.headers.authorization&&req.headers.authorization.startsWith(`Bearer `)){
    token=req.headers.authorization.split(`Bearer `)[1];
  }else{
    return res.status(403).json({error:"Unauthorized"});
  }

  admin.auth().verifyIdToken(token)
  .then(decodedToken=>{
    req.user=decodedToken;
    return db.collection('student')
    .where('studentId','==',req.user.uid)
    .limit(1)
    .get();
  })
  .then(data=>{
    req.user.name=data.docs[0].data().name;
    req.user.studentId=data.docs[0].data().studentId;
    return next();
  })
  .catch(err=>{
    console.error(err);
    return res.status(403).json({error:"Unauthorized"});
  })
}
