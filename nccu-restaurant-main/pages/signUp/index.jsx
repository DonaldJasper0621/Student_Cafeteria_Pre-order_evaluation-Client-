import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // show error if student id or password is empty
  const onSubmit = async (data) => {
    // if student id and password is not empty, redirect to order page
    setLoading(true);
    if (
      data.studentId !== "" &&
      data.password !== "" &&
      data.gender !== "" &&
      data.occupation !== ""
    ) {
      try {
        // check user exist or not, if not create a new user and redirect to login page
        const res = await axios.post("/api/user/signUp", {
          studentId: parseInt(data.studentId),
          password: data.password,
          gender: data.gender,
          occupation: data.occupation,
        });
        // after create a new user, redirect to login page
        if (!res.data.message) {
          alert("Sign Up Success");
          router.push("/");
          setLoading(false);
        } else {
          setError(res.data.message);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setError("Something went wrong, please connect us");
        console.log(err);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center items-center space-y-4 relative">
        {loading && <Loader />}
        <h1 className="text-5xl font-bold">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4 w-2/3"
        >
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Student ID</span>
            </label>
            <input
              type="text"
              placeholder="Sutdent ID"
              className="input input-bordered w-full"
              {...register("studentId", { required: true })}
            />
            {errors.studentId && (
              <label className="label">
                <span className="label-text-alt text-red-500 w-full text-right">
                  this field is required
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-red-500 w-full text-right">
                  this field is required
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              {...register("gender", { required: true })}
              defaultValue=""
            >
              <option disabled value="">
                Pick one
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>
            {errors.gender && (
              <label className="label">
                <span className="label-text-alt text-red-500 w-full text-right">
                  this field is required
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Occupation</span>
            </label>
            <select
              className="select select-bordered"
              {...register("occupation", { required: true })}
              defaultValue=""
            >
              <option disabled value="">
                Pick one
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>

            {errors.occupation && (
              <label className="label">
                <span className="label-text-alt text-red-500 w-full text-right">
                  this field is required
                </span>
              </label>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col w-full border-opacity-50 max-w-md items-center justify-center">
            <button className="btn w-full max-w-md" type="submit">
              Sign Up
            </button>
            <div className="divider">OR</div>
            <label
              className="btn w-full max-w-md"
              onClick={() => {
                router.push("/");
              }}
            >
              Sign In
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
