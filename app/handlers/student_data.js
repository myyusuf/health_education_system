exports.list = function(req, res, db) {

  var query = "SELECT * FROM tb_siswa WHERE (stambuk_lama LIKE ? or stambuk_baru LIKE ? or nama LIKE ?) and " +
  "tingkat = ? order by nama LIMIT ?,? ";
  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';
  var level = req.param('level');

  // console.log('stambukBaruLike: ' + stambukBaruLike);

  db.query(
    query, [stambukLamaLike, stambukBaruLike, namaLike, level, pagenum * pagesize, pagesize],
    function(err, rows) {
      if (err) throw err;

      var query = "SELECT count(1) as totalRecords FROM tb_siswa WHERE (stambuk_lama LIKE ? or stambuk_baru LIKE ? or nama LIKE ? ) and " +
      "tingkat = ? ";
      db.query(
        query, [stambukLamaLike, stambukBaruLike, namaLike, level],
        function(err, rows2) {
          if (err) throw err;

          var totalRecords = rows2[0].totalRecords;
          res.json({data: rows, totalRecords: totalRecords});
        }
      );

    }
  );

};

exports.listAll = function(req, res, db) {

  if(req.param('level')){
    var studentLevel = parseInt(req.param('level'));

    var query = "SELECT * FROM tb_siswa WHERE tingkat = ? ";

    db.query(
      query, [studentLevel],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }else{
    var query = "SELECT * FROM tb_siswa ";

    db.query(
      query, [],
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
  }
};

exports.add = function(req, res, db) {

  var student = {
    stambuk_lama: req.body.stambukLama,
    stambuk_baru: req.body.stambukBaru,
    nama: req.body.nama,
    tingkat: req.body.tingkat
  };

  db.query('INSERT INTO tb_siswa SET ?', student, function(err, result){
    if(err){
      res.status(500).send('Error while doing operation, Ex. non unique stambuk');
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }

  });
};

exports.update = function(req, res, db) {

  var id = req.params.id

  var student = {
    stambuk_lama: req.body.stambukLama,
    stambuk_baru: req.body.stambukBaru,
    nama: req.body.nama,
    tingkat: req.body.tingkat
  };

  db.query(
  'UPDATE tb_siswa SET stambuk_lama = ? ,'+
  'stambuk_baru = ? ,' +
  'nama = ? ,' +
  'tingkat = ? ' +
  'WHERE id = ?',
  [
    student.stambuk_lama,
    student.stambuk_baru,
    student.nama,
    student.tingkat,
    id
  ],
  function (err, result) {
    if(err){
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'UPDATE_SUCCESS'});
    }
  });
};

exports.delete = function(req, res, db) {

  var id = req.params.id

  db.query(
  'DELETE FROM tb_siswa WHERE id = ?',
  [id],
  function (err, result) {
    if(err){
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'DELETE_SUCCESS', lastId: result.insertId});
    }
  });

};
