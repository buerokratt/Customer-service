export interface MessageModel {
  id?: string;
  chatId: string;
  content?: string;
  event?: string;
  authorId?: string;
  authorTimestamp: string;
  authorFirstName: string;
  authorLastName?: string;
  authorRole: string;
  rating?: string;
  created?: string;
  updated?: string;
}
