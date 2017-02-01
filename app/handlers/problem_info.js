exports.add = function(req, res, db) {

  var problemInfo = {
    riwayat_mppd_id: req.body.riwayat_mppd_id,
    bagian_id: req.body.bagian_id,
    masalah1: req.body.masalah1,
    masalah2: req.body.masalah2,
    masalah3: req.body.masalah3,
    masalah4: req.body.masalah4,
    masalah5: req.body.masalah5,
    masalah6: req.body.masalah6,
    masalah7: req.body.masalah7,
    masalah8: req.body.masalah8,
    masalah9: req.body.masalah9,
    masalah10: req.body.masalah10,
    masalah11: req.body.masalah11,
    jumlah_hari_post_test: req.body.jumlah_hari_post_test,
    keterangan: req.body.keterangan
  };

  console.log(problemInfo);
  // db.query('INSERT INTO tb_masalah SET ?', problemInfo, function(err, result){
  //   if(err){
  //     console.log(err);
  //     res.status(500).send('Error while doing operation');
  //   }else{
  //     res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
  //   }
  //
  // });
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
