let users = [];
const EditData = (data, id, call) => {
  const newData = data.map((item) =>
    item.id === id ? { ...item, call } : item
  );
  return newData;
};

const SocketServer = (socket) => {
  // Connect - Disconnect
  socket.on('joinUser', (user) => {
    // users: [
    //   { id: '61dec823f40e6604acf1048b',
    //     socketId: 'epnX727VGV6dxjOBAAAF',
    //     followers: [ [Object], [Object] ] }
    // ]
    users.push({
      id: user._id,
      socketId: socket.id,
      followers: user.followers,
    });
  });

  socket.on('disconnect', () => {
    // data: {id: '61dec823f40e6604acf1048b',
    // socketId: 'n7K5UmuQ9MB96MYSAAAF',
    // followers: [
    // { _id: '61dec136ae0c4dd8dcc7d740',}

    const data = users.find((user) => user.socketId === socket.id);
    if (data) {
      const clients = users.filter((user) =>
        data.followers.find((item) => item._id === user.id)
      );

      if (clients.length > 0) {
        clients.forEach((client) => {
          socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id);
        });
      }

      if (data.call) {
        const callUser = users.find((user) => user.id === data.call);
        if (callUser) {
          users = EditData(users, callUser.id, null);
          socket.to(`${callUser.socketId}`).emit('callerDisconnect');
        }
      }
    }
    ``;

    users = users.filter((user) => user.socketId !== socket.id);
  });

  // Likes
  socket.on('likePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost);
      });
    }
  });

  socket.on('unLikePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost);
      });
    }
  });

  // Comments
  socket.on('createComment', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('createCommentToClient', newPost);
      });
    }
  });
  socket.on('deleteComment', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost);
      });
    }
  });

  // Follow
  socket.on('follow', (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit('followToClient', newUser);
  });

  // UnFollow
  socket.on('unFollow', (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser);
  });

  // Notify Create
  socket.on('createNotify', (msg) => {
    const clients = users.filter((user) => msg.recipients.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
      });
    }
  });

  // Notify Remove
  socket.on('removeNotify', (msg) => {
    const clients = users.filter((user) => msg.recipients.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg);
      });
    }
  });

  // Messages
  socket.on('addMessage', (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
  });

  // Check user Online/Offline
  socket.on('checkUserOnline', (data) => {
    // following: [{ id: '61dec136ae0c4dd8dcc7d740', socketId: 'IoAfV97td1zXt7P2AAAF' } ]
    const following = users.filter((user) =>
      data.following.find((item) => item._id === user.id)
    );
    socket.emit('checkUserOnlineToMe', following);

    // followers: [{ _id: '61dec136ae0c4dd8dcc7d740', fullname: 'jane smith',
    const clients = users.filter((user) =>
      data.followers.find((item) => item._id === user.id)
    );

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit('checkUserOnlineToClient', data._id);
      });
    }

    // _id: '61dec823f40e6604acf1048b', fullname: 'sam smith '
  });

  // Call User
  socket.on('callUser', (data) => {
    users = EditData(users, data.sender, data.recipient);

    const client = users.find((user) => user.id === data.recipient);
    if (client) {
      if (client.call) {
        users = EditData(users, data.sender, null);
        socket.emit('userBusy', data);
      } else {
        users = EditData(users, data.recipient, data.sender);
        socket.to(`${client.socketId}`).emit('callUserToClient', data);
      }
    }
  });

  socket.on('endCall', (data) => {
    const client = users.find((user) => user.id === data.sender);

    if (client) {
      socket.to(`${client.socketId}`).emit('endCallToClient', data);
      users = EditData(users, client.id, null);
      if (client.call) {
        const clientCall = users.find((user) => user.id === client.call);
        clientCall &&
          socket.to(`${clientCall.socketId}`).emit('endCallToClient', data);
        users = EditData(users, client.call, null);
      }
    }

    // old: [
    //   {
    //     id: '61dec136ae0c4dd8dcc7d740',
    //     socketId: 'D5yY8qgEh-G8LzmNAAAD',
    //     followers: [Array],
    //     call: '61dec823f40e6604acf1048b'
    //   }
    // ]

    // console.log({ new: users });
    // new: [
    //   {
    //     id: '61dec136ae0c4dd8dcc7d740',
    //     socketId: 'D5yY8qgEh-G8LzmNAAAD',
    //     followers: [Array],
    //     call: null
    //   }
    // ]
  });
  //
};

module.exports = SocketServer;
