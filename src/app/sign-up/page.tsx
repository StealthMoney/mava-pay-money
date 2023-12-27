import React from "react";
import CustomButton from "../components/button";
import CustomInput from "../components/custom-input";

const page = () => {
  return (
    <main className='bg-white h-screen max-h-screen flex justify-between'>
      <section className='w-full flex flex-col items-center justify-center p-4 md:p-8 '>
        <div className='w-full flex flex-col items-center justify-center gap-[20px] max-w-[576px]'>
          <div className='flex items-start w-full pb-4'>
            <h2 className='text-black text-[32px] max-w-[576px]'>Sign Up</h2>
          </div>
          <section className='flex gap-4 w-full'>
            <CustomInput labelName='First name' inputProps={{ placeholder: "Enter your first name", name: "firstName", type: "text" }} />
            <CustomInput labelName='Last name' inputProps={{ placeholder: "Enter your last name", name: "lastname", type: "text" }} />
          </section>

          <CustomInput labelName='Username' inputProps={{ placeholder: "Select a username", name: "username", type: "text" }} />

          <section className='flex gap-4 w-full'>
            <CustomInput labelName='Bank name' inputProps={{ placeholder: "Select your bank name", name: "bankname", type: "text" }} />
            <CustomInput
              labelName='Account number'
              inputProps={{ placeholder: "Enter your account number", name: "accountNumber", type: "number" }}
            />
          </section>

          <CustomInput labelName='BVN' inputProps={{ placeholder: "Enter your BVN", name: "bvn", type: "number" }} />

          <section className='flex gap-4 w-full'>
            <CustomInput labelName='Email' inputProps={{ placeholder: "Enter your email address", name: "email", type: "email" }} />
            <CustomInput labelName='Password' inputProps={{ placeholder: "Choose a strong password", name: "password", type: "password" }} />
          </section>

          <CustomButton label='Sign up' loading={false} />
        </div>
      </section>

      <section className='w-full bg-black hidden md:block'></section>
    </main>
  );
};

export default page;
