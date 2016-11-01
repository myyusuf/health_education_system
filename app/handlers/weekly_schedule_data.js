exports.list = function(req, res, db) {

  var pagesize = parseInt(req.param('pagesize'));
  var pagenum = parseInt(req.param('pagenum'));
  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';
  var division = req.param('searchDivision');

  var searchDate = req.param('searchDate');

  var startDate = new Date(searchDate.from);
  var endDate = new Date(searchDate.to);

  var queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, startDate, endDate, pagenum * pagesize, pagesize];

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
  "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) and " +
  "(tb_jadwal.start_date >= ? AND tb_jadwal.start_date <= ?) ";

  if(division){
    query += "AND tb_nilai.bagian_id = ? "
    queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, startDate, endDate, divisionId, pagenum * pagesize, pagesize];
  }

  query += "order by tb_siswa.nama ";
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
        "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) and " +
        "(tb_jadwal.start_date >= ? AND tb_jadwal.start_date <= ?) "

        if(division){
          query += "AND tb_nilai.bagian_id = ? "
          queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, startDate, endDate, divisionId];
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
