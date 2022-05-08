/* eslint-disable camelcase */

const albums = ({
  id,
  name,
  year,
  cover,
}) => ({
  id,
  name,
  year,
  coverUrl: cover,
});

const albumsWithSongs = ({
  id,
  name,
  year,
  cover,
  songs,
}) => ({
  id,
  name,
  year,
  coverUrl: cover,
  songs,
});

module.exports = { albums, albumsWithSongs };
