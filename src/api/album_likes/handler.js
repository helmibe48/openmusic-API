const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service) {
    const { albumLikesService, albumsService } = service;
    this._service = albumLikesService;
    this._albumsService = albumsService;

    this.postAlbumLikesHandler = this.postAlbumLikesHandler.bind(this);
    this.countAlbumLikesHandler = this.countAlbumLikesHandler.bind(this);
  }

  async postAlbumLikesHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { id: albumId } = request.params;
      await this._albumsService.getAlbumById(albumId);
      const isDuplicate = await this._service.albumAlreadyLiked(userId, albumId);
      const retMessage = isDuplicate
        ? await this._service.deleteAlbumLikes(userId, albumId)
        : await this._service.addAlbumLikes(userId, albumId);
      const response = h.response({
        status: 'success',
        message: retMessage,
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async countAlbumLikesHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { dataSource, likes } = await this._service.getAlbumLikesByAlbumId(albumId);
      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.header('X-Data-Source', dataSource);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagaln pada server kami.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = AlbumLikesHandler;
