import React from 'react';
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table';

function CirclesTable({ circles }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Address Found on Google</th>
                <th>Radius(KM)</th>
            </tr>
            </thead>
            <tbody>
            {circles.map((circle, index) => (<><tr><td>{index}</td><td>{circle.formatted_address}</td><td>{circle.radius/1000}</td></tr></>))}
            </tbody>
        </Table>
    );
}

CirclesTable.propTypes = { circles: PropTypes.array.isRequired }

export default CirclesTable;
