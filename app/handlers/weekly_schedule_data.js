var XLSX = require('xlsx');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var moment = require('moment');

var ceuConstant = require('../../config/ceu_constant.js');

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

exports.download = function(req, res, db) {

  // &searchTxt=&searchDivision=&searchDate%5Bfrom%5D=Mon%20Aug%2001%202016%2000:00:00%20GMT+0700%20(WIB)&searchDate%to%5D=Wed%20Aug%2031%202016%2023:59:59%20GMT+0700%20(WIB)&_=0.652490514221717
  // http://localhost:3000/weeklyschedules/download?&searchTxt=&searchDivision=&searchDate%5Bfrom%5D=Mon+Aug+01+2016+00%3A00%3A00+GMT%2B0700+(WIB)&searchDate%5Bto%5D=Wed+Aug+31+2016+23%3A59%3A59+GMT%2B0700+(WIB)&_=1489301599466
  //---------------------

  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';
  var division = req.param('searchDivision');

  var searchDate = req.param('searchDate');

  var startDate = new Date(searchDate.from);
  var endDate = new Date(searchDate.to);

  var queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, startDate, endDate];

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
    queryArgs = [stambukLamaLike, stambukBaruLike, namaLike, startDate, endDate, divisionId];
  }

  query += "order by tb_siswa.nama ";

  db.query(
    query, queryArgs,
    function(err, rows) {
      if (err) throw err;
      if(err){
        res.status(500).send('Error while doing operation.');
      }else{
        console.log('rows.length : ' + rows.length);
        writeToExcel(req, res, rows, startDate, endDate);
      }
    }
  );

};

var writeToExcel = function(req, res, rows, startDate, endDate){
  var file = ceuConstant.WEEKLY_REPORT_DIR + 'weekly_schedule_template.xlsx';
  var fileOut = ceuConstant.WEEKLY_REPORT_DIR + 'weekly_schedule_out.xlsx';

  var workbook = XLSX.readFile(file);

  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];

  // const label = worksheet['B3'].v;
  // worksheet['B3'].v = 'hello';
  // console.log('label : ' + label);

  worksheet['B2'] = {v:moment(startDate).format('DD/MM/YYYY')};
  worksheet['C2'] = {v:moment(endDate).format('DD/MM/YYYY')};

  for(var i=0; i<rows.length; i++){
    var row = rows[i];
    var numberCellName = 'A'+ (i+4);
    var stambukLamaCellName = 'B'+ (i+4);
    var stambukBaruCellName = 'C'+ (i+4);
    var namaCellName = 'D'+ (i+4);
    var divisionCellName = 'E'+ (i+4);
    var startDateCellName = 'F'+ (i+4);
    var endDateCellName = 'G'+ (i+4);
    var preTestCellName = 'H'+ (i+4);

    worksheet[numberCellName] = {v:(i+1)};
    worksheet[stambukLamaCellName] = {v:row.stambuk_lama};
    worksheet[stambukBaruCellName] = {v:row.stambuk_baru};
    worksheet[namaCellName] = {v:row.nama};
    worksheet[divisionCellName] = {v:row.nama_bagian};
    worksheet[startDateCellName] = {v:moment(row.start_date).format('DD/MM/YYYY')};
    worksheet[endDateCellName] = {v:moment(row.end_date).format('DD/MM/YYYY')};
    worksheet[preTestCellName] = {v:((row.pre_test != undefined && row.pre_test != null) ? row.pre_test : '-')};
  }

  XLSX.writeFile(workbook, fileOut);

  //Send File ----------------------------------------------------
  // var file = __dirname + '/upload-folder/dramaticpenguin.MOV';

  var filename = path.basename(fileOut);
  var mimetype = mime.lookup(fileOut);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(fileOut);
  filestream.pipe(res);
}
