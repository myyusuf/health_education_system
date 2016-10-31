var flow = require('nimble');

exports.list = function(req, res, db) {

  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';
  var division = req.param('searchDivision');

  // console.log('searchDivision : ' + division);

  var queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, pagenum * pagesize, pagesize];

  var divisionId = 0;
  if(division){
    divisionId = parseInt(division);
  }

  var query = "SELECT tb_nilai.*, tb_siswa.stambuk_lama, tb_siswa.stambuk_baru, tb_siswa.nama, " +
  "tb_bagian.nama AS nama_bagian, tb_jadwal.start_date, tb_jadwal.end_date, " +
  "rumah_sakit.id AS rumah_sakit_id, rumah_sakit.nama AS rumah_sakit_nama, " +
  "puskesmas.id AS puskesmas_id, puskesmas.nama AS puskesmas_nama, " +
  "tb_rekomendasi.id AS rekomendasi_id, tb_rekomendasi.nama AS rekomendasi_nama " +
  "FROM tb_nilai " +
  "LEFT JOIN tb_siswa ON tb_nilai.siswa_id = tb_siswa.id " +
  "LEFT JOIN tb_bagian ON tb_nilai.bagian_id = tb_bagian.id " +
  "LEFT JOIN tb_rumah_sakit rumah_sakit ON tb_nilai.rs_id = rumah_sakit.id " +
  "LEFT JOIN tb_rumah_sakit puskesmas ON tb_nilai.puskesmas_id = puskesmas.id " +
  "LEFT JOIN tb_rekomendasi ON tb_nilai.rekomendasi_id = tb_rekomendasi.id " +
  "RIGHT JOIN tb_jadwal ON (tb_nilai.id = tb_jadwal.nilai_id AND tb_jadwal.tipe_jadwal = 'BA') " +
  "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) " +
  "order by tb_siswa.nama ";

  if(division){
    query += "AND tb_nilai.bagian_id = ? "
    queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, divisionId, pagenum * pagesize, pagesize];
  }

  query += "LIMIT ?,? ";

  db.query(
    query, queryArgs,
    function(err, rows) {
      if (err) throw err;

      if(err){
        res.status(500).send('Error while doing operation.');
      }else{
        // for(var i=0; i< rows.length; i++){
        //   rows[i].start_date = convertUTCDateToLocalDate(rows[i].start_date);
        //   rows[i].end_date = convertUTCDateToLocalDate(rows[i].end_date);
        // }
        for(var i=0; i< rows.length; i++){
          rows[i].persentase10 = rows[i].tugas_ilmiah * 0.1;
          rows[i].persentase20 = rows[i].diskusi_mingguan * 0.2;
          rows[i].persentase35 = rows[i].ujian * 0.35;
          rows[i].persentase35b = rows[i].post_test * 0.35;
        }

        //---Count
        var query = "SELECT count(1) as totalRecords " +
        "FROM tb_nilai " +
        "LEFT JOIN tb_siswa ON tb_nilai.siswa_id = tb_siswa.id " +
        "LEFT JOIN tb_bagian ON tb_nilai.bagian_id = tb_bagian.id " +
        "LEFT JOIN tb_rumah_sakit rumah_sakit ON tb_nilai.rs_id = rumah_sakit.id " +
        "LEFT JOIN tb_rumah_sakit puskesmas ON tb_nilai.puskesmas_id = puskesmas.id " +
        "LEFT JOIN tb_rekomendasi ON tb_nilai.rekomendasi_id = tb_rekomendasi.id " +
        "RIGHT JOIN tb_jadwal ON (tb_nilai.id = tb_jadwal.nilai_id AND tb_jadwal.tipe_jadwal = 'BA') " +
        "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) "

        if(division){
          query += "AND tb_nilai.bagian_id = ? "
          queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, divisionId];
        }

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

  var convertUTCDateToLocalDate = function(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }
};

exports.update = function(req, res, db) {

  var id = req.params.id;

  var rs_id = req.body.rs_id == '' ? null : req.body.rs_id;
  var puskesmas_id = req.body.puskesmas_id == '' ? null : req.body.puskesmas_id ;
  var rekomendasi_id = req.body.rekomendasi_id == '' ? null : req.body.rekomendasi_id ;
  var pre_test = req.body.pre_test == '' ? 0.0 : req.body.pre_test;
  var tugas_ilmiah = req.body.tugas_ilmiah == '' ? 0.0 : req.body.tugas_ilmiah;
  var diskusi_mingguan = req.body.diskusi_mingguan == '' ? 0.0 : req.body.diskusi_mingguan;
  var ujian = req.body.ujian == '' ? 0.0 : req.body.ujian;
  var post_test = req.body.post_test == '' ? 0.0 : req.body.post_test;
  var nilai_akhir = req.body.nilai_akhir == '' ? 0.0 : req.body.nilai_akhir;
  var seminar = req.body.seminar == '' ? 0.0 : req.body.seminar;

  var updateScore = function(callback){
    db.query(
    'UPDATE tb_nilai SET rs_id = ?, '+
    'puskesmas_id = ?, ' +
    'rekomendasi_id = ?, ' +
    'pre_test = ?, ' +
    'tugas_ilmiah = ?, ' +
    'diskusi_mingguan = ?, ' +
    'ujian = ?, ' +
    'post_test = ?, ' +
    'nilai_akhir = ?, ' +
    'seminar = ? ' +
    'WHERE id = ?',
    [
      rs_id,
      puskesmas_id,
      rekomendasi_id,
      pre_test,
      tugas_ilmiah,
      diskusi_mingguan,
      ujian,
      post_test,
      nilai_akhir,
      seminar,
      id
    ],
    function (err, result) {
      if(err){
        callback(err);
      }else{
        callback();
      }
    });
  };

  var updateScheduleProgress = function(callback){

    var progress = 0;
    if(pre_test > 0){
      progress = 1
    }
    if(tugas_ilmiah > 0){
      progress = 2
    }
    if(diskusi_mingguan > 0){
      progress = 3
    }
    if(ujian > 0){
      progress = 4
    }
    if(post_test > 0){
      progress = 5
    }
    if(nilai_akhir > 0){
      progress = 6
    }
    if(seminar > 0){
      progress = 7
    }

    progress = progress / 7;

    db.query(
    "UPDATE tb_jadwal SET progress = ? " +
    "WHERE nilai_id = ? AND tipe_jadwal = 'BA' ",
    [
      progress,
      id
    ],
    function (err, result) {
      if(err){
        callback(err);
      }else{
        callback();
      }
    });
  }

  var updateParentScheduleProgress = function(callback){
    var query = "SELECT * FROM tb_jadwal WHERE nilai_id = ? AND tipe_jadwal = 'BA' ";

    db.query(
      query, [id],
      function(err, rows) {
        if (err) callback(err);

        var parentProgress = 0;

        if(rows.length > 0){

          var parentId = rows[0].parent_id;

          var query = "SELECT * FROM tb_jadwal WHERE parent_id = ? AND tipe_jadwal = 'BA' ";

          db.query(
            query, [parentId],
            function(err, rows2) {
              if (err) callback(err);

              var parentProgress = 0;
              var totalProgress = 0;
              for(var i=0; i<rows2.length; i++){
                totalProgress += rows2[i].progress;
              }

              parentProgress = totalProgress / rows2.length;

              //---Update---
              db.query(
              "UPDATE tb_jadwal SET progress = ? " +
              "WHERE id = ? ",
              [
                parentProgress,
                parentId
              ],
              function (err, result) {
                if(err){
                  callback(err);
                }else{
                  callback();
                }
              });
              //------------
            }
          );

        }else{
          callback();
        }

      }
    );
  };

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
        function (callback) {
            updateScore(callback);
        },
        function (callback) {
            updateScheduleProgress(callback);
        },
        function (callback) {
            updateParentScheduleProgress(callback);
        },
        function (callback) {

          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                callback(err);
              });
            }
            res.json({status: 'UPDATE_SUCCESS'});
          });
        }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });
};

exports.recommendationAll = function(req, res, db) {

  var query = "SELECT * FROM tb_rekomendasi ";

  db.query(
    query, [],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};
