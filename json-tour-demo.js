[
    tour = {
        _id: 'mongodbID',
        title: 'around paris',
        startAt: 11286341283,
        capacity: 10,
        members: 2,
        daysCount: 3,
        price: 100,
        difficulty: 2,
        rate: 3.17,
        msgs: [
            // mini-user
            {
                _id: 'u102',
                txt: 'msg',
                fullname: 'fullname',
                imgUrl: './img.png'
            },
        ],
        locs: [
            {
                lat: 38.0898324,
                lng: 35.0983231,
                name: 'Sidney',
            },
            {
                lat: 38.0898324,
                lng: 35.0983231,
                name: 'Sidney',
            },
        ],
        imgUrls: [
            'string of url.jpg',
            'string of url.png',
            'string of url.jpg',
        ],
        tags: ['childrens', 'water trail', 'etc'],
        description: 'loremipsum',
        byUser: {
            _id: 'mongodbID',
            fullname: 'Yaron Biton',
            imgUrl: 'someurl.jpg',
        },

        reviews: [
            {
                id: 'u101',
                txt: 'the best trip',
                createdAt: 11286341283,
                rate: 'number of stars',
                byUser: {
                    fullname: 'muki puki',
                    _id: 'mongodbID',
                    imgUrl: 'imgUrl.jpg',
                },
            },
        ],
    },

    user = {
        _id: 'mongodbID',
        fullname: 'muki puki',
        username: 'muki101',
        password: 'secret',
        imgUrl: 'someurl.jpg',
    },

    order = {
        _id: 'mongodbID',
        createdAt: 9898989,
        guestsCount: 3,
        totalPrice: 300, //should be the number of participants * tour price//
        status: 'pending',
        buyer:
        {
            _id: 'mongodbID',
            fullname: 'muki puki',
            imgUrl: 'someurl.jpg',
        },
        tour: {
            _id: 09320320,
            title: 'tourtitle',
            imgUrl: './img.jpg'
        }
    },
];
