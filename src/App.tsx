
import './App.css'

import GLBViewer from './components/GLBViewerDynamicChange';
import GLBViewerVariants from './components/GLBVieverWithVariants';

function App() {

  return (
    <>
    <h1>Demo of 3D model visuals</h1>

    <GLBViewer url="https://konst-navy.vercel.app/Abstract-Painting_Monumental-Figure.glb" />
    <GLBViewerVariants url="/variants.glb" />
    </>
  )
}

export default App
