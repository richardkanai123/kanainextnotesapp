'use client'

import React from 'react'
// const ShareAction = async () => {
//     try {
//         setIsSharing(true)
//         const shareRes = await ShareNoteAction(noteid, value)
//         if (!shareRes.success) {
//             toast.error('Failed to share the note')
//             setIsSharing(false)
//             return
//         }
//         const newRecipient = users.find(user => user.externalId === value)
//         toast.success(`Successfully shared with ${newRecipient?.username}`)
//         setIsSharing(false)
//     } catch (error) {
//         console.log(error)
//         if (error instanceof Error) {
//             toast.error(error.message)
//         } else {
//             toast.error('Something went wrong, please try again!')
//         }
//         setIsSharing(false)
//     }
// }

interface ShareNoteBtnProps {
    users: {
        id: string;
        externalId: string;
        username: string;
    }[] | undefined;
    noteid: string;
}

const ShareNoteBtn = ({ users, noteid }: ShareNoteBtnProps) => {

    if (!users) {
        return null
    }

    console.log(users, noteid)
    return (
        <div>ShareNoteBtn</div>
    )
}

export default ShareNoteBtn