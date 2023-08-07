import { useState } from 'react'
import { toast } from 'react-hot-toast'
import * as yup from "yup";

const AddUserCard = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    role: yup.string().required("Role is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
  });

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  
  const handleAddUser = () => {
    console.log(userInput);
    const errors = validationSchema.validate(userInput);
    if (!errors) {
      // The form data is valid, do something with it
      console.log("Form data is valid:", userInput);
    } else {
      // The form data is invalid, show the errors
      console.log("Form data is invalid:", errors);
    }
    
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add User</h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="username">First Name</label>
              <input 
              value={userInput.firstName}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  firstName: e.target.value
                })
              } id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Last Name</label>
              <input 
              value={userInput.lastName}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  lastName: e.target.value
                })
              }
              id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>

              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
              <input 
              value={userInput.email}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  email: e.target.value
                })
              }
              id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Role</label>
              <input 
              value={userInput.role}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  role: e.target.value
                })
              }
              id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password </label>
              <input 
              value={userInput.password}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  password: e.target.value
                })
              }
              id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
              <input 
              value={userInput.confirmPassword}
              onChange={
                (e) => setUserInput({
                  ...userInput,
                  confirmPassword: e.target.value
                })
              }
              id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleAddUser} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default AddUserCard