import React, { useState } from 'react'
import ResetPasswordForm from '../components/account/ResetPasswordForm'
import VerificationCode from '../components/account/VerificationCode'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isEmailSent, setIsEmailSent] = useState(false)
  
    const [isResettingPassword, setIsResettingPassword] = useState(false)

    const [verificationCode, setVerificationCode] = useState(0)
    const [code, setCode] = useState('')
    
  
    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      
      try{
        const res = await fetch(`http://localhost:8080/api/user/reset/${email}`, {
          method: 'POST',
        })

        const jsonRes = await res.json()
  
        if(res.status === 404) {
          setError(true)
          setErrorMessage('Email not found')
          return
        } else {
          setIsEmailSent(true)
          setVerificationCode(jsonRes)
        }
      } catch(error) {
        console.log(error)
      }
    };

    const handleVerify = () => {
        
      if(Number(code) != verificationCode) {
        setError(true)
        setErrorMessage('Code does not match')
        return
      }

      
    }

  return (
    <>
        {!isEmailSent ?
        <ResetPasswordForm 
          email={email}
          setEmail={setEmail}
          error={error}
          errorMessage={errorMessage}
          handleEmailSubmit={handleEmailSubmit}
        />
        :
        <div className='flex justify-center mt-32 mb-32'>
          <VerificationCode 
            handleVerify={handleVerify}
            code={code}
            setCode={setCode}
            error={error}
            errorMessage={errorMessage}
          />
        </div>
        }
    </>
  )
}

export default ResetPasswordPage