//import express for use
const express = require('express');
//create instance of express to use
const  artistsRouter = express.Router();

//load sqlite3 database for use
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

//mount artists Router
artistsRouter.use('/api/artists', artistsRouter);

artistsRouter.param('artistId', (req, res, next, artistId) => {
  db.get('SELECT * FROM Artist WHERE Artist.id =$artistId',{$artistId: artistId}, (error, artist) => {
    if(error){
      next(error);
    } else if(artist){
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

artistsRouter.get('/', (req,res, next) => {
  db.all('SELECT * FROM Artist WHERE is_currently_employed = 1',err, artists =>{
     if (err){
       next(err);
     }else {
       res.status(200).json({artists:artists});
     }
  });
});

artistsRouter.get('/:artistId', (req,res, next) => {
  res.status(200).json({artist:req.artist});
});

artistsRouter.post('/',(req,res,next)=> {

  const name = req.body.artist.name;
  const dateOfBirth = req.body.artist.dateOfBirth;
  const biography = req.body.artist.biography;

  if (!name || !dateOfBirth || !biography) {
    return res.status(400).send();
  }
  const is_currently_employed = req.body.artist.is_currently_employed;
  if (is_currently_employed !== 1){
    is_currently_employed = 1;
  }
  db.run('INSERT INTO Artist(name,date_of_birth,biography,is_curently_employed) VALUES($name,$date_of_birth,$biography,$is_curently_employed)',
  {
    $name: name,
    $date_of_birth: dateOfBirth ,
    $biography: biography,
    $is_currently_employed: is_currently_employed
  },
  function(error){
    next(error);
  }

  db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`,
  (error,artist) =>{
  res.status(201).json({artist: artist});
  })
});
});

















//export Artist Router
module.exports = artistsRouter;
