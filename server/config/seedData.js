const users = [
    {
      fullName: 'Marie Clark',
      email: 'marie@clarck.com',
      username: 'marie_clarck',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts: [0, 1, 2]
    },
    {
      fullName: 'Stephany Latortue',
      email: 'stephany@latortue.com',
      username: 'stephany_latortue',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Jessica Eloi',
      email: 'jessica@eloi.com',
      username: 'jessica_eloi',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Nicolas Paul',
      email: 'nicolas@paul.com',
      username: 'nicolas_paul',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Andrew Gaspard',
      email: 'andrew@gaspard.com',
      username: 'andrew_gaspard',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Alphonso Ricochet',
      email: 'alphonso@ricochet.com',
      username: 'alphonso_ricochet',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Ebona Richard',
      email: 'ebona@richard.com',
      username: 'ebona_richard',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Rachide Lundi',
      email: 'rachide@lundi.com',
      username: 'rachide_lundi',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Pascal Edouard',
      email: 'pascal@edouard.com',
      username: 'pascal_edouard',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Felipe Palato',
      email: 'felipe@palato.com',
      username: 'felipe_palato',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
    {
      fullName: 'Rivoli Amorce',
      email: 'rivoli@amorce.com',
      username: 'rivoli_amorce',
      password: '$2a$10$ulfnNUDZ6jx3e0wenhnZCOQcNQs7/kKJ5hfOECWDlhFv.879PrHEy',
      posts:[]
    },
  ];

  // say we want to give each post an author
  // let's represent author by a number
  // and use that number to retrieve a user
  // post.author = users[author_number]._id
  const posts = [
      {
          title: "Generated Post 1",
          author: 0
      },
      {
        title: "My Great Post",
        author: 1
    },
    {
        title: "Seeded content",
        author: 2
    }
  ]

  export {
      users,
      posts
  }