import { useImageCrop } from "../../context/ImageCropContext";
import { changeUserName, editProfile } from "../api/profileApi";

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

export const HandleEditProfileSettings = async (
  objt,
  current_username,
  croppedImageFrontPage,
  croppedBlobFrontPage,
  croppedImageAvatar,
  croppedBlobAvatar,
  token
) => {
  const {
    name,
    lastname,
    description,
    birthday: birthday_dayjs,
    username,
    avatar_img,
    front_page_img,
  } = objt;

  const birthday_date = new Date(birthday_dayjs);
  const birthday = birthday_date.toISOString();

  const data = {
    name,
    lastname,
    birthday,
    description,
  };

  const form_data = await formDataEditProfile(
    croppedImageAvatar,
    croppedBlobAvatar,
    avatar_img,
    croppedImageFrontPage,
    croppedBlobFrontPage,
    front_page_img,
    data
  );

  //const response = await editProfile(form_data, token);
  //return response;
  let new_username = current_username;
  let nextModificationDate = null;
  let nextModificationDateModify = false;

  try {
    if (current_username !== username) {
      const response_change_username = await changeUserName(
        { username },
        token
      );
      new_username = username;
      nextModificationDateModify = true;
      nextModificationDate = response_change_username.data.nextModificationDate;
    }
    const { data: response_edit_profile, error: error_edit_profile } =
      await editProfile(form_data, token);

    const user = {
      ...response_edit_profile.user,
      username: new_username,
    };

    return {
      response: {
        user,
        nextModificationDate,
        nextModificationDateModify,
      },
      error: null,
    };
  } catch (error) {
    return { response: null, error: error };
  }
  /*
  try{
    let new_username = current_username
    const {data: response_edit_profile, error: error_edit_profile} = await editProfile(form_data, token)
    if(username !== current_username ){
      await changeUserName({username: username}, token)
      new_username = username
    } 
    const response = {
      ...response_edit_profile
    }

  }catch(error){

  }
  */
};

export const HandleEditAccountSettings = () => {
  //
};

export const HandleEditSecuritySettings = () => {
  //
};

export const HandleEditInterestsSettings = () => {
  //
};

export const HandleSubmitByScreenSettings = (screen, data) => {
  switch (screen) {
    case "Profile":
      HandleEditProfileSettings(data);
  }
};
