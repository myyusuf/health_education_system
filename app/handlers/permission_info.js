var formidable = require('formidable'),
fs = require('fs-extra');

var ceuConstant = require('../../config/ceu_constant.js');

exports.add = function(req, res, db) {

  var permissionInfo = {
    riwayat_mppd_id: req.body.riwayat_mppd_id,
    tanggal: new Date(req.body.tanggal),
    keterangan: req.body.keterangan,
    jumlah_hari: req.body.jumlah_hari,
    bagian_id: req.body.bagian_id,
  };

  db.query('INSERT INTO tb_surat_izin SET ?', permissionInfo, function(err, result){
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
  var bagianId = parseInt(req.param('bagian'));

  var query = "SELECT ss.*, b.id AS bagian_id, b.code AS bagian_code, b.nama AS bagian_nama " +
  "FROM tb_surat_izin ss " +
  "LEFT JOIN tb_bagian b ON ss.bagian_id = b.id " +
  "WHERE ss.riwayat_mppd_id = ? AND b.id = ? ";

  db.query(
    query, [riwayatMppdId, bagianId],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.upload = function(req, res, db){

  var permissionInfoId = req.params.permissionInfoId;

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);

		var temp_path = files.theFile.path;

		var file_name = files.theFile.name;

		var new_location = ceuConstant.PERMISSION_INFO_DIR;
		var newfilePath = new_location + file_name;

		fs.copy(temp_path, newfilePath, function(err) {
			if (err) {
				console.error(err);
			} else {
				console.log("success!");

        db.query(
        'UPDATE tb_surat_izin SET file_name = ? '+
        'WHERE id = ?',
        [
          file_name,
          permissionInfoId
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

    var permissionInfoId = req.params.permissionInfoId;

    var query = "SELECT * FROM tb_surat_izin where id = ? ";

    db.query(
      query, [permissionInfoId],
      function(err, rows) {
        if (err) throw err;

        if(rows.length > 0){
          var permissionInfo = rows[0];
          var fileName = permissionInfo.file_name;
          var directory = ceuConstant.PERMISSION_INFO_DIR;
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
          res.status(500).send('Permission info not found');
        }

      }
    );

};

exports.update = function(req, res, db) {

  var permissionInfoId = req.params.permissionInfoId;

  var permissionInfo = {
    tangal: new Date(req.body.tanggal),
    keterangan: req.body.keterangan,
    jumlah_hari: req.body.jumlah_hari,
    bagian_id: req.body.bagian
  };

  db.query(
  'UPDATE tb_surat_izin SET tanggal = ? ,'+
  'keterangan = ? ,' +
  'jumlah_hari = ? ,' +
  'bagian_id = ? ' +
  'WHERE id = ?',
  [
    permissionInfo.tangal,
    permissionInfo.keterangan,
    permissionInfo.jumlah_hari,
    permissionInfo.bagian_id,
    permissionInfoId
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

  var permissionInfoId = req.params.permissionInfoId;

  db.query(
  'DELETE FROM tb_surat_izin WHERE id = ?',
  [permissionInfoId],
  function (err, result) {
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'DELETE_SUCCESS'});
    }
  });

};
