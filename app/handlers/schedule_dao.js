var flow = require('nimble');
var moment = require('moment');

exports.insertScheduleData = function(db, data, outerCallback){

  var scoreId = 0;
  var scheduleId = 0;

  flow.series([
      function (callback) {
        var newScore = {
          siswa_id: data.siswa_id,
          bagian_id: data.bagian_id
        };

        db.query('INSERT INTO tb_nilai SET ?', newScore, function(err, result){
          if(err){
            callback(err);
          }else{
            scoreId = result.insertId;
            callback();
          }
        });
      },
      function (callback) {
        var newSchedule = {
          tipe_jadwal: 'BA',
          parent_id: data.parentId,
          siswa_id: data.siswa_id,
          tingkat: data.tingkat,
          bagian_id: data.bagian_id,
          color: data.color,
          start_date: data.start_date,
          end_date: data.end_date,
          progress: 0,
          nilai_id: scoreId
        };

        db.query('INSERT INTO tb_jadwal SET ?', newSchedule, function(err, result){
          if(err){
            callback(err);
          }else{
            scheduleId = result.insertId;
            callback();
          }
        });
      },
      function (callback) {
        // Insert hospital schedule 1
        var newSchedule = {
          parent_id: scheduleId,
          tipe_jadwal: 'RS',
          label: 'Jadwal RS 1',
          siswa_id: data.siswa_id,
          tingkat: data.tingkat,
          bagian_id: data.bagian_id,
          color: '#D4E6F1',
          start_date: data.start_date,
          end_date: data.end_date,
          progress: 0,
          nilai_id: scoreId
        };

        db.query('INSERT INTO tb_jadwal SET ?', newSchedule, function(err, result){
          if(err){
            callback(err);
          }else{
            callback();
          }
        });
      },
      function (callback) {
        // Insert clinic schedule
        var newSchedule = {
          parent_id: scheduleId,
          tipe_jadwal: 'PS',
          label: 'Jadwal Puskesmas',
          siswa_id: data.siswa_id,
          tingkat: data.tingkat,
          bagian_id: data.bagian_id,
          color: '#D4E6F1',
          start_date: data.start_date,
          end_date: data.end_date,
          progress: 0,
          nilai_id: scoreId
        };

        db.query('INSERT INTO tb_jadwal SET ?', newSchedule, function(err, result){
          if(err){
            callback(err);
          }else{
            callback();
          }
        });
      },
      function (callback) {
        // Insert hospital schedule 2
        var newSchedule = {
          parent_id: scheduleId,
          tipe_jadwal: 'RS',
          label: 'Jadwal RS 2',
          siswa_id: data.siswa_id,
          tingkat: data.tingkat,
          bagian_id: data.bagian_id,
          color: '#D4E6F1',
          start_date: data.start_date,
          end_date: data.end_date,
          progress: 0,
          nilai_id: scoreId
        };

        db.query('INSERT INTO tb_jadwal SET ?', newSchedule, function(err, result){
          if(err){
            callback(err);
          }else{
            callback();
          }
        });
      },
      function (callback) {
        outerCallback();
      }
  ], function(error){
    outerCallback(error);
  });
}
