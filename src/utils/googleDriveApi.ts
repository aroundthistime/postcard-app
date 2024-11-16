import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import axios from "axios";
import Config from "react-native-config";

const googleDrive = new GDrive();

export const signInToGoogle = async () => {
  try {
    if (!googleDrive.accessToken) {
      const result = await axios.get(Config.API_URL as string, {
        headers: {
          "aroundthistime-custom-header": Config.CUSTOM_HEADER,
        },
      });
      googleDrive.accessToken = result.data.token;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getGoogleDrive = async () => {
  if (!googleDrive.accessToken) {
    await signInToGoogle();
  }
  return googleDrive;
};
