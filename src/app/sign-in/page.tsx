import React from "react";
import CustomButton from "../components/button";
import CustomInput from "../components/custom-input";
import PasswordInput from "../components/password-input";

const page = () => {
  return (
    <main className='bg-white h-screen max-h-screen flex justify-between'>
      <section className='w-full flex flex-col items-center justify-center p-8'>
        <div className='w-full flex flex-col items-center justify-center gap-[20px] max-w-[576px]'>
          <div className='flex items-start w-full pb-4'>
            <h2 className='text-black text-[32px]'>Sign In</h2>
          </div>
          <CustomInput labelName='Email' inputProps={{ placeholder: "Enter your email address", name: "email", type: "email" }} />
          <PasswordInput placeholder='Enter your password' />
          <CustomButton label='Sign in' loading={false} />
        </div>
      </section>
      <section className='w-full bg-black hidden sm:block'></section>
    </main>
  );
};

export default page;
