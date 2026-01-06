import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {

  return (
    <>
      <h1>Welcome to the app </h1>

      {/* <SignedOut>
        <SignInButton mode='modal'>Get Started</SignInButton>
      </SignedOut> */}

      <SignedOut>
        <SignInButton mode='modal'>
          <button className='bg-red-200'>
            Get Ready
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App
