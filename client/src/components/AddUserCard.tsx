import { useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import service from "@/service";

type IFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const AddUserCard = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    role: yup.string().required("Role is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  

  const handleAddUser = (data: IFormData) => {
    toast.promise(
      service.post('users', data).then((res) => {
        console.log(res);
      }),
      {
        loading: "Adding user...",
        success: "User added!",
        error: "Error adding user",
      }
    );

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add User
        </h2>
        <form onSubmit={handleSubmit(handleAddUser)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                First Name
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-red-700">{errors.firstName.message}</p>}
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Last Name
              </label>
              <input
               {...register("lastName")}
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.lastName && <p className="text-red-700">{errors.lastName.message}</p>}
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
               {...register("email")}
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.email && <p className="text-red-700">{errors.email.message}</p>}
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Role
              </label>
              <input
                {...register("role")}
                id="password"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.role && <p className="text-red-700">{errors.role.message}</p>}
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password{" "}
              </label>
              <input
                {...register("password")}
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.password && <p className="text-red-700">{errors.password.message}</p>}
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
               {...register("confirmPassword")}
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.confirmPassword && <p className="text-red-700">{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button 
            type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddUserCard;