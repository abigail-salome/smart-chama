import React from "react";
import { useState } from "react";
import { createGroup } from "../db/groupRepository.js";
import { addMembership } from "../db/membershipRepository";

import { useNavigate } from "react-router-dom";
const initialInput = {
  organizationName: "",
  countryOfOperation: "",
  groupCurrency: "",
  typeOfGroup: "",
};
const RegisterGroupForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    if (
      !input.organizationName ||
      !input.countryOfOperation ||
      !input.groupCurrency ||
      !input.typeOfGroup
    ) {
      setError("Please fill out the empty field");
      return;
    }

    try {
       
      await createGroup(
        input.organizationName,
        input.countryOfOperation,
        input.groupCurrency,
        input.typeOfGroup
      );
      setInput(initialInput);
      navigate("/member/:groupId");
    } catch (error) {
      console.error("registering group failed:", error);
    }

    const userRole = "admin";

    if (userRole === "admin") {
      navigate("/admin/:groupId");
    } else {
      navigate("/member/:groupId");
    }
  };

  return (
    <div>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>+ Register new Chama</button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Group setup Details</legend>
            <div>
              <label htmlFor="group-name">Organization Name:</label>
              <input
                type="text"
                id="group-name"
                value={input.organizationName}
                onChange={(e) =>
                  setInput({ ...input, organizationName: e.target.value })
                }
                placeholder="Name Of The Group"
              />
            </div>
            <div>
              <label htmlFor="country-select">Country of Operation:</label>
              <select
                id="country-select"
                value={input.countryOfOperation}
                onChange={(e) =>
                  setInput({ ...input, countryOfOperation: e.target.value })
                }
              >
                <option value="disabled">--Select a country--</option>
                <option value="KE">Kenya</option>
                <option value="UG">Uganda</option>
                <option value="TZ">Tanzania</option>
                <option value="RWA">Rwanda</option>
                <option value="BI">Burundi</option>
                <option value="ET">Ethiopia</option>
                <option value="SOM">Somalia</option>
                <option value="SSD">South Sudan</option>
                <option value="SD">Sudan</option>
                <option value="DJI">Djibouti</option>
                <option value="ERI">Eritrea</option>
              </select>
            </div>
            <div>
              <label htmlFor="currency-select">Group Currency:</label>
              <select
                id="currency-select"
                value={input.groupCurrency}
                onChange={(e) =>
                  setInput({ ...input, groupCurrency: e.target.value })
                }
              >
                <option value="disabled">--Select operating currency--</option>
                <option value="KES">Kenyan Shilling</option>
                <option value="UGX">Ugandan Shilling</option>
                <option value="TZS">Tanzanian Shilling</option>
                <option value="RWF">Rwandan Franc</option>
                <option value="BIF">Burundian Franc</option>
                <option value="ETB">Ethiopian Birr</option>
                <option value="SOS">Somali Shilling</option>
                <option value="SSP">South Sudanese Pound</option>
                <option value="SDG">Sudanese Pound</option>
                <option value="DJF">Djiboutian Franc</option>
                <option value="ERN">Eritrean Nakfa</option>
              </select>
            </div>
            <div>
              <label htmlFor="type-select">Type of Group:</label>
              <select
                id="type-select"
                value={input.typeOfGroup}
                onChange={(e) =>
                  setInput({ ...input, typeOfGroup: e.target.value })
                }
              >
                <option value="disabled hidden">--Select type--</option>
                <option value="Investment-Club">Investment Club</option>
                <option value="Chama">Chama</option>
                <option value="Sacco">Sacco</option>
                <option value="Youth-Group">Youth Group</option>
                <option value="Women-Group">Women Group</option>
                <option value="Welfare-Group">Welfare Group</option>
                <option value="Merry-go-round">Merry-go-round</option>
              </select>
            </div>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </fieldset>

          <button type="submit">Create Group and Continue</button>
        </form>
      )}
    </div>
  );
};

export default RegisterGroupForm;
