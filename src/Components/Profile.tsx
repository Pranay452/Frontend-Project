import axios from "axios";
import { Alert, Button, TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  UserType,
} from "../Redux/User/UserSlice";

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  contact_number?: number;
}

interface InputChangeEvent {
  target: { id: string; value: string };
}

interface InputSubmitEvent {
  preventDefault: Function;
}

const Profile = () => {
  // const [profileImageFile, setProfileImageFile] = useState<any>(null);
  // const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    string | null
  >(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  // const [imageFileUploadingError, setImageFileUploadingError] = useState<
  //   string | null
  // >(null);
  const [formData, setFormData] = useState<FormData>({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  // const [showModal, setShowModal] = useState(false);

  const imagePickerRef = useRef<any>(null);
  const dispatch = useDispatch();

  const { currentUser, error, loading } = useSelector(
    (state: UserType) => state.user
  );
  const { profilePicture, username, email, contact_number } = currentUser || {};
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (profileImageFile) {
  //     uploadImage();
  //   }
  // }, [profileImageFile]);

  // const uploadImage = () => {
  //   // service firebase.storage {
  //   //     match /b/{bucket}/o {
  //   //       match /{allPaths=**} {
  //   //         allow read
  //   //         allow write: if
  //   //         request.resource.size < 2 * 1024 * 1024 &&
  //   //         request.resource.contentType.matches('image/.*')
  //   //       }
  //   //     }
  //   //   }
  //   setImageFileUploading(true);
  //   setImageFileUploadingError(null);
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + profileImageFile.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, profileImageFile);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setImageFileUploadingProgress(progress.toFixed(0));
  //     },
  //     () => {
  //       setImageFileUploadingError(
  //         "Could not upload image (File must be less than 2MB)"
  //       );
  //       setImageFileUploadingProgress(null);
  //       setProfileImageFile(null);
  //       setProfileImage(null);
  //       setImageFileUploading(false);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setProfileImage(downloadURL);
  //         setFormData((prev) => ({
  //           ...prev,
  //           profilePicture: downloadURL,
  //         }));
  //         setImageFileUploading(false);
  //       });
  //     }
  //   );
  // };

  // const handleImageChange = (e: any) => {
  //   setUpdateUserSuccess(null);
  //   setUpdateUserError(null);
  //   const imageFile = e.target.files[0];
  //   if (imageFile) {
  //     setProfileImageFile(imageFile);
  //     const imageUrl = URL.createObjectURL(imageFile);
  //     setProfileImage(imageUrl);
  //   }
  // };

  const handleChange = (e: InputChangeEvent) => {
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    let value = e.target.value.trim();
    if (e.target.id === "contact_number") {
      value = value.replace(/\D/g, "");
    }
    console.log(e.target.id, value);
    setFormData((prev) => ({ ...prev, [e.target.id]: value }));
  };

  const handleSubmit = (e: InputSubmitEvent) => {
    e.preventDefault();
    setImageFileUploading(true);
    // setImageFileUploadingError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
    }
    try {
      dispatch(updateStart());
      const accessToken = Cookies.get("accessToken");
      axios
        .put(
          `http://localhost:5000/api/v1/user/update/${currentUser._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const { status, data, message } = response?.data || {};
          if (status === "SUCCESS") {
            dispatch(
              updateSuccess({
                ...data,
                profilePicture,
              })
            );
            setUpdateUserSuccess("User's profile updated successfully");
          } else {
            dispatch(updateFailure(message));
            setUpdateUserError(message);
          }
        })
        .catch((error) => {
          const { message } = error?.response?.data || {};
          dispatch(updateFailure(message));
          setUpdateUserError(message);
        });
    } catch (error) {
      const typedError = error as { message: string };
      dispatch(updateFailure(typedError?.message));
      setUpdateUserError(typedError?.message);
    }
  };

  // const handleDeleteUser = () => {
  // setShowModal(false);
  // try {
  //   dispatch(deleteUserStart());
  //   axios
  //     .delete(`/api/user/delete/${currentUser._id}`)
  //     .then((response) => {
  //       const { status, message } = response?.data || {};
  //       if (status === "SUCCESS") {
  //         dispatch(deleteUserSuccess());
  //       } else {
  //         dispatch(deleteUserFailure(message));
  //       }
  //     })
  //     .catch((error) => {
  //       const { status, message } = error?.response?.data || {};
  //       if (status === "FAILED") {
  //         dispatch(deleteUserFailure(message));
  //       }
  //     });
  // } catch (error) {
  //   dispatch(deleteUserFailure(error?.message));
  // }
  // };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <div className="mt-32">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imagePickerRef}
            hidden
          /> */}
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => imagePickerRef.current?.click()}
          >
            {/* {imageFileUploadingProgress && (
              <CircularProgressbar
                value={Number(imageFileUploadingProgress) || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      Number(imageFileUploadingProgress) / 100
                    })`,
                  },
                }}
              />
            )} */}
            <img
              src={profilePicture}
              alt="User"
              className={`rounded-full object-cover w-full h-full border-8 border-[lightgray] ${
                imageFileUploadingProgress &&
                Number(imageFileUploadingProgress) < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {/* {imageFileUploadingError && (
            <Alert color="failure">{imageFileUploadingError}</Alert>
          )} */}
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={username}
            onChange={handleChange}
          />
          <div className="relative">
            <TextInput
              type="email"
              id="email"
              placeholder="email"
              defaultValue={email}
              onChange={handleChange}
            />
            <div className="absolute top-[65px] z-10 right-4">
              <button className="text-sm font-bold">{"VERIFY"}</button>
            </div>
          </div>

          {/* contact number */}
          <TextInput
            type="number"
            id="contact_number"
            maxLength={10}
            defaultValue={contact_number}
            placeholder="Contact Number"
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="Update Password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            // disabled={loading || imageFileUploading}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </form>

        {updateUserSuccess && (
          <Alert className="mt-5" color="success">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert className="mt-5" color="failure">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Profile;
