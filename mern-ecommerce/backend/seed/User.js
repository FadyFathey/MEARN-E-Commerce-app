const User = require('../models/User');

const users = [
  {
    _id: '65b8e564ea5ce114184ccb96',
    name: 'demo user',
    email: 'demo@gmail.com',
    password: '$2a$10$WZFW52NliFUmrl4LoMdBSOzrOKpPuinMVvf.SgcIt07s7lqKIdkTC',
    isVerified: true,
    role: 'user',
    __v: 0,
  },
  {
    _id: '65c2526fdcd9253acfbaa731',
    name: 'rishibakshi',
    email: 'demo2@gmail.com',
    password: '$2a$10$WZFW52NliFUmrl4LoMdBSOzrOKpPuinMVvf.SgcIt07s7lqKIdkTC',
    isVerified: true,
    role: 'user',
    __v: 0,
  },
  {
    _id: '65c2526fdcd9253acfbaa732',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: '$2a$10$WZFW52NliFUmrl4LoMdBSOzrOKpPuinMVvf.SgcIt07s7lqKIdkTC',
    isVerified: true,
    role: 'admin',
    __v: 0,
  },
];

exports.seedUser = async () => {
  try {
    await User.insertMany(users);
    console.log('User seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
