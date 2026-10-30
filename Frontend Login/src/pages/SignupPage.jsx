import React, { useEffect, useState } from 'react'

function SignupPage() {

  const [signup, setSignup] = useState({})
  useEffect(() => {
    const Singup = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({
            
            }),
        });

        const data = await res.json();

        console.log(data);
        setSignup(data);
      } catch (error) {
        console.log(error);
      }
    };

    Singup();
  }, []);

  return (
    <>
    </>
  )
}

export default SignupPage