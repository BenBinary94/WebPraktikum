var mysql = require('mysql');

var connection = mysql.createConnection({

    host : 'localhost',
    user : 'user',
    password : '123456'
});

connection.connect();

function Seminar(titel, seminarleiter, ort, startzeit, endzeit, freiePlaetze, verfugbarePlaetze, tutoren) {

    this.titel = titel;
    this.seminarleiter = seminarleiter;
    this.ort = ort;
    this.startzeit = startzeit;
    this.endzeit = endzeit;
    this.freiePlaetze = freiePlaetze;
    this.verfugbarePlaetze = verfugbarePlaetze;
    this.tutoren = tutoren;

    this.belegtePlaetze = function() {
        return verfugbarePlaetze - freiePlaetze;
    };

}



connection.query('use studienverwaltung;');


var seminare = new Array();

connection.query('SELECT * from seminare;', function(err, rows, fields) {

 //   if (err) throw err;

    rows.forEach(element => {
        //console.log(element);
        
        let seminar = new Seminar(element.titel, element.leiter, element.ort, element.startzeit, element.endzeit, element.tutoren); 
        seminare.push(seminar);
    });

    
    var json = JSON.stringify(seminare);

    //console.log(json);

  });
  
  connection.end();


//let seminar_1 = new Seminar("Programmierkurs 1", "Sven Jörges", "A.E.03", new Date('2019-05-05T12:00:00'), new Date('2019-05-05T15:00:00'),5,12,new Array("tim1", "anke3", "thad3"));
//let seminar_2 = new Seminar("Web-Technologien", "Sven Jörges", "A.E.01", new Date('2019-07-08T10:00:00'), new Date('2019-07-08T13:00:00'),10,20,new Array("den1", "blub2", "thad3"));
//let seminar_3 = new Seminar("Algorithmen und Datenstrukturen", "Herr Koll", "A.E.01", new Date('2018-07-02T08:00:00'), new Date('2018-07-02T12:00:00'),2,20,new Array("den1", "blub2", "thad3"));



var seminar_export = "Seminare = " + seminare;

module.exports = seminare, Seminar;