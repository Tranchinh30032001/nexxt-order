import React from "react";
import FormLogin from "./components/FormLogin";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center h-[100vh]">
      <div className="w-[600px] border-[1px] p-4 rounded-lg" >
        <h1 className="font-bold text-xl mb-4" >Login Form</h1>
        <FormLogin />
      </div>
    </main>
  );
};

export default LoginPage;
