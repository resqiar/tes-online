import React, { useRef, useState } from "react";
import axios from '../../api/Axios'
import "./MainScreen.css";

import WarningIcon from '@material-ui/icons/Warning';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Spinner from "react-spinner-material";

const MainScreen = () => {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const errorRef = useRef(null);
  const errorTextRef = useRef(null);

  const sendInput = async (e) => {
    e.preventDefault();
    setLoading(true)

    errorRef.current.style = "display:none";

    if (!inputRef.current.value) {
        setLoading(false)
        errorRef.current.style = "display:flex";
        errorTextRef.current.innerHTML = "Please fill the field";

        return;
    }

    const input = inputRef.current.value;

    // split using destructuring array
    const [name, age, city] = input.split(" ");

    try {
        const request = await axios.post('/send-input-here', {
            name: name,
            age: age,
            city: city,
        })

        // TODO: AT THIS POINT REQUEST IS SUCCESSFULL

        setLoading(false)
        console.log(request.data);
        alert(request.data.status)
    } catch (e) {

        // TODO: AT THIS POINT REQUEST IS FAILED
        
        setLoading(false);
        errorRef.current.style = "display:flex";
        errorTextRef.current.innerHTML = e.response.data.error;
    }
  };

  return (
    <div className="main-screen">
      <div className="input-container">
        <h2 className="input-header">Input data</h2>
        <div className="input-form">
          <form>
            <div className="label-container">
              <ErrorOutlineIcon />
              <label htmlFor="input">format: NAME[space]AGE[space]CITY</label>
            </div>
            <input
              ref={inputRef}
              type="text"
              name="input"
              id="input"
              placeholder="e.g: RESQIAGENG 19TAHUN SIDOARJO"
              required={true}
            />
            <div className="error-message" ref={errorRef}>
              <WarningIcon /> <span ref={errorTextRef}></span>
            </div>
            <button onClick={sendInput}>
              {!loading ? (
                <>SUBMIT</>
              ) : (
                <>
                  <div className="loading">
                    <Spinner radius={20} color={"#fff"} stroke={2} />
                  </div>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
