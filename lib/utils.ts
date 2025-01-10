import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
import { noteCategories } from "./Constants/categories";
import { NOTE_TYPE } from "./Types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const DaysFromToday = (date: Date) => {
	const today = new Date();
	const formatedDistance = formatDistanceStrict(new Date(date), today, {
		addSuffix: true,
	});
	return formatedDistance;
};

export const GetCategoryEmoji = (categoryName: string) => {
	return noteCategories.find((category) => category.name === categoryName)
		?.emoji;
};

export const FormatDateIntoReadableString = (date: Date) => {
	const targetDate = new Date(date);
	const formattedDate = format(targetDate, "PPPP");
	return formattedDate;
};



// filter notes array depending on title
export const filterNotes = (titleparam: string | string[] | undefined, Notes: NOTE_TYPE[]) => {
  const titleTag = titleparam as string | undefined
  if (!titleTag) {
    return Notes
  }
  else
  {
    const filteredNotesArray = Notes.filter((note) => note.title.toLowerCase().includes(titleTag.toLowerCase()))
    return filteredNotesArray
  }
};
