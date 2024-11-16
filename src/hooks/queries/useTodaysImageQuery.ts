import { useQuery } from "@tanstack/react-query";
import { getGoogleDrive } from "../../utils/googleDriveApi";
import Config from "react-native-config";

export const useTodaysImageQuery = (dateString: string) => {
  return useQuery({
    queryKey: ["today", dateString],
    queryFn: async () => {
      const googleDrive = await getGoogleDrive();

      const childDirectoriesResponse = await googleDrive.files.list({
        q: `'${Config.ROOT_DIRECTORY_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "files(id, name)", // Fetch IDs and names of child directories
      });

      const childDirectories = childDirectoriesResponse?.files || [];
      const randomChildDirectory =
        childDirectories[Math.floor(Math.random() * childDirectories.length)];

      const imageFilesResponse = await googleDrive.files.list({
        q: `'${randomChildDirectory.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, webContentLink)", // Fetch IDs, names, and mime types of files
      });

      const imageFiles = imageFilesResponse?.files || [];
      return imageFiles[Math.floor(Math.random() * imageFiles.length)]
        .webContentLink;
    },
  });
};
