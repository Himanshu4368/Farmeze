import * as SecureStore from 'expo-secure-store';

export const CLERK_PUBLISHABLE_KEY = 'pk_test_cXVhbGl0eS1kb2xwaGluLTc3LmNsZXJrLmFjY291bnRzLmRldiQ';

export const isClerkConfigured =
  CLERK_PUBLISHABLE_KEY &&
  CLERK_PUBLISHABLE_KEY.startsWith('pk_');

export const clerkTokenCache = {
  getToken: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  saveToken: async (key, token) => {
    try {
      if (!token) {
        await SecureStore.deleteItemAsync(key);
        return;
      }

      await SecureStore.setItemAsync(key, token);
    } catch {
      // Clerk can continue with in-memory auth if persistence fails.
    }
  },
};

export const normalizePhoneForClerk = (phone) => {
  const trimmed = String(phone || '').trim();

  if (trimmed.startsWith('+')) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  return trimmed;
};

export const formatClerkUser = (user, fallback = {}) => {
  const firstPhone =
    user?.phoneNumbers?.find((phoneNumber) => phoneNumber.id === user.primaryPhoneNumberId) ||
    user?.phoneNumbers?.[0];

  const firstEmail =
    user?.emailAddresses?.find((email) => email.id === user.primaryEmailAddressId) ||
    user?.emailAddresses?.[0];

  return {
    id: user?.id || fallback.id || '',
    _id: user?.id || fallback._id || '',
    name:
      user?.fullName ||
      [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
      fallback.name ||
      'Farmeze User',
    phone:
      firstPhone?.phoneNumber ||
      fallback.phone ||
      '',
    email:
      firstEmail?.emailAddress ||
      fallback.email ||
      '',
    address: fallback.address || '',
    city: fallback.city || '',
    state: fallback.state || '',
    pincode: fallback.pincode || '',
    language: fallback.language || 'english',
    profileImage:
      user?.imageUrl ||
      fallback.profileImage ||
      '',
  };
};

export const getClerkErrorMessage = (error, fallback) => {
  return (
    error?.errors?.[0]?.longMessage ||
    error?.errors?.[0]?.message ||
    error?.longMessage ||
    error?.message ||
    fallback
  );
};
