import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";

const googleDrive = new GDrive();

export const signInToGoogle = async () => {
};

export const getGoogleDrive = async () => {
  if (!googleDrive.accessToken) {
    await signInToGoogle();
  }
  return googleDrive;
};
