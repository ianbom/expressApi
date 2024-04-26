var express = require('express');
var router = express.Router();


const connection = require('../database');


router.get('/', function (req, res, next) {
    
    try {
        connection.query('SELECT * FROM mahasiswa ORDER BY id desc', function (err, rows) {
            if (err) {
                console.error(err);
        res.status(500);
                
            } else {
                res.status(200).send({
                    mahasiswa: rows
                })
            }
        });
    } 
    catch(err){
        console.error(err);
        res.status(500);
    }
   


});

// router.get('/create', function (req, res, next) {
//     res.render('mahasiswa/create', {
//         nama: '',
//         nrp: '',
//         prodi: '',
//         domisili: '',
//     })
// })

router.post('/store', function (req, res, next) {
    
    let nama   = req.body.nama;
    let nrp = req.body.nrp;
    let prodi = req.body.prodi;
    let domisili = req.body.domisili;
        

    try{
        console.log("nilainya" + nama + nrp + prodi + domisili);
        connection.query('INSERT INTO mahasiswa(nama, nrp, prodi, domisili) VALUES (?, ?, ?, ?)', [nama, nrp, prodi, domisili], function(err, result) {
           
            if (err) {
                console.error(err);
                res.status(500);
            } else {                
                res.status(200).send({message: 'Data berhasil disimpan'});
                // res.redirect('/mahasiswa');
            }
        });
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
});


router.delete('/:id', function (req, res, next) {

    try {
        connection.query('DELETE FROM mahasiswa WHERE id = ?', [req.params.id], function(err, result){
            if (err) {
                console.error(err);
                res.status(500);
            } else {                
                res.status(200).send({message: 'Data berhasil Hapus'});
                
            }
        })
    } catch (error) {
        console.error(err);
                res.status(500);
    }
});

router.put('/:id', function (req, res, next) {
    
    let nama   = req.body.nama;
    let nrp = req.body.nrp;
    let prodi = req.body.prodi;
    let domisili = req.body.domisili;
        
    try{
        console.log("nilainya" + nama + nrp + prodi + domisili);
        connection.query('UPDATE mahasiswa SET nama = ?, nrp = ?, prodi = ?, domisili = ? WHERE id = ?', [nama, nrp, prodi, domisili, req.params.id], function(err, result) {
           
            if (err) {
                console.error(err);
                res.status(500);
            } else {                
                res.status(200).send({message: 'Data berhasil diupdate'});
                // res.redirect('/mahasiswa');
            }
        });
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
});

router.get('/:id', function (req, res, next) {
    
    try {
        connection.query('SELECT * FROM mahasiswa WHERE id = ?', [req.params.id], function (err, rows) {
            if (err) {
                console.error(err);
        res.status(500);
                
            } else {
                res.status(200).send({
                    mahasiswa: rows
                })
            }
        });
    } 
    catch(err){
        console.error(err);
        res.status(500);
    }
   


});

module.exports = router;