import React from 'react';
import PropTypes from 'prop-types'

function DistanceCircleForm({ setAddress, setRadius, onSubmit }) {
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>
                    Address:
                    <input type="text" name="Address"
                           onChange={(event) => setAddress(event.target.value)} />
                </label>
                <label>
                    Radius in KM:
                    <input type="number" name="km"
                           onChange={(event) => setRadius(event.target.value * 1000)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

DistanceCircleForm.propTypes = { setAddress: PropTypes.func.isRequired, setRadius: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired }

export default DistanceCircleForm;
