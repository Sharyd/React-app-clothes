import { useState, useRef, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import AuthContext from "../../store/auth-context";
import classes from "./profile.module.css";
import { storage } from "../../firebase";

import { getDownloadURL, ref, uploadString } from "@firebase/storage";
const passwordChars = (value) => {
  const regexChars = /[$&+,:;=?@#|'<>.^*()%!-]/;
  return value.match(regexChars) && value.length >= 7;
};

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileURL, setFileUrl] = useState("");
  const [formInputsValidity, setFormInputsValidity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  useEffect(() => {
    getDownloadURL(ref(storage, "images")).then((url) => {
      setFileUrl(url);
    });
  }, []);

  const sendImageProfile = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const imageRef = ref(storage, "images");

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        setFileUrl(downloadURL);
      });
    }

    setIsLoading(false);
  };

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const enteredPasswordIsValid = passwordChars(enteredNewPassword);

    if (!enteredPasswordIsValid) {
      setFormInputsValidity(false);
      return;
    }

    // add validation
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiTdcWv-PzF8u_ILkBy4Re6RkMH5I11-A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data) {
              errorMessage = "You are already changed the password!";
            }

            setError(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    setFormInputsValidity(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerImg}>
        {fileURL ? (
          <img src={fileURL} alt="profile img"></img>
        ) : (
          <ClipLoader color="#096179" className={classes.loader} />
        )}
        {isLoading && fileURL && (
          <p className={classes.loading}>Loading image...</p>
        )}
        <h2 className={classes.heading}>Change your profile image</h2>
        <div className={classes.item}>
          <label>Choose image </label>
          <input type="file" onChange={addImage} />
          <button onClick={sendImageProfile}>Save image</button>
        </div>
      </div>
      <form className={classes.form} onSubmit={formSubmit}>
        <h2 className={classes.heading}>Change your password</h2>
        <div className={classes["form-control"]}>
          <label htmlFor="new-password">new password</label>
          <input
            type="password"
            id="new-password"
            placeholder="new password"
            minLength="7"
            ref={newPasswordInputRef}
          />
          {error && <p className={classes["error-text"]}>{error}</p>}
          {!formInputsValidity && (
            <p className={classes["error-text"]}>
              Your password must have one special char!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {isLoading && <p className={classes.loading}>Sending request...</p>}
          <button type="submit">Change password</button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
