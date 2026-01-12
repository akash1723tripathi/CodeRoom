import { SignedIn,useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProblemsPage from './pages/ProblemsPage';
import ProblemPanel from './pages/ProblemPanel';
import SessionPage from './pages/SessionPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn } = useUser()
 
  
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage/> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={ (isSignedIn)? <Dashboard/>: <Navigate to="/"/>} />
        <Route path="/problems" element={(isSignedIn)? <ProblemsPage/> :<Navigate to="/"/> }/>
        <Route path="/problem/:id" element={(isSignedIn)? <ProblemPanel/> :<Navigate to="/"/> }/>
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />

      </Routes>

    <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
