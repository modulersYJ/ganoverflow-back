import { Chatpost } from "src/chatposts/entities/chatpost.entity";

export interface IChatpostBasicInfo {
  chatPostId: Chatpost["chatPostId"];
  chatpostName: Chatpost["chatpostName"];
}

export interface IFolderForClient {
  folderId: number;
  folderName: string;
  chatposts: IChatpostBasicInfo[];
}

export interface IFolder {
  folderId: number;
  folderName: string;
  chatpostIds: Chatpost["chatPostId"][];
}
