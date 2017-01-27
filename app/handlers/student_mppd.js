exports.addMedicalInfo = function(req, res, db) {

  var medicalInfo = {
    riwayat_mppd_id: req.body.riwayat_mppd_id,
    tanggal: new Date(req.body.tanggal),
    keterangan: req.body.keterangan,
    jumlah_hari: req.body.jumlah_hari,
    bagian_id: req.body.bagian_id,
  };

  db.query('INSERT INTO tb_surat_sakit SET ?', medicalInfo, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Error while doing operation');
    }else{
      res.json({status: 'INSERT_SUCCESS', lastId: result.insertId});
    }

  });
};

exports.listMedicalInfo = function(req, res, db) {

  var riwayatMppdId = req.params.riwayatMppdId;

  var query = "SELECT * FROM tb_surat_sakit WHERE riwayat_mppd_id = ? ";

  db.query(
    query, [riwayatMppdId],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};
