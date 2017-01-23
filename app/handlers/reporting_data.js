var moment = require('moment');

exports.costUnit = function(req, res, db) {

  var query = "SELECT tb_nilai.*, tb_siswa.nama AS nama_siswa, tb_bagian.nama AS nama_bagian, tb_jadwal.start_date, tb_jadwal.end_date " +
    "FROM tb_nilai " +
    "LEFT JOIN tb_siswa on tb_nilai.siswa_id = tb_siswa.id " +
    "LEFT JOIN tb_bagian on tb_nilai.bagian_id = tb_bagian.id " +
    "LEFT JOIN tb_jadwal on (tb_nilai.id = tb_jadwal.nilai_id AND tb_jadwal.tipe_jadwal = 'BA') " +
    "WHERE rs_id = ? AND " +
    "tb_jadwal.start_date >= ? AND tb_jadwal.end_date <= ? " +
    "LIMIT ?,? ";
  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var hospital = req.param('hospital');
  var hospitalInt = 0;
  if(hospital){
    hospitalInt = parseInt(hospital);
  }
  var searchDate = req.param('searchDate');
  var startDate = new Date(searchDate.from);
  var endDate = new Date(searchDate.to);

  const FEE_CONSTANT1 = 75000;
  const FEE_CONSTANT2 = 20000;
  const FEE_CONSTANT3 = 20000;
  const FEE_CONSTANT4 = 5000;
  const FEE_CONSTANT5 = 50000;
  const FEE_CONSTANT6 = 50000;
  const FEE_CONSTANT7 = 100000;

  db.query(
    query, [hospitalInt, startDate, endDate, pagenum * pagesize, pagesize],
    function(err, rows) {
      if (err) throw err;
      for(var i=0; i<rows.length; i++){

        var tmpStartDate = moment(rows[i].start_date);
        var tmpEndDate = moment(rows[i].end_date);
        tmpEndDate.add({seconds: 1});

        var lama = tmpEndDate.diff(tmpStartDate, 'weeks');

        var fee1 = lama * FEE_CONSTANT1;
        var fee2 = lama * FEE_CONSTANT2;
        var fee3 = lama * FEE_CONSTANT3;
        var fee4 = lama * FEE_CONSTANT4;
        var fee5 = lama * FEE_CONSTANT5;
        var fee6 = lama * FEE_CONSTANT6;
        var fee7 = lama * FEE_CONSTANT7;
        var total = fee1 + fee2 + fee3 + fee4 + fee5 + fee6 + fee7;

        rows[i]['lama'] = lama;
        rows[i]['fee1'] = fee1;
        rows[i]['fee2'] = fee2;
        rows[i]['fee3'] = fee3;
        rows[i]['fee4'] = fee4;
        rows[i]['fee5'] = fee5;
        rows[i]['fee6'] = fee6;
        rows[i]['fee7'] = fee7;
        rows[i]['total'] = total;
      }

      //---Count

      var query = "SELECT count(1) as totalRecords " +
        "FROM tb_nilai " +
        "LEFT JOIN tb_siswa on tb_nilai.siswa_id = tb_siswa.id " +
        "LEFT JOIN tb_bagian on tb_nilai.bagian_id = tb_bagian.id " +
        "LEFT JOIN tb_jadwal on (tb_nilai.id = tb_jadwal.nilai_id AND tb_jadwal.tipe_jadwal = 'BA') " +
        "WHERE rs_id = ? AND " +
        "tb_jadwal.start_date >= ? AND tb_jadwal.end_date <= ? ";

        db.query(
          query, [hospitalInt, startDate, endDate],
          function(err, rows2) {
            if (err) throw err;

            var totalRecords = rows2[0].totalRecords;
            res.json({data: rows, totalRecords: totalRecords});
          });
      //-------
    }
  );

};

exports.riwayatMPPD = function(req, res, db) {

  var query = "SELECT rm.*, s.* from tb_riwayat_mppd rm " +
    "LEFT JOIN tb_siswa s ON rm.siswa_id = s.id " +
    "WHERE (s.stambuk_lama LIKE ? or s.stambuk_baru LIKE ? or s.nama LIKE ?) " +
    "order by s.nama " +
    "LIMIT ?,? ";
    var pagesize = parseInt(req.param('pagesize'));
    var pagenum = parseInt(req.param('pagenum'));
    var stambukLamaLike = req.param('searchTxt') + '%';
    var stambukBaruLike = req.param('searchTxt') + '%';
    var namaLike = '%' + req.param('searchTxt') + '%';
    // var level = req.param('level');

    db.query(
      query, [stambukLamaLike, stambukBaruLike, namaLike, pagenum * pagesize, pagesize],
      function(err, rows) {
        if (err) throw err;

        var query = "SELECT count(1) as totalRecords from tb_riwayat_mppd rm " +
          "LEFT JOIN tb_siswa s ON rm.siswa_id = s.id " +
          "WHERE (s.stambuk_lama LIKE ? or s.stambuk_baru LIKE ? or s.nama LIKE ?) ";
        db.query(
          query, [stambukLamaLike, stambukBaruLike, namaLike],
          function(err, rows2) {
            if (err) throw err;

            var totalRecords = rows2[0].totalRecords;
            res.json({data: rows, totalRecords: totalRecords});
          }
        );

      }
    );

};
