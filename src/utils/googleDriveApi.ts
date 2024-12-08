import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import axios from "axios";
import Config from "react-native-config";

const googleDrive = new GDrive();

export const signInToGoogle = async () => {
  const result = await axios.get(Config.API_URL as string, {
    headers: {
      "aroundthistime-custom-header": Config.CUSTOM_HEADER,
    },
  });
  googleDrive.accessToken = result.data.token;
};

export const getGoogleDrive = async () => {
  if (!googleDrive.accessToken) {
    await signInToGoogle();
  }
  return googleDrive;
};

export const withGoogleAuthFailRetry = async (query: () => Promise<any>) => {
  try {
    return query();
  } catch {
    await signInToGoogle();
    return query();
  }
};
