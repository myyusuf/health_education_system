exports.listHospitalAll = function(req, res, db) {

  var query = "SELECT * FROM tb_rumah_sakit WHERE tipe = 1";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.listClinicAll = function(req, res, db) {

  var query = "SELECT * FROM tb_rumah_sakit WHERE tipe = 2";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.listStundentsInHospital = function(req, res, db) {
  var hospitalId = req.params.hospitalId;
  var hospitalIdInt = 0;

  if(hospitalId){
    hospitalIdInt = parseInt(hospitalId);
  }

  var searchDate = req.param('searchDate');
  var hospitalType = parseInt(req.param('hospitalType'));

  var startDate = new Date(searchDate.from);
  var endDate = new Date(searchDate.to);

  var query = "";
  if(hospitalType == 1){
    query = "SELECT tb_jadwal.*, tb_siswa.stambuk_lama, tb_siswa.stambuk_baru, " +
    "tb_siswa.id AS siswa_id, tb_siswa.nama AS nama_siswa, tb_bagian.nama AS nama_bagian, " +
    "tb_bagian.id AS bagian_id " +
    "FROM tb_jadwal " +
    "left join tb_siswa on tb_jadwal.siswa_id=tb_siswa.id " +
    "left join tb_bagian on tb_jadwal.bagian_id=tb_bagian.id " +
    "left join tb_nilai on tb_jadwal.nilai_id=tb_nilai.id " +
    "WHERE " +
    "(tb_jadwal.tipe_jadwal = 'RS') AND " +
    "tb_nilai.rs_id = ? AND " +
    "tb_jadwal.start_date <= ? AND tb_jadwal.end_date >= ? ";
  }else if(hospitalType == 2){
    query = "SELECT tb_jadwal.*, tb_siswa.stambuk_lama, tb_siswa.stambuk_baru, " +
    "tb_siswa.id AS siswa_id, tb_siswa.nama AS nama_siswa, tb_bagian.nama AS nama_bagian, " +
    "tb_bagian.id AS bagian_id " +
    "FROM tb_jadwal " +
    "left join tb_siswa on tb_jadwal.siswa_id=tb_siswa.id " +
    "left join tb_bagian on tb_jadwal.bagian_id=tb_bagian.id " +
    "left join tb_nilai on tb_jadwal.nilai_id=tb_nilai.id " +
    "WHERE " +
    "(tb_jadwal.tipe_jadwal = 'PS') AND " +
    "tb_nilai.puskesmas_id = ? AND " +
    "tb_jadwal.start_date <= ? AND tb_jadwal.end_date >= ? ";
  }


  db.query(
    query, [hospitalIdInt, startDate, endDate],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );
};

//--------------------------

exports.list = function(req, res, db) {

  var query = "SELECT * FROM tb_rumah_sakit WHERE kode LIKE ? or nama LIKE ? LIMIT ?,? ";
  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var kodeLike = req.param('searchTxt') + '%';
  var namaLike = req.param('searchTxt') + '%';

  db.query(
    query, [kodeLike, namaLike, pagenum * pagesize, pagesize],
    function(err, rows) {
      if (err) throw err;

      var query = "SELECT count(1) as totalRecords FROM tb_rumah_sakit WHERE kode LIKE ? or nama LIKE ? ";

      db.query(
        query, [kodeLike, namaLike],
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

  var query = "SELECT * FROM tb_rumah_sakit ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.add = function(req, res, db) {

  var hospital = {
    kode: req.body.kode,
    nama: req.body.nama,
    tipe: parseInt(req.body.tipe),
  };

  db.query('INSERT INTO tb_rumah_sakit SET ?', hospital, function(err, result){
    if(err){
      res.status(400).send(err.message);
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }

  });
};

exports.update = function(req, res, db) {

  var id = req.params.id

  var hospital = {
    kode: req.body.kode,
    nama: req.body.nama,
    tipe: req.body.tipe,
  };

  db.query(
  'UPDATE tb_rumah_sakit SET kode = ? ,'+
  'nama = ? ,' +
  'tipe = ? ' +
  'WHERE id = ?',
  [
    hospital.kode,
    hospital.nama,
    hospital.tipe,
    id
  ],
  function (err, result) {
    if(err){
      res.status(400).send('Error while doing operation.');
    }else{
      res.json({status: 'UPDATE_SUCCESS'});
    }
  });
};

exports.delete = function(req, res, db) {

  var id = req.params.id

  db.query(
  'DELETE FROM tb_rumah_sakit WHERE id = ?',
  [id],
  function (err, result) {
    if(err){
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'DELETE_SUCCESS', lastId: result.insertId});
    }
  });

};
