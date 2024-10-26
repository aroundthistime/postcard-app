import { Alert, PermissionsAndroid, Platform } from "react-native";
import * as RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

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
    Alert.alert("성공?");
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
