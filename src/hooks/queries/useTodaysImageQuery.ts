import { useQuery } from "@tanstack/react-query";
import {
  getGoogleDrive,
  withGoogleAuthFailRetry,
} from "../../utils/googleDriveApi";
import Config from "react-native-config";

export const useTodaysImageQuery = (dateString: string) => {
  return useQuery({
    queryKey: ["today", dateString],
    queryFn: async () => {
      const googleDrive = await getGoogleDrive();

      return withGoogleAuthFailRetry(async () => {
        const childDirectoriesResponse = await googleDrive.files.list({
          q: `'${Config.ROOT_DIRECTORY_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
          fields: "files(id, name)", // Fetch IDs and names of child directories
        });

        const childDirectories = childDirectoriesResponse?.files || [];

        const imageFiles = (
          await Promise.all(
            childDirectories.map(async (childDirectory) => {
              const imageFilesResponse = await googleDrive.files.list({
                q: `'${childDirectory.id}' in parents and mimeType contains 'image/' and trashed = false`,
                fields: "files(webContentLink)", // Fetch IDs, names, and mime types of files
              });
              return imageFilesResponse?.files ?? [];
            })
          )
        ).flat();

        return imageFiles[Math.floor(Math.random() * imageFiles.length)]
          .webContentLink;
      });
    },
  });
};
