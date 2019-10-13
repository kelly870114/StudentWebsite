import React from 'react';
import Employee from './employee.jsx'
 
export default class EmployeeList extends React.Component{
     
    render() {
        var employees = this.props.employees.map((employee, i) =>
            <Employee key={i} employee={employee}/>
        );
         
        return (
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                    {employees}
                </tbody>
            </table>
        )
    }
}