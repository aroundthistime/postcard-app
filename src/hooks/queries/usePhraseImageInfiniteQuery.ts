import { Category } from "../../types/Category";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getGoogleDrive,
  withGoogleAuthFailRetry,
} from "../../utils/googleDriveApi";
import Config from "react-native-config";

const useCategoryDirectoryId = (category: string) => {
  return useQuery<string>({
    queryKey: ["categoryDirectoryId", category],
    queryFn: async () => {
      const googleDrive = await getGoogleDrive();

      const categoryDirectoryQuery = await withGoogleAuthFailRetry(async () =>
        googleDrive.files.list({
          q: `'${Config.ROOT_DIRECTORY_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${category}'`,
          fields: "files(id)", // Get the folder's ID
          pageSize: 1,
        })
      );

      const categoryDirectoryId = categoryDirectoryQuery.files[0]?.id;
      return categoryDirectoryId;
    },
  });
};

const usePhraseImageInfiniteQuery = (category: Category) => {
  const { data: categoryDirectoryId } = useCategoryDirectoryId(category);

  return useInfiniteQuery<{
    imageUrls: string[];
    nextPageToken?: string;
  }>({
    queryKey: ["image", category],
    queryFn: async ({ pageParam }) => {
      const googleDrive = await getGoogleDrive();

      try {
        const result = (await withGoogleAuthFailRetry(async () =>
          googleDrive.files.list({
            q: `'${categoryDirectoryId}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
            fields: "nextPageToken, files(webContentLink)",
            pageSize: 10,
            ...(pageParam
              ? {
                  pageToken: pageParam,
                }
              : {}),
          })
        )) as {
          files: {
            webContentLink: string;
          }[];
          nextPageToken?: string;
        };

        return {
          imageUrls: result.files.map((file) => file.webContentLink),
          nextPageToken: result.nextPageToken,
        };
      } catch (err) {
        console.error(pageParam, err);
        return {
          imageUrls: [],
        };
      }
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextPageToken || lastPage.imageUrls.length === 0)
        return undefined;
      return lastPage.nextPageToken;
    },
    enabled: !!categoryDirectoryId,
  });
};

export default usePhraseImageInfiniteQuery;
