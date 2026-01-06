import React, { useState } from 'react'
import RegisterForm from '../components/account/RegisterForm'
import { useNavigate } from 'react-router-dom';
import VerificationCode from '../components/account/VerificationCode';

const RegisterUserPage = () => {

    const [registrationInfo, setRegistrationInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    })

    const [match, setMatch] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [verificationCode, setVerificationCode] = useState(0)
    const [isEmailSent, setIsEmailSent] = useState(false)

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [code, setCode] = useState('')
  
    const navigate = new useNavigate()

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const sendVerificationEmail = async (e) => {

      e.preventDefault()


      try {
        const res = await fetch(`${API_BASE_URL}/api/user/email/${registrationInfo.email}`, {
          method: 'GET'
        })

        if(res.status !== 404) {
          setError(true)
          setErrorMessage('User already exists')
          return
        }

      } catch(error) {
        console.log(error)
      }

      if(registrationInfo.password !== registrationInfo.confirmPassword) {
        setMatch(false)
        return;
      } else {
        setMatch(true)
      }
        
    
      const ranCode = Math.floor(100000 + Math.random() * 900000);
    
      setVerificationCode(ranCode)
    
      const generateEmail = {
        email: registrationInfo.email,
        subject: 'Verification code',
        body: 'Here is ur 6 digit code: ' + ranCode
      }
    
      setIsLoading(true)
    
      try {
        const res = await fetch('http://localhost:8080/api/user/send-email', {
          method: 'POST',
          body: JSON.stringify(generateEmail),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    
        if(res.status == 200) {
          setIsEmailSent(true)
          return
        } else {
          setErrorMessage("Error registering, please try again.")
          setError(true)
        }
        } catch(error) {
          setErrorMessage("Internal Server error")
          setError(true)
        } finally {
          setIsLoading(false)
          setError(false)
          setErrorMessage('')
        }
    }


    const handleVerify = async (e) => {
        e.preventDefault()
    
    
        if(code.length !== 6) {
          setError(true)
          setErrorMessage('Verification code must be 6 digits')
          return
        }
    
        if(Number(code) !== verificationCode) {
          setError(true)
          setErrorMessage('Code must match')
          return
        }
    
        setIsLoading(true)
    
        const user = {
          firstName: registrationInfo.firstName,
          lastName: registrationInfo.lastName,
          email: registrationInfo.email,
          password: registrationInfo.password,
          address: registrationInfo.address,
          state: registrationInfo.state,
          city: registrationInfo.city,
          zipCode: registrationInfo.zipCode
        }
    
        try {
          const res = await fetch(`http://localhost:8080/api/auth/register`,{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
          })
    
          const jsonRes = await res.json()
    
          if(res.status != 201) {
            setErrorMessage(!jsonRes.message ? 'Error has occured please register later' : jsonRes.message)
            setIsVisible(true)
            return
          }
    
          navigate('/account/login')
        } catch(error) {
          console.log(error)
          setErrorMessage('Error has occured please register later')
          setIsVisible(true)
          return
        } finally {
          setIsLoading(false)
          setError(false)
          setErrorMessage('')
        }
    }

  return (
    <section className="flex justify-center items-center min-h-screen">
        {!isEmailSent ?
            <RegisterForm registrationInfo={registrationInfo} 
              setRegistrationInfo={setRegistrationInfo} 
              sendVerificationEmail={sendVerificationEmail}
              match={match}
              isLoading={isLoading}
              error={error}
              errorMessage={errorMessage}
            />
            :
            <div className='ml-auto mr-auto'>
              <VerificationCode 
                handleVerify={handleVerify} 
                code={code} 
                setCode={setCode} 
                error={error} 
                errorMessage={errorMessage} 
              />
            </div>
        }
    </section>
  )
}

export default RegisterUserPage;