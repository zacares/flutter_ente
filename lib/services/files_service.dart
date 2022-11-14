import 'package:dio/dio.dart';
import 'package:logging/logging.dart';
import 'package:photos/core/network.dart';

class FilesService {
  late Dio _enteDio;
  late Logger _logger;
  FilesService._privateConstructor() {
    _enteDio = Network.instance.enteDio;
    _logger = Logger("FilesService");
  }
  static final FilesService instance = FilesService._privateConstructor();

  Future<int> getFileSize(int uploadedFileID) async {
    try {
      final response = await _enteDio.post(
        "/files/size",
        data: {
          "fileIDs": [uploadedFileID]
        },
      );
      return response.data["size"];
    } catch (e) {
      _logger.severe(e);
      rethrow;
    }
  }
}
