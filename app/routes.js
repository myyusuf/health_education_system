// var summaryData = require('./handlers/summarydata.js');
// var summaryPdf = require('./handlers/summarypdf.js');
//
// var drillDownData = require('./handlers/drilldowndata.js');
//
// var projectData = require('./handlers/projectdata.js');

var scheduleData = require('./handlers/schedule_data.js');
var studentData = require('./handlers/student_data.js');
var scoreData = require('./handlers/score_data.js');
var weeklyScheduleData = require('./handlers/weekly_schedule_data.js');
var divisionData = require('./handlers/division_data.js');
var hospitalData = require('./handlers/hospital_data.js');
var reportingData = require('./handlers/reporting_data.js');
var studentMppd = require('./handlers/student_mppd.js');

module.exports = function(app, passport, db) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================


  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.handlebars', {
      layout: '',
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    // successRedirect : '/profile', // redirect to the secure profile section
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // app.get('/signup', function(req, res) {
  //
  //   // render the page and pass in any flash data if it exists
  //   res.render('signup.handlebars', {
  //     message: req.flash('signupMessage')
  //   });
  // });

  // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/profile', // redirect to the secure profile section
  //   failureRedirect: '/signup', // redirect back to the signup page if there is an error
  //   failureFlash: true // allow flash messages
  // }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   res.render('profile.handlebars', {
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    // res.redirect('/');
    res.redirect('/login');
  });

  // app.get('/', isLoggedIn, function(req, res) {
  //   res.render('dashboard.handlebars', {
  //     currentPageView: 'dashboard',
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });
  // app.get('/', function(req, res) {
  //   res.render('dashboard.handlebars', {
  //     currentPageView: 'dashboard',
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  app.get('/', isLoggedIn, function(req, res) {
    res.render('workspace.handlebars', {
      currentPageView: 'workspace',
      user: req.user // get the user out of session and pass to template
    });
  });

  // app.get('/students_page', function(req, res) {
  //   res.render('student.handlebars', {
  //     currentPageView: 'student',
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });
  //
  // app.get('/score_page', function(req, res) {
  //   res.render('score.handlebars', {
  //     currentPageView: 'score',
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });
  //
  // app.get('/hospital_page', function(req, res) {
  //   res.render('hospital.handlebars', {
  //     currentPageView: 'hospital',
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  // =====================================
  // Students Page ========================
  // =====================================
  // app.get('/summarydata/net-profit/:year/:month', passport.authenticate('basic', { session: false }),function(req, res) {
  //   summaryData.netProfit(req, res, db);
  // });
  app.get('/schedules', function(req, res) {
    scheduleData.list(req, res, db);
  });
  app.get('/schedules/:id', function(req, res) {
    scheduleData.details(req, res, db);
  });
  app.post('/schedules', function(req, res) {
    scheduleData.addLevel1(req, res, db);
  });
  app.put('/schedules/parent_update/:id', function(req, res) {
    scheduleData.parentUpdate(req, res, db);
  });
  app.put('/schedules/parent_update_level_2/:id', function(req, res) {
    scheduleData.parentUpdateLevel2(req, res, db);
  });
  app.put('/schedules/division_update/:id', function(req, res) {
    scheduleData.divisionUpdate(req, res, db);
  });
  app.post('/schedules_addlevel2', function(req, res) {
    scheduleData.addLevel2(req, res, db);
  });
  app.put('/schedules/task/:id', function(req, res) {
    scheduleData.updateTask(req, res, db);
  });

  app.get('/students', function(req, res) {
    studentData.list(req, res, db);
  });
  app.get('/students_all', function(req, res) {
    studentData.listAll(req, res, db);
  });

  app.post('/students', function(req, res) {
    studentData.add(req, res, db);
  });

  app.put('/students/:id', function(req, res) {
    studentData.update(req, res, db);
  });

  app.delete('/students/:id', function(req, res) {
    studentData.delete(req, res, db);
  });

  app.get('/divisions_all', function(req, res) {
    divisionData.listAll(req, res, db);
  });

  app.get('/hospitals/hospitals_and_clinics_all', function(req, res) {
    hospitalData.listAll(req, res, db);
  });
  app.get('/hospitals/hospitals_all', function(req, res) {
    hospitalData.listHospitalAll(req, res, db);
  });
  app.get('/hospitals/clinics_all', function(req, res) {
    hospitalData.listClinicAll(req, res, db);
  });
  app.get('/hospitals/:hospitalId/students', function(req, res) {
    hospitalData.listStundentsInHospital(req, res, db);
  });
  //------
  app.get('/hospitals', function(req, res) {
    hospitalData.list(req, res, db);
  });
  app.get('/hospitals_all', function(req, res) {
    hospitalData.listAll(req, res, db);
  });

  app.post('/hospitals', function(req, res) {
    hospitalData.add(req, res, db);
  });

  app.put('/hospitals/:id', function(req, res) {
    hospitalData.update(req, res, db);
  });

  app.delete('/hospitals/:id', function(req, res) {
    hospitalData.delete(req, res, db);
  });
  //------

  app.get('/scores', function(req, res) {
    scoreData.list(req, res, db);
  });
  app.put('/scores/:id', function(req, res) {
    scoreData.update(req, res, db);
  });
  app.get('/scores/recommendations', function(req, res) {
    scoreData.recommendationAll(req, res, db);
  });

  app.get('/reporting/costunit', function(req, res) {
    reportingData.costUnit(req, res, db);
  });
  app.get('/reporting/riwayatmppd', function(req, res) {
    reportingData.riwayatMPPD(req, res, db);
  });

  app.get('/weeklyschedules', function(req, res) {
    weeklyScheduleData.list(req, res, db);
  });

  app.post('/medicalinfo', function(req, res) {
    studentMppd.addMedicalInfo(req, res, db);
  });
  app.get('/medicalinfo/:riwayatMppdId', function(req, res) {
    studentMppd.listMedicalInfo(req, res, db);
  });

  app.post('/medicalinfo_upload/:medicalInfoId', function(req, res) {
    studentMppd.uploadMedicalInfo(req, res, db);
  });

  app.get('/medicalinfo_image/:medicalInfoId', function(req, res) {
    studentMppd.medicalInfoViewImage(req, res, db);
  });

  app.put('/medicalinfo/:medicalInfoId', function(req, res) {
    studentMppd.updateMedicalInfo(req, res, db);
  });

  app.delete('/medicalinfo/:medicalInfoId', function(req, res) {
    studentMppd.deleteMedicalInfo(req, res, db);
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  // res.redirect('/');
  res.redirect('/login');
}
