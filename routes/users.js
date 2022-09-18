let NeDB = require('nedb');
let db = new NeDB({
  filename:'users.db',
  autoload: true,
});

module.exports = (app)=>{

  app.get('/users', (req, res)=> {
    db.find({}).sort({name:1}).exec((err, users)=>{
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({users});
      }
    });
  });

  app.get('/admin', (req, res)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      users: [{
        id:     1,
        name:   'Admin Name',
        email:  'admin@email.com',
      }]
    });
  });

  app.post('/users', (req, res)=> {
    db.insert(req.body, (err, user)=>{
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user)
      }
    });
  });

  let routeId = app.route('/users/:registration');
  
  routeId.get((req, res) => {
    db.findOne({registration:req.params.registration}).exec((err, user)=>{
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user)
      }
    });
  });

};
