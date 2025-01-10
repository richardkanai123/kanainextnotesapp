
export default async function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const results = searchParams.title

    return <div>{results}</div>
}