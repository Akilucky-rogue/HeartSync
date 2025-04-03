
import React from 'react';
import Header from '@/components/common/Header';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <AuthForm mode="login" />
      </main>
    </div>
  );
};

export default Login;
