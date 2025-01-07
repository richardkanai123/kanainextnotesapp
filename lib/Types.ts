export type NOTE_TYPE = {
    id: string;
    title: string;
    content: string;
    date: Date;
    writer: string;
    isPinned: boolean;
    sharedWith?: string[];
    createdAt: Date;
    updatedAt?: Date;
    category: string
}