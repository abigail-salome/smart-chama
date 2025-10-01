import React from 'react'

const RegisterGroupForm = () => {
  return (
    <div>
        <button>+ Register Group</button>
        <form>
            <fieldset>
                <legend>Register Group</legend>
                <div>
                    <label htmlFor='group-name'>Group Name:</label>
                    <input type="text" id="group-name" />
                </div>
                <div>
                    <label htmlFor="country-select">Select a Country</label>
                    <select id="country-select">
                        <option value="KE">Kenya</option>
                        <option value="UG">Uganda</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TZ">Tanzania</option>

                    </select>
                </div>
            </fieldset>
        </form>
    </div>
  )
}

export default RegisterGroupForm