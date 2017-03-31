exports.list = function(req, res, db) {

  // console.log('req.user : ' + JSON.stringify(req.user));

  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';

  var queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, pagenum * pagesize, pagesize];

  var query = "SELECT tb_ujian_kompre.*, tb_siswa.stambuk_lama, tb_siswa.stambuk_baru, tb_siswa.nama " +
  "FROM tb_ujian_kompre " +
  "LEFT JOIN tb_siswa ON tb_ujian_kompre.siswa_id = tb_siswa.id " +
  "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) ";

  query += "order by tb_siswa.nama ";
  query += "LIMIT ?,? ";

  db.query(
    query, queryArgs,
    function(err, rows) {
      if (err) throw err;

      if(err){
        res.status(500).send('Error while doing operation.');
      }else{

        //---Count
        var query = "SELECT count(1) as totalRecords " +
        "FROM tb_ujian_kompre " +
        "LEFT JOIN tb_siswa ON tb_ujian_kompre.siswa_id = tb_siswa.id " +
        "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) "

        db.query(
          query, queryArgs,
          function(err, rows2) {
            if (err) throw err;

            var totalRecords = rows2[0].totalRecords;
            res.json({data: rows, totalRecords: totalRecords});
          }
        );
        //-------
      }
    }
  );
};

exports.update = function(req, res, db) {

  var id = req.params.id;

  var pre_kompre = req.body.pre_kompre == '' ? 0.0 : req.body.pre_kompre;
  var mid_kompre = req.body.mid_kompre == '' ? 0.0 : req.body.mid_kompre;
  var final_kompre = req.body.final_kompre == '' ? 0.0 : req.body.final_kompre;

  db.query(
  'UPDATE tb_ujian_kompre SET ' +
  'pre_kompre = ?, ' +
  'mid_kompre = ?, ' +
  'final_kompre = ? ' +
  'WHERE id = ?',
  [
    pre_kompre,
    mid_kompre,
    final_kompre,
    id
  ],
  function (err, result) {
    if(err){
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'OK'});
    }
  });
};
