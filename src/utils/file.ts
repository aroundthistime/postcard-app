import { Alert, PermissionsAndroid, Platform } from "react-native";
import * as RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { showToast } from "./toast";
import Share from "react-native-share";

export const downloadImageFromUrl = async (
  url: string,
  resultFileName?: string
) => {
  const hasPermission = await requestStoragePermission();

  if (!hasPermission) {
    Alert.alert("Permission Denied");
    return;
  }

  const fileName = resultFileName ?? `${Date.now()}.png`;

  const imagePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  const result = await RNFS.downloadFile({
    fromUrl: decodeURIComponent(url),
    toFile: imagePath,
    background: true,
  }).promise;

  if (result.statusCode === 200) {
    /**
     * Without this code, the written file won't be found by the gallery app
     * @see https://github.com/itinance/react-native-fs/issues/682#issuecomment-505814338
     */
    await CameraRoll.saveToCameraRoll(imagePath, "photo");
    showToast("다운로드가 완료되었습니다");
  }
};

const requestStoragePermission = async () => {
  if (Platform.OS !== "android") return true;

  /**
   * @see https://stackoverflow.com/a/77704552
   */
  if (Number(Platform.Version) >= 33) {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission Required",
        message: "App needs access to your storage to download images",
        buttonPositive: "ㅇㅅㅇ!!",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

export const shareImage = async (imageUrl: string) => {
  const downloadPath = `${RNFS.CachesDirectoryPath}/shared_image.png`;

  /**
   * Sharing the image url directly is not considered as an image file
   * The image file to share needs to be downloaded temporarily in the local device
   */
  const downloadResult = await RNFS.downloadFile({
    fromUrl: imageUrl,
    toFile: downloadPath,
  }).promise;

  if (downloadResult.statusCode === 200) {
    const shareOptions = {
      title: "사진",
      url: `file://${downloadPath}`,
      type: "image/png",
      message: "행복하세요 ^^",
    };

    // Share the downloaded image
    await Share.open(shareOptions);

    // Optionally, you can delete the image from the cache after sharing
    await RNFS.unlink(downloadPath);
  }
};
