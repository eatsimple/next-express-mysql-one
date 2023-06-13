import Users from '../app/user/model/user.js';

export const verifyUsers = async (req, res, next) => {
  if (!req.session.userId) {
    res.status(400).json({ msg: 'anda belum login' });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) res.status(400).json({ msg: 'user tidak ditemukan' });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminAccess = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) res.status(400).json({ msg: 'user tidak ditemukan' });
  if (user.role !== 'admin') res.status(400).json({ msg: 'akses terlarang' });
  next();
};
