import { Prisma } from "@prisma/client";
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
};

export type USERLIST =
	| {
			success: boolean;
			users: null;
			message: string;
	  }
	| {
			success: boolean;
			message: string;
			users: Prisma.PrismaPromise<{
				id: string;
				createdAt: Date;
				updatedAt: Date;
				externalId: string;
				username: string;
				email_address: string;
			}>;
	  };

export type USERTYPE = 	 {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    externalId: string;
    username: string;
    email_address: string;
}

export type PERMISSIONSTYPE = {
	canEdit: boolean;
	canDelete: boolean;
	canComment: boolean;
	canPin: boolean;
	canShare: boolean;
}

export type USERSTYPE = {
    id: string;
    externalId: string;
	username: string;
	image_url: string
}[] | null

export type COMMENT = {
	id: string;
	content: string;
	writer: string;
	noteId: string;
	createdAt: Date;
	updatedAt?: Date;
}