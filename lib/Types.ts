import { JsonValue } from "@prisma/client/runtime/library";

export type NOTE_TYPE = {
   id: string;
    title: string;
    content: string;
    writer: string;
    date: Date;
    isPinned: boolean;
    sharedWith?: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    category: string;
}