
exports.getScoreByStudentId = function(req, res, db) {

  var studentId = req.params.studentId;
  var bagianId = parseInt(req.param('bagian'));

  var query = "SELECT * FROM tb_nilai WHERE siswa_id = ? AND bagian_id = ? ";

  db.query(
    query, [studentId, bagianId],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};
