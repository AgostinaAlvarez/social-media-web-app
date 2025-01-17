export const formDataEditProfile = async (
  croppedImageAvatar,
  croppedBlobAvatar,
  avatar_img,
  croppedImageFrontPage,
  croppedBlobFrontPage,
  front_page_img,
  data
) => {
  const formData = new FormData();

  let frontPageImageStatus = null;
  let avatarImageStatus = null;

  if (croppedImageAvatar !== avatar_img) {
    if (croppedBlobAvatar) {
      avatarImageStatus = "update";
      formData.append(
        "avatar_img",
        croppedBlobAvatar.blob,
        croppedBlobAvatar.fileName
      );
    } else {
      avatarImageStatus = "delete";
    }
  }

  if (croppedImageFrontPage !== front_page_img) {
    if (croppedBlobFrontPage) {
      frontPageImageStatus = "update";
      formData.append(
        "front_page_img",
        croppedBlobFrontPage.blob,
        croppedBlobFrontPage.fileName
      );
    } else {
      frontPageImageStatus = "delete";
    }
  }

  formData.append("frontPageImageStatus", frontPageImageStatus);
  formData.append("avatarImageStatus", avatarImageStatus);

  formData.append("updates", JSON.stringify(data));

  return formData;
};
