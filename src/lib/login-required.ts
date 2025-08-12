'use server'
import { validateRequest } from './validate-user';
import { redirect } from 'next/navigation';

export const redirectIfAuthenticated = async (destination: string = '/feed') => {
    const { user } = await validateRequest();
    if (user) {
        redirect(destination);
    }
};
