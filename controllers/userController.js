const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: requestedTime,
    result: users.length,
    data: {
      users: users,
    },
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user._id === id);

  if (!user) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const newId = users[users.length - 1].id + 1;

  const newUser = Object.assign({ id: newId }, req.body);
  console.log(newUser);
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          users: newUser,
        },
      });
    }
  );
};

exports.updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }

  exports.updatedUser = { ...user, ...req.body };
  const index = users.findIndex((user) => user.id === id);
  users[index] = updatedUser;

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user._id === id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.status(204).send('Done');
};
