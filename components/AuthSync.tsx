'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createUser } from '@/app/actions/actions';

export function AuthSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user) {
        try {
          // Get primary email and phone number if available
          const primaryEmail = user.primaryEmailAddress?.emailAddress;
          const primaryPhone = user.primaryPhoneNumber?.phoneNumber;
          
          if (primaryEmail) {
            const { user: dbUser, error } = await createUser(
              user.fullName || user.username || 'Anonymous',
              primaryEmail,
              primaryPhone || ''
            );

            if (error) {
              console.error('Error syncing user to database:', error);
            } else {
              console.log('User synced successfully:', dbUser);
            }
          }
        } catch (error) {
          console.error('Error in user sync:', error);
        }
      }
    };

    syncUser();
  }, [user, isLoaded]);

  // This component doesn't render anything
  return null;
}
