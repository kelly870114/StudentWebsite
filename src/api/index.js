import axios from 'axios';
import queryString from 'query-string';
const config = {
  headers: {
    'Authorization' : 'Bearer keyA7EKdngjou4Dgy',
    'Content-Type': 'application/json;charset=UTF-8',
  },
}
//const updateURL = 'https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student/' + 'rec0tIlyDJJsyTlm5'
const updateURL = 'https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student/' 

const teacherUpdateURL = 'https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Teacher/' + 'recWnezYRt7An3SQ8'
// Api docs, http://www.amiiboapi.com/
//export const fetchGetCharacterList = (payload) => axios.get(`https://reqres.in/api/users?${queryString.stringify(payload)}`, config)
//export const fetchGetCharacterList = () => axios.get(`https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?view=Grid%20view?`, config)

//export const fetchPostStudent = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?view=Grid%20view', payload, config)
//export const fetchPostStudent = (payload) => axios.patch(updateURL, payload, config)
export const fetchUpdateStudentEmail = (payload,id) => axios.patch(updateURL + id, payload, config)
export const fetchUpdateAccountEmail = (payload,id) => axios.patch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Account/' + id, payload, config)

export const fetchPostTeacher = (payload) => axios.patch(teacherUpdateURL, payload, config)

export const fetchPostClassMember = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassMember?view=Grid%20view', payload, config)

//Reserve Stu
export const fetchPostReserveStudent = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ReserveStudent?view=Grid%20view', payload, config)