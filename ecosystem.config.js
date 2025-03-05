module.exports = {
    apps: [
      {
        name: 'aida-chat',
        script: 'bun',
        args: 'run start',
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: 3002,
        },
      },
    ],
  };

  // module.exports = {
  //   apps: [
  //     {
  //       name: 'my-next-app',
  //       script: 'bun',
  //       args: 'run start',
  //       watch: true,
  //       cwd: '/mysample',
  //       env: {
  //         NODE_ENV: 'production',
  //       },
  //     },
  //   ],
  // };