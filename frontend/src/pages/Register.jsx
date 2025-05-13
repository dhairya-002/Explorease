import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: '',
      email: '',
      password: ''
   })
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const { dispatch } = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setError('')
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()
      setError('')
      setLoading(true)

      try {
         console.log('Sending registration request to:', `${BASE_URL}/auth/register`)
         console.log('With credentials:', { ...credentials, password: '***' })
         
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
         })
         
         const result = await res.json()
         console.log('Registration response:', result)

         if (!res.ok) {
            setError(result.message || 'Registration failed')
            return
         }

         dispatch({ type: 'REGISTER_SUCCESS' })
         navigate('/login')
      } catch (err) {
         console.error('Registration error:', err)
         setError(err.message || 'Something went wrong')
      } finally {
         setLoading(false)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input 
                                 type="text" 
                                 placeholder='Username' 
                                 id='username' 
                                 value={credentials.username}
                                 required 
                                 onChange={handleChange}
                                 minLength={3} 
                              />
                           </FormGroup>
                           <FormGroup>
                              <input 
                                 type="email" 
                                 placeholder='Email' 
                                 id='email' 
                                 value={credentials.email}
                                 required 
                                 onChange={handleChange} 
                              />
                           </FormGroup>
                           <FormGroup>
                              <input 
                                 type="password" 
                                 placeholder='Password' 
                                 id='password' 
                                 value={credentials.password}
                                 required 
                                 onChange={handleChange}
                                 minLength={6} 
                              />
                           </FormGroup>
                           <Button 
                              className='btn secondary__btn auth__btn' 
                              type='submit'
                              disabled={loading}
                           >
                              {loading ? 'Creating Account...' : 'Create Account'}
                           </Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register