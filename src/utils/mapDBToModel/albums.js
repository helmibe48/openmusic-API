/* eslint-disable camelcase */

const albums = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const albumsWithSongs = ({
  id,
  name,
  year,
  songs,
}) => ({
  id,
  name,
  year,
  songs,
});

module.exports = { albums, albumsWithSongs };
