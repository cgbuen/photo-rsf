const shuffle = function(array) {
  console.log('--> Shuffling')
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  // console.log('--> Shuffle results:', array.map(p => p.subject))
  return array
}

const makeUsablePhotoArray = function(array) {
  return array
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = `https://s3-us-west-1.amazonaws.com/ph-1080.cgbuen.com/${photo.roll}+${photo.number}.jpg?2020010102`
      photo.alt = `${photo.subject}, ${photo.venue}, ${photo.date}`
      return photo
    })
}

const photos = [
  {
    "id": 2,
    "roll": "0019",
    "number": 20,
    "date": "2017-04-14",
    "subject": "FKJ",
    "active": 1,
    "venue": "The Warfield",
    "city": "San Francisco",
    "format": "35mm",
    "film": "GC 400",
    "camera": "Contax T2",
    "comment": ""
  },
  {
    "id": 6,
    "roll": "0054",
    "number": 14,
    "date": "2017-11-27",
    "subject": "Syd",
    "active": 1,
    "venue": "Regency Ballroom",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T2",
    "comment": ""
  },
  {
    "id": 15,
    "roll": "0129",
    "number": 23,
    "date": "2018-07-24",
    "subject": "Playboi Carti",
    "active": 1,
    "venue": "The Warfield",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 17,
    "roll": "0135",
    "number": 26,
    "date": "2018-08-11",
    "subject": "Mac Demarco",
    "active": 1,
    "venue": "The Independent",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 18,
    "roll": "0138",
    "number": 20,
    "date": "2018-08-12",
    "subject": "James Blake",
    "active": 1,
    "venue": "Golden Gate Park",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 20,
    "roll": "0153",
    "number": 14,
    "date": "2018-10-09",
    "subject": "Alina Baraz",
    "active": 1,
    "venue": "The Warfield",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": "Night 1"
  },
  {
    "id": 22,
    "roll": "0164",
    "number": 16,
    "date": "2018-11-24",
    "subject": "AlunaGeorge",
    "active": 1,
    "venue": "The Independent",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T2",
    "comment": ""
  },
  {
    "id": 23,
    "roll": "0165",
    "number": 35,
    "date": "2018-11-30",
    "subject": "Tash Sultana",
    "active": 1,
    "venue": "Fox Theater",
    "city": "Oakland",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": "Night 2"
  },
  {
    "id": 24,
    "roll": "0166",
    "number": 28,
    "date": "2018-12-02",
    "subject": "6LACK",
    "active": 1,
    "venue": "Fox Theater",
    "city": "Oakland",
    "format": "35mm",
    "film": "Pro 400H",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 26,
    "roll": "0171",
    "number": 26,
    "date": "2018-12-16",
    "subject": "Amine",
    "active": 1,
    "venue": "Regency Ballroom",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 28,
    "roll": "0175",
    "number": 28,
    "date": "2018-12-30",
    "subject": "Damian Lillard, Portland Trailblazers",
    "active": 1,
    "venue": "Moda Center",
    "city": "Portland",
    "format": "35mm",
    "film": "Portra 400",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 30,
    "roll": "0185",
    "number": 24,
    "date": "2019-02-12",
    "subject": "Anderson .Paak",
    "active": 1,
    "venue": "The Masonic",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 33,
    "roll": "0199",
    "number": 31,
    "date": "2019-03-19",
    "subject": "Lil Baby",
    "active": 1,
    "venue": "The Warfield",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Pro 400H",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 34,
    "roll": "0205",
    "number": "03",
    "date": "2019-03-24",
    "subject": "Boston Celtics",
    "active": 1,
    "venue": "TD Garden",
    "city": "Boston",
    "format": "35mm",
    "film": "Portra 400",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 35,
    "roll": "0207",
    "number": 33,
    "date": "2019-03-26",
    "subject": "Kelly Zutrau, Wet",
    "active": 1,
    "venue": "Regency Ballroom",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Portra 800",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 36,
    "roll": "0208",
    "number": 16,
    "date": "2019-03-29",
    "subject": "Vince Staples",
    "active": 1,
    "venue": "Fox Theater",
    "city": "Oakland",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 39,
    "roll": "0220",
    "number": 16,
    "date": "2019-04-21",
    "subject": "Kanye West",
    "active": 1,
    "venue": "Coachella 2019",
    "city": "Indio",
    "format": "35mm",
    "film": "Pro 400H",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 41,
    "roll": "0225",
    "number": "08",
    "date": "2019-04-28",
    "subject": "Louis Futon",
    "active": 1,
    "venue": "The Independent",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Superia 400",
    "camera": "Contax T3",
    "comment": "Night 2"
  },
  {
    "id": 43,
    "roll": "0229",
    "number": 36,
    "date": "2019-05-22",
    "subject": "Masiwei, Higher Brothers",
    "active": 1,
    "venue": "Regency Ballroom",
    "city": "San Francisco",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": ""
  },
  {
    "id": 44,
    "roll": "0234",
    "number": 36,
    "date": "2019-06-01",
    "subject": "Lil B",
    "active": 1,
    "venue": "UC Theatre",
    "city": "Berkeley",
    "format": "35mm",
    "film": "Cinestill 800T",
    "camera": "Contax T3",
    "comment": ""
  }
]

export default shuffle(makeUsablePhotoArray(photos))
