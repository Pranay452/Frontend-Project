import axios from "axios";
import { Alert, Button, TextInput } from "flowbite-react";
import { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
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
  const { authToken } = useContext(AuthContext);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    string | null
  >(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);

  const imagePickerRef = useRef<any>(null);
  const dispatch = useDispatch();

  const { currentUser, error, loading } = useSelector(
    (state: UserType) => state.user
  );
  const { profilePicture, username, email, contact_number } = currentUser || {};
  const navigate = useNavigate();

  const handleChange = (e: InputChangeEvent) => {
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    let value = e.target.value.trim();
    if (e.target.id === "contact_number") {
      value = value.replace(/\D/g, "");
    }
    setFormData((prev) => ({ ...prev, [e.target.id]: value }));
  };

  const handleSubmit = (e: InputSubmitEvent) => {
    e.preventDefault();
    setImageFileUploading(true);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
    }
    try {
      dispatch(updateStart());
      axios
        .put(
          `http://localhost:5000/api/v1/user/update/${currentUser._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          const { status, data, message } = response?.data || {};
          if (status === "SUCCESS") {
            dispatch(updateSuccess({ ...data, profilePicture }));
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <div
            className="relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => imagePickerRef.current?.click()}
          >
            <img
              src={profilePicture}
              alt="User"
              className={`rounded-full object-cover w-full h-full border-8 border-light-gray ${
                imageFileUploadingProgress &&
                Number(imageFileUploadingProgress) < 100 &&
                "opacity-60"
              }`}
            />
          </div>
        </div>

        <h1 className="text-center text-2xl font-semibold mb-6">Profile</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={username}
            onChange={handleChange}
          />
          <div className="relative">
            <TextInput
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={email}
              onChange={handleChange}
            />
          </div>
          <TextInput
            type="text"
            id="contact_number"
            maxLength={10}
            defaultValue={contact_number}
            placeholder="Contact Number"
            onChange={handleChange}
          />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            disabled={loading || imageFileUploading}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </form>

        {updateUserSuccess && (
          <Alert className="mt-4" color="success">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert className="mt-4" color="failure">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert className="mt-4" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Profile;
