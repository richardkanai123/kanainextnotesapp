export type NOTE_TYPE = {
   id: string;
    title: string;
    content: string;
    writer: string;
    date: Date;
    isPinned: boolean;
    sharedWith: string[];
    createdAt: Date;
    updatedAt: Date;
    category: string;
}