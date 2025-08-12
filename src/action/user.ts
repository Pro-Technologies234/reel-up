import prisma, { User } from "@/lib/prisma";

export async function getUser(userId: string) {

    try {
        const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        
        if (!user) {
            return { error: 'User does not exist' }
        }

        return { user }

    } catch(error: any) {
        console.log('Unable to get user', error)
        return { error: error?.message || 'Unable to get user' }
    }

}