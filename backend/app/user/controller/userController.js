import argon2 from 'argon2';
import Users from '../model/user.js';

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ['id', 'uuid', 'name', 'email', 'role'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ['id', 'uuid', 'name', 'email', 'role'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUsers = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
  const hashedPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({ msg: 'User Created' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) res.status(404).json({ msg: 'user tidak ditemukan' });
  const { name, email, password, confPassword, role } = req.body;
  let hashedPassword;
  if (password === '' || password === null) {
    hashedPassword = user.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }
  if (password !== confPassword) res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) res.status(404).json({ msg: 'User tidak ditemukan' });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
