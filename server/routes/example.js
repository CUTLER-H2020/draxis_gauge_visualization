export default function (server) {

  server.route({
    path: '/api/draxis_visualazation/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
