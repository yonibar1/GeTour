[
    {
        _id: 'mongodbID',
        title: 'around paris',
        startAt: 11286341283,
        capacity: 10,
        bookedUsers: [{}],
        daysCount: 3,
        price: 100,
        difficulty: 2,
        rate: 3.17,
        msgs: [
            // mini-user
            {
                txt: 'msg',
                user: 'fullname',
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
            avatar: 'someurl.jpg',
        },
        reviews: [
            {
                id: 'u101',
                txt: 'the best trip',
                createdAt: 11286341283,
                rate: 'number of stars',
                byUser: {
                    fullname: 'muki puki',
                    _userId: 'mongodbID',
                    avatar: 'avatar.jpg',
                },
            },
        ],
    },
    {
        _id: 'mongodbID',
        fullname: 'muki puki',
        username: 'muki101',
        password: 'secret',
        avatar: 'someurl.jpg',
        birthDate: '1989-07-20',
        isGuide: false,
    },
    {
        _id: 'mongodbID',
        orderBy: [
            {
                _id: 'mongodbID',
                fullname: 'muki puki',
                avatar: 'someurl.jpg',
            },
        ],
        orderAt: 1231231312,
        guestsCount: 3,
        price: 300, //should be the number of participants * tour price//
    },
];
