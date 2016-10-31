var flow = require('nimble');
var moment = require('moment');

exports.updateScheduleData = function(db, editedSchedule, outerCallback){

  var divisionSchedule = null;
  var hospitalSchedules = null;
  var startDateDiff = null;

  flow.series([
    function (callback) {
      var query = "SELECT * FROM tb_jadwal WHERE id = ? ";
      db.query(
        query, [editedSchedule.dbId],
        function(err, rows) {
          if (err) {
            callback(err);
          }
          if(rows.length > 0){
            divisionSchedule = rows[0];
          };
          callback();
        }
      );
    },
    function (callback) {
      db.query(
      'UPDATE tb_jadwal SET start_date = ?, '+
      'end_date = ? ' +
      'WHERE id = ? ',
      [
        new Date(editedSchedule.from),
        new Date(editedSchedule.to),
        editedSchedule.dbId
      ],
      function (err, result) {
        if(err){
          callback(err);
        }else{
          var prevStartDate = moment(divisionSchedule.start_date);
          var startDate = moment(new Date(editedSchedule.from));

          startDateDiff = startDate.diff(prevStartDate, 'days');
          console.log('startDateDiff : ' + startDateDiff);
          callback();
        }
      });
    },
    function (callback) {
      var query = "SELECT * FROM tb_jadwal WHERE parent_id = ? ";
      db.query(
        query, [editedSchedule.dbId],
        function(err, rows) {
          if (err) {
            callback(err);
          }
          hospitalSchedules = rows;
          callback();
        }
      );
    },
    function (callback) {

      var updateFunctions = [];
      for(var i=0; i<hospitalSchedules.length; i++){

        //---Closure
        (function f() {
          var hospitalSchedule = hospitalSchedules[i];
          var updateFunction = function(parallelCallback){

            var prevHospitalStartDate = moment(hospitalSchedule.start_date);
            var prevHospitalEndDate = moment(hospitalSchedule.end_date);

            var hospitalStartDate = prevHospitalStartDate.add(startDateDiff, 'days');
            var hospitalEndDate = prevHospitalEndDate.add(startDateDiff, 'days');

            db.query(
            'UPDATE tb_jadwal SET start_date = ?, '+
            'end_date = ? ' +
            'WHERE id = ? ',
            [
              hospitalStartDate.toDate(),
              hospitalEndDate.toDate(),
              hospitalSchedule.id
            ],
            function (err, result) {
              if(err){
                parallelCallback(err);
              }else{
                parallelCallback();
              }
            });

          }
          updateFunctions.push(updateFunction);
        })();
        //----------
      }

      flow.parallel(updateFunctions, function(){
        callback();
      });

    },
    function (callback) {
      outerCallback();
    }
  ], function(error){
    outerCallback(error);
  });
};
