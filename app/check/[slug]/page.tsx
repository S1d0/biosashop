
export default async function Check({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params

    return <div>Slug: {slug}</div>
}