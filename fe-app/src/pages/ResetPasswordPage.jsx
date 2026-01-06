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

    const [isLoading, setIsLoading] = useState(false)
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleEmailSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true)
      
      try{
        const res = await fetch(`${API_BASE_URL}/api/user/reset/${email}`, {
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
          setError(false)
          setErrorMessage('')
        }
      } catch(error) {
        setError(true)
        setErrorMessage('Internal server error')
      } finally {
        setIsLoading(false)
      }
    };

    const handleVerify = () => {
      if(Number(code) != verificationCode) {
        setError(true)
        setErrorMessage('Code does not match')
        return
      } else {
        console.log('match')
        setIsResettingPassword(true)
        setIsEmailSent(false)
        setError(false)
        setErrorMessage('')
      }
    }

  return (
    <>
      {!isEmailSent ?
        <ResetPasswordForm 
          email={email}
          setEmail={setEmail}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          handleEmailSubmit={handleEmailSubmit}
          isResettingPassword={isResettingPassword}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
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