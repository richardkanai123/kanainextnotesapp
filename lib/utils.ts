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



// // filter notes array depending on title and category
// export const filterNotes = (titleparam: string | string[] | undefined, Notes: NOTE_TYPE[], categoryParam:string | string[] | undefined) => {
// 	const titleTag = titleparam as string | undefined
// 	const categoryTag = categoryParam as string | undefined
// 	if (titleTag && categoryTag) {
// 		return Notes.filter((note) => note.title.toLowerCase().includes(titleTag.toLowerCase()) && note.category === categoryTag)
// 	} else if (titleTag) {
// 		return Notes.filter((note) => note.title.toLowerCase().includes(titleTag.toLowerCase()))
// 	} else if (categoryTag && categoryTag !== 'all') {
// 		return Notes.filter((note) => note.category === categoryTag)
// 	} else {
// 		return Notes
// 	}
// };

export const filterNotes = (
  titleParam: string | string[] | undefined,
  notes: NOTE_TYPE[],
  categoryParam: string | string[] | undefined
): NOTE_TYPE[] => {
  const titleTag = typeof titleParam === "string" ? titleParam : undefined;
  const categoryTag = typeof categoryParam === "string" ? categoryParam : undefined;

  return notes.filter((note) => {
    const matchesTitle = titleTag
      ? note.title.toLowerCase().includes(titleTag.toLowerCase())
      : true;

    const matchesCategory =
      categoryTag && categoryTag !== "all" ? note.category === categoryTag : true;

    return matchesTitle && matchesCategory;
  });
};
