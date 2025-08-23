'use server'
import { validateRequest } from './validate-user';
import { redirect } from 'next/navigation';

export const redirectIfAuthenticated = async (destination: string = '/discover') => {
    const { user } = await validateRequest();
    if (user) {
        redirect(destination);
    }
};
