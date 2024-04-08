export const getSightingPhoneNumber = (sightingData) => {
  if (sightingData.user?.phone) {
    return sightingData.user.phone;
  } else if (sightingData.contactInfo?.phone) {
    return sightingData.contactInfo.phone;
  } else {
    return null;
  }
};

export const getSightingEmail = (sightingData) => {
  if (sightingData.user?.email) {
    return sightingData.user.email;
  } else if (sightingData.contactInfo?.email) {
    return sightingData.contactInfo.email;
  } else {
    return null;
  }
};
