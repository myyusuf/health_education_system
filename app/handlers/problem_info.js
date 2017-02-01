exports.add = function(req, res, db) {

  var problemInfo = {
    riwayat_mppd_id: req.body.riwayat_mppd_id,
    bagian_id: req.body.bagian_id,
    masalah1: req.body.masalah1 ? 1 : 0,
    masalah2: req.body.masalah2 ? 1 : 0,
    masalah3: req.body.masalah3 ? 1 : 0,
    masalah4: req.body.masalah4 ? 1 : 0,
    masalah5: req.body.masalah5 ? 1 : 0,
    masalah6: req.body.masalah6 ? 1 : 0,
    masalah7: req.body.masalah7 ? 1 : 0,
    masalah8: req.body.masalah8 ? 1 : 0,
    masalah9: req.body.masalah9 ? 1 : 0,
    masalah10: req.body.masalah10 ? 1 : 0,
    masalah11: req.body.masalah11 ? 1 : 0,
    jumlah_hari_post_test: req.body.jumlah_hari_post_test,
    keterangan: req.body.keterangan
  };

  // console.log(problemInfo);

  if(problemInfo.bagian_id != undefined && problemInfo.bagian_id != '' && problemInfo.bagian_id != 0){
    var query = "SELECT 1 FROM tb_masalah WHERE riwayat_mppd_id = ? AND bagian_id = ? ";

    db.query(
      query, [problemInfo.riwayat_mppd_id, problemInfo.bagian_id],
      function(err, rows) {
        if (err) throw err;

        if(rows>0){
          db.query(
          'UPDATE tb_masalah SET masalah1 = ? ,'+
          'masalah2 = ? ,' +
          'masalah3 = ? ,' +
          'masalah4 = ? ,' +
          'masalah5 = ? ,' +
          'masalah6 = ? ,' +
          'masalah7 = ? ,' +
          'masalah8 = ? ,' +
          'masalah9 = ? ,' +
          'masalah10 = ? ,' +
          'masalah11 = ? ,' +
          'jumlah_hari_post_test = ? ,' +
          'keterangan = ? ' +
          'WHERE riwayat_mppd_id = ? AND bagian_id = ? ',
          [
            problemInfo.masalah1,
            problemInfo.masalah2,
            problemInfo.masalah3,
            problemInfo.masalah4,
            problemInfo.masalah5,
            problemInfo.masalah6,
            problemInfo.masalah7,
            problemInfo.masalah8,
            problemInfo.masalah9,
            problemInfo.masalah10,
            problemInfo.masalah11,
            problemInfo.jumlah_hari_post_test,
            problemInfo.keterangan,
            problemInfo.riwayat_mppd_id,
            problemInfo.bagian_id
          ],
          function (err, result) {
            if(err){
              res.status(500).send('Error while doing operation.');
            }else{
              res.json({status: 'UPDATE_SUCCESS'});
            }
          });
        }else{
          db.query('INSERT INTO tb_masalah SET ?', problemInfo, function(err, result){
            if(err){
              console.log(err);
              res.status(500).send('Error while doing operation');
            }else{
              res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
            }

          });
        }

      }
    );
  }else{
    res.status(400).send('Bagian id is null');
  }

};

exports.getByMppdId = function(req, res, db) {

  var riwayatMppdId = req.params.riwayatMppdId;
  var bagianId = parseInt(req.param('bagian'));

  var query = "SELECT m.*, b.id AS bagian_id, b.code AS bagian_code, b.nama AS bagian_nama " +
  "FROM tb_masalah m " +
  "LEFT JOIN tb_bagian b ON m.bagian_id = b.id " +
  "WHERE m.riwayat_mppd_id = ? AND b.id = ? ";

  db.query(
    query, [riwayatMppdId, bagianId],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};
