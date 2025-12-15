import React from 'react';
import LabeledInput from '../Elements/LabeledInput';
import Button from '../Elements/Button';
import { Link } from 'react-router-dom';

function FormSignUp() {
  return (
    <>
      {/* form start */}
      <div className="mt-16">
        <form action="">
          <div className="mb-6">
            <LabeledInput
              label="Name"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
            />
          </div>

          <div className="mb-6">
            <LabeledInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="hello@example.com"
              name="email"
            />
          </div>

          <div className="mb-6">
            <LabeledInput
              label="Password"
              id="password"
              type="password"
              placeholder="***************"
              name="password"
            />
          </div>

          <p className="text-xs text-gray-03 mb-6">
            By continuing, you agree to our{' '}
            <span className="text-primary">terms of service</span>.
          </p>

          <Button>Sign up</Button>
        </form>
      </div>
      {/* form end */}

      {/* teks start */}
      <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03 relative">
        <div className="border border-gray-05 w-full"></div>
        <div className="px-2 bg-special-mainBg absolute">
          or sign up with
        </div>
      </div>
      {/* teks end */}

      {/* sign up with google start */}
      <div className="mb-8">
        <Button type="button" variant="secondary">
          <span className="flex items-center justify-center">
            {/* icon Google boleh sama persis dengan SignIn */}
            Continue with Google
          </span>
        </Button>
      </div>
      {/* sign up with google end */}

      {/* link start */}
      <div className="flex justify-center">
        <span className="text-gray-03 text-sm mr-1">
          Already have an account?
        </span>
        <Link to="/login" className="text-primary font-bold">
          Sign in here
        </Link>
      </div>
      {/* link end */}
    </>
  );
}

export default FormSignUp;
