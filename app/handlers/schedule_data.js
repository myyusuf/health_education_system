
var flow = require('nimble');
var moment = require('moment');
var scheduleDao = require('./schedule_dao');
var scheduleUpdateDao = require('./schedule_update_dao');

exports.list = function(req, res, db) {

  var level = req.param('level');
  var levelInt = 1;

  if(level){
    levelInt = parseInt(level);
  }

  var stambukLamaLike = req.param('searchTxt') + '%';
  var stambukBaruLike = req.param('searchTxt') + '%';
  var namaLike = '%' + req.param('searchTxt') + '%';

  var query = "SELECT tb_jadwal.*, tb_siswa.stambuk_lama, tb_siswa.stambuk_baru, tb_siswa.nama, tb_bagian.nama as nama_bagian "+
  "FROM tb_jadwal " +
  "left join tb_siswa on tb_jadwal.siswa_id=tb_siswa.id " +
  "left join tb_bagian on tb_jadwal.bagian_id=tb_bagian.id " +
  "WHERE (tb_siswa.stambuk_lama LIKE ? OR tb_siswa.stambuk_baru LIKE ? OR tb_siswa.nama LIKE ?) " +
  "AND tb_jadwal.tingkat = ? order by tb_siswa.nama ";

  db.query(
    query, [stambukLamaLike, stambukBaruLike, namaLike, levelInt],
    function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }
  );

};

exports.updateTask = function(req, res, db) {

  var id = req.params.id;

  var startDate = moment(req.body.start_date, 'DD-MM-YYYY HH:mm');
  var endDate = moment(req.body.end_date, 'DD-MM-YYYY HH:mm');
  endDate.subtract({seconds: 1});

  db.query(
  'UPDATE tb_jadwal SET start_date = ? ,'+
  'end_date = ? ' +
  'WHERE id = ?',
  [
    startDate.toDate(),
    endDate.toDate(),
    id
  ],
  function (err, result) {
    if(err){
      res.status(500).send('Error while doing operation.');
    }else{
      res.json({status: 'UPDATE_TASK_SUCCESS'});
    }
  });
};

