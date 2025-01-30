"use client";

import { noteCategories } from "@/lib/Constants/categories";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const NavCatFilter = () => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const categoryParams = searchParams.get('category') as string | undefined


    return (
        <Suspense fallback={<p className="text-sm text-gray-500">Loading filter...</p>}>
            <div className="p-2">
                <Select onValueChange={(value) => {
                    const params = new URLSearchParams(searchParams)
                    params.set('category', value)
                    replace(`${pathname}?${params.toString()}`);
                }} defaultValue={categoryParams || 'all'}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            <SelectItem
                                key='all_items'
                                value='all'>
                                All
                            </SelectItem>
                            {noteCategories.map((category) => (
                                <SelectItem
                                    key={category.name}
                                    value={category.name}>
                                    {category.emoji} {category.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </Suspense>
    );
};

export default NavCatFilter;
