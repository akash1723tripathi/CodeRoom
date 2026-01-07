import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn } = useUser()
 
  
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/problems" element={(isSignedIn)? <ProblemsPage/> :<Navigate to="/"/> }/>











      {/* <SignedOut>
        <SignInButton mode='modal'>Get Started</SignInButton>
      </SignedOut> */}

      {/* <SignedOut>
        <SignInButton mode='modal'>
          <button className='bg-red-200'>
            Get Ready
          </button>
        </SignInButton>
      </SignedOut> */}

      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
