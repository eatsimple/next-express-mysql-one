import Users from '../app/user/model/user.js';
import argon2 from 'argon2';

export const getMe = async () => {
  if (!req.session.userId) return res.status(400).json({ msg: 'anda belum login' });
  const user = await Users.findOne({
    attributes: ['name', 'email', 'role'],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(400).json({ msg: 'user tidak ditemukan' });
  res.status(200).json(user);
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) res.status(400).json({ msg: 'user tidak ditemukan' });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) res.status(400).json({ msg: 'password salah' });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const sesi = req.session.userId;
    res.status(200).json({ uuid, name, email, role, sesi, msg: `anda berhasil login ${user.name}` });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) res.status(400).json({ msg: 'Password tidak sama' });
  const hashedPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: 'user has been registered' });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'tidak dapat logout' });
    res.status(200).json({ msg: 'anda telah logout' });
  });
};
