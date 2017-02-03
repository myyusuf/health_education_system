var formidable = require('formidable'),
fs = require('fs-extra');

var ceuConstant = require('../../config/ceu_constant.js');

exports.add = function(req, res, db) {

  var leaveInfo = {
    riwayat_mppd_id: req.body.riwayat_mppd_id,
    tanggal: new Date(req.body.tanggal),
    keterangan: req.body.keterangan,
    jumlah_hari: req.body.jumlah_hari,
    tingkat: req.body.tingkat,
  };

  db.query('INSERT INTO tb_surat_cuti SET ?', leaveInfo, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation');
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }

  });
};

exports.list = function(req, res, db) {

  var riwayatMppdId = req.params.riwayatMppdId;

  var query = "SELECT * FROM tb_surat_cuti " +
  "WHERE riwayat_mppd_id = ? ";

  db.query(
    query, [riwayatMppdId],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.upload = function(req, res, db){

  var leaveInfoId = req.params.leaveInfoId;

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);

		var temp_path = files.theFile.path;

		var file_name = files.theFile.name;

		var new_location = ceuConstant.LEAVE_INFO_DIR;
		var newfilePath = new_location + file_name;

		fs.copy(temp_path, newfilePath, function(err) {
			if (err) {
				console.error(err);
			} else {
				console.log("success!");

        db.query(
        'UPDATE tb_surat_cuti SET file_name = ? '+
        'WHERE id = ?',
        [
          file_name,
          leaveInfoId
        ],
        function (err, result) {
          if(err){
            res.status(500).send('Error while doing operation.');
          }else{
            res.json({status: 'UPDATE_SUCCESS'});
          }
        });

			}
		});

		// res.json({status: 'UPLOAD_SUCCESS'});

	});

};

exports.viewImage = function (req, res, db) {

    var leaveInfoId = req.params.leaveInfoId;

    var query = "SELECT * FROM tb_surat_cuti where id = ? ";

    db.query(
      query, [leaveInfoId],
      function(err, rows) {
        if (err) throw err;

        if(rows.length > 0){
          var leaveInfo = rows[0];
          var fileName = leaveInfo.file_name;
          var directory = ceuConstant.LEAVE_INFO_DIR;
          var filePath = directory + fileName;

          console.log('filePath : ' + filePath);

          fs.readFile(filePath, function (err, content) {
              if (err) {
                  res.writeHead(400, {
                      'Content-type': 'image/jpeg'
                  })
                  console.log(err);
                  res.end("No file found.");
              } else {
                  //specify Content will be an attachment
                  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
                  res.end(content);
              }
          });
        }else{
          res.status(500).send('Leave info not found');
        }

      }
    );

};

exports.update = function(req, res, db) {

  var leaveInfoId = req.params.leaveInfoId;

  var leaveInfo = {
    tangal: new Date(req.body.tanggal),
    keterangan: req.body.keterangan,
    jumlah_hari: req.body.jumlah_hari,
    tingkat: req.body.tingkat
  };

  db.query(
  'UPDATE tb_surat_cuti SET tanggal = ? ,'+
  'keterangan = ? ,' +
  'jumlah_hari = ? ,' +
  'tingkat = ? ' +
  'WHERE id = ?',
  [
    leaveInfo.tangal,
    leaveInfo.keterangan,
    leaveInfo.jumlah_hari,
    leaveInfo.tingkat,
    leaveInfoId
  ],
  function (err, result) {
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'UPDATE_SUCCESS'});
    }
  });
};

exports.delete = function(req, res, db) {

  var leaveInfoId = req.params.leaveInfoId;

  db.query(
  'DELETE FROM tb_surat_cuti WHERE id = ?',
  [leaveInfoId],
  function (err, result) {
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'DELETE_SUCCESS'});
    }
  });

};