exports.addLevel1 = function(req, res, db) {

  var scheduleData = {
    parentId: 0,
    siswa_id: parseInt(req.body.student),
    tingkat: 1,
    progress: 0,
  }

  var checkDuplicateSchedule = function(callback){

    var siswaId = scheduleData.siswa_id;

    var query = "SELECT * "+
    "FROM tb_jadwal " +
    "WHERE siswa_id = ? AND tingkat = 1 ";

    db.query(
      query, [siswaId],
      function(err, rows) {
        if (err) throw err;
        if(rows.length > 0){
          callback(new Error('Siswa sudah memiliki jadwal.'));
        }else{
          callback();
        }
      }
    );
  };

  var insertParentSchedule = function(callback){

    var newParentSchedule = {
      tipe_jadwal: 'PR',
      siswa_id: scheduleData.siswa_id,
      tingkat: scheduleData.tingkat,
      bagian_id: 0,
      progress: 0
    };

    db.query('INSERT INTO tb_jadwal SET ?', newParentSchedule, function(err, result){
      if(err){
        callback(err);
      }else{
        scheduleData.parentId = result.insertId;
        callback()
      }
    });
  }

  var insertPediatricSchedule = function(callback){
    var data = {
      bagian_id: 1,
      color: '#4A90E2',
      start_date: new Date(req.body.pediatric.from),
      end_date: new Date(req.body.pediatric.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertRadiologiSchedule = function(callback){
    var data = {
      bagian_id: 2,
      color: '#50E3C2',
      start_date: new Date(req.body.radiology.from),
      end_date: new Date(req.body.radiology.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertNeurologiSchedule = function(callback){
    var data = {
      bagian_id: 3,
      color: '#B8E986',
      start_date: new Date(req.body.neurology.from),
      end_date: new Date(req.body.neurology.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertKkSchedule = function(callback){
    var data = {
      bagian_id: 4,
      color: '#7ED321',
      start_date: new Date(req.body.dermatology.from),
      end_date: new Date(req.body.dermatology.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertInternaSchedule = function(callback){
    var data = {
      bagian_id: 5,
      color: '#BD10E0',
      start_date: new Date(req.body.interna.from),
      end_date: new Date(req.body.interna.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertKardiologiSchedule = function(callback){
    var data = {
      bagian_id: 6,
      color: '#F5A623',
      start_date: new Date(req.body.kardiology.from),
      end_date: new Date(req.body.kardiology.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertJiwaSchedule = function(callback){
    var data = {
      bagian_id: 7,
      color: '#8B572A',
      start_date: new Date(req.body.psychiatrist.from),
      end_date: new Date(req.body.psychiatrist.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
        function (callback) {
            checkDuplicateSchedule(callback);
        },
        function (callback) {
          insertParentSchedule(callback);
        },
        function (callback) {
            insertPediatricSchedule(callback);
        },
        function (callback) {
            insertRadiologiSchedule(callback);
        },
        function (callback) {
            insertNeurologiSchedule(callback);
        },
        function (callback) {
            insertKkSchedule(callback);
        },
        function (callback) {
            insertInternaSchedule(callback);
        },
        function (callback) {
            insertKardiologiSchedule(callback);
        },
        function (callback) {
            insertJiwaSchedule(callback);
        },
        function (callback) {

          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                callback(err);
              });
            }
            res.json({status: 'INSERT_SUCCESS'});
          });

        }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });
};

exports.addLevel2 = function(req, res, db) {

  var scheduleData = {
    parentId: 0,
    siswa_id: parseInt(req.body.student),
    tingkat: 2,
    progress: 0,
  }

  var checkDuplicateSchedule = function(callback){

    var siswaId = scheduleData.siswa_id;

    var query = "SELECT * "+
    "FROM tb_jadwal " +
    "WHERE siswa_id = ? AND tingkat = 2 ";

    db.query(
      query, [siswaId],
      function(err, rows) {
        if (err) throw err;
        if(rows.length > 0){
          callback(new Error('Siswa sudah memiliki jadwal.'));
        }else{
          callback();
        }
      }
    );
  };

  var insertParentSchedule = function(callback){

    var newParentSchedule = {
      tipe_jadwal: 'PR',
      siswa_id: scheduleData.siswa_id,
      tingkat: scheduleData.tingkat,
      bagian_id: 0,
      progress: 0
    };

    db.query('INSERT INTO tb_jadwal SET ?', newParentSchedule, function(err, result){
      if(err){
        callback(err);
      }else{
        scheduleData.parentId = result.insertId;
        callback()
      }
    });
  }

  var insertMataSchedule = function(callback){
    var data = {
      bagian_id: 8,
      color: '#4A90E2',
      start_date: new Date(req.body.mata.from),
      end_date: new Date(req.body.mata.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertTHTSchedule = function(callback){
    var data = {
      bagian_id: 9,
      color: '#50E3C2',
      start_date: new Date(req.body.tht.from),
      end_date: new Date(req.body.tht.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertAnestesiSchedule = function(callback){
    var data = {
      bagian_id: 10,
      color: '#B8E986',
      start_date: new Date(req.body.anestesi.from),
      end_date: new Date(req.body.anestesi.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertBedahSchedule = function(callback){
    var data = {
      bagian_id: 11,
      color: '#7ED321',
      start_date: new Date(req.body.bedah.from),
      end_date: new Date(req.body.bedah.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertIKMSchedule = function(callback){
    var data = {
      bagian_id: 12,
      color: '#BD10E0',
      start_date: new Date(req.body.ikm.from),
      end_date: new Date(req.body.ikm.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertObginSchedule = function(callback){
    var data = {
      bagian_id: 13,
      color: '#6897B4',
      start_date: new Date(req.body.obgin.from),
      end_date: new Date(req.body.obgin.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertOrtopediSchedule = function(callback){
    var data = {
      bagian_id: 14,
      color: '#85DB9B',
      start_date: new Date(req.body.ortopedi.from),
      end_date: new Date(req.body.ortopedi.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertKardiologiSchedule = function(callback){
    var data = {
      bagian_id: 15,
      color: '#F5A623',
      start_date: new Date(req.body.kardiologi.from),
      end_date: new Date(req.body.kardiologi.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  var insertForensikSchedule = function(callback){
    var data = {
      bagian_id: 16,
      color: '#8B572A',
      start_date: new Date(req.body.forensik.from),
      end_date: new Date(req.body.forensik.to),
    }
    for(var k in scheduleData) data[k] = scheduleData[k];

    scheduleDao.insertScheduleData(db, data, callback);
  };

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
        function (callback) {
            checkDuplicateSchedule(callback);
        },
        function (callback) {
          insertParentSchedule(callback);
        },
        function (callback) {
            insertMataSchedule(callback);
        },
        function (callback) {
            insertTHTSchedule(callback);
        },
        function (callback) {
            insertAnestesiSchedule(callback);
        },
        function (callback) {
            insertBedahSchedule(callback);
        },
        function (callback) {
            insertIKMSchedule(callback);
        },
        function (callback) {
            insertObginSchedule(callback);
        },
        function (callback) {
            insertOrtopediSchedule(callback);
        },
        function (callback) {
            insertKardiologiSchedule(callback);
        },
        function (callback) {
            insertForensikSchedule(callback);
        },
        function (callback) {

          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                callback(err);
              });
            }
            res.json({status: 'INSERT_SUCCESS'});
          });

        }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });
};

exports.details = function(req, res, db) {

  var id = req.params.id;

  var query = "SELECT * FROM tb_jadwal WHERE id = ? ";
  db.query(
    query, [id],
    function(err, rows) {
      if (err) {
        res.status(400).send(err.message);
      }
      if(rows.length > 0){

        var schedule = rows[0];

        if(schedule.tipe_jadwal == 'PR'){

          var query = "SELECT * FROM tb_jadwal WHERE parent_id = ? ";
          db.query(
            query, [schedule.id],
            function(err, rows2) {
              if (err) {
                res.status(400).send(err.message);
              }
              res.json({
                schedule: schedule,
                children: rows2
              });
            }
          );

        }else{
          res.json({
            schedule: schedule
          });
        }

      }else{
        res.status(400).send("No Schedule found with id : " + id);
      }

    }
  );
};

exports.parentUpdate = function(req, res, db) {

  var id = req.params.id;
  // console.log(req.body);

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
        function (callback) {
            if(req.body.pediatric.from != ''){
              scheduleUpdateDao.updateScheduleData(db, req.body.pediatric, callback);
            }else{
              callback();
            }
        },
        function (callback) {
          if(req.body.radiology.from != ''){
              scheduleUpdateDao.updateScheduleData(db, req.body.radiology, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.neurology.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.neurology, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.dermatology.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.dermatology, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.interna.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.interna, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.kardiology.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.kardiology, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.psychiatrist.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.psychiatrist, callback);
          }else{
            callback();
          }
        },
        function (callback) {

          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                callback(err);
              });
            }
            res.json({status: 'UPDATE_SUCCESS'});
          });

        }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });

};

exports.parentUpdateLevel2 = function(req, res, db) {

  var id = req.params.id;
  // console.log(req.body);

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
        function (callback) {
            if(req.body.mata.from != ''){
              scheduleUpdateDao.updateScheduleData(db, req.body.mata, callback);
            }else{
              callback();
            }
        },
        function (callback) {
          if(req.body.tht.from != ''){
              scheduleUpdateDao.updateScheduleData(db, req.body.tht, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.anestesi.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.anestesi, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.bedah.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.bedah, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.ikm.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.ikm, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.obgin.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.obgin, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.ortopedi.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.ortopedi, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.kardiologi.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.kardiologi, callback);
          }else{
            callback();
          }
        },
        function (callback) {
          if(req.body.forensik.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.forensik, callback);
          }else{
            callback();
          }
        },
        function (callback) {

          db.commit(function(err) {
            if (err) {
              return db.rollback(function() {
                callback(err);
              });
            }
            res.json({status: 'UPDATE_SUCCESS'});
          });

        }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });

};

exports.divisionUpdate = function(req, res, db) {

  var id = req.params.id;
  var currentSchedule = null;
  var schedulesWithSameParentWillBeUpdated = [];

  db.beginTransaction(function(err) {
    if (err) { throw err; };

    flow.series([
      function (callback) {
        var query = "SELECT * FROM tb_jadwal WHERE id = ? ";
        db.query(
          query, [id],
          function(err, rows) {
            if (err) {
              callback(err);
            }
            if(rows.length > 0){
              currentSchedule = rows[0];
              callback();
            }else{
              callback(new Error('Tidak ada jadwal dengan id : ' + id));
            }
          }
        );
      },
      function (callback) {
          if(req.body.scheduleDateRange.from != ''){
            scheduleUpdateDao.updateScheduleData(db, req.body.scheduleDateRange, callback);
          }else{
            callback();
          }
      },
      function (callback) {
        var prevEndDate = moment(currentSchedule.end_date);
        var endDate = moment(new Date(req.body.scheduleDateRange.to));

        var endDateDiff = endDate.diff(prevEndDate, 'days');

        var query = "SELECT * FROM tb_jadwal WHERE parent_id = ? and id <> ?";
        db.query(
          query, [currentSchedule.parent_id, currentSchedule.id],
          function(err, rows) {
            if (err) {
              callback(err);
            }
            for(var i=0; i<rows.length; i++){
              var scheduleWithSameParent = rows[i];

              var sameParentStartDate = moment(scheduleWithSameParent.start_date);
              var sameParentEndDate = moment(scheduleWithSameParent.end_date);
              var dateDiffBetweenSameParent = sameParentStartDate.diff(prevEndDate, 'seconds');

              var from = sameParentStartDate.add(endDateDiff, 'days');
              var to = sameParentEndDate.add(endDateDiff, 'days');

              if(dateDiffBetweenSameParent > 0){
                schedulesWithSameParentWillBeUpdated.push({
                  from: from.toDate().toString(),
                  to: to.toDate().toString(),
                  dbId: scheduleWithSameParent.id
                });
              }
            }

            console.log('schedulesWithSameParentWillBeUpdated : ' + schedulesWithSameParentWillBeUpdated);
            callback();
          }
        );
      },
      function (callback) {

        var processCount = 0;

        for(var i=0; i<schedulesWithSameParentWillBeUpdated.length; i++){
          scheduleUpdateDao.updateScheduleData(db, schedulesWithSameParentWillBeUpdated[i], function(){
            processCount++;
            if(processCount == schedulesWithSameParentWillBeUpdated.length){
              callback();
            }
          });
          // console.log('schedulesWithSameParentWillBeUpdated[i].from : ' + schedulesWithSameParentWillBeUpdated[i].from);
          // console.log('schedulesWithSameParentWillBeUpdated[i].to : ' + schedulesWithSameParentWillBeUpdated[i].to);
        }
      },
      function (callback) {

        db.commit(function(err) {
          if (err) {
            return db.rollback(function() {
              callback(err);
            });
          }
          res.json({status: 'UPDATE_SUCCESS'});
        });

      }
    ], function(error){

      return db.rollback(function() {
        res.status(400).send(error.message);
      });

    });

  });

};
