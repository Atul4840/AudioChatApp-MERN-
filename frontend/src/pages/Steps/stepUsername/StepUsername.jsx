import React from 'react'

function StepUsername({onNext}) {
  return (
    <>
      <div> this is Step Username component</div>
      <button onClick={onNext}>next</button>
    </>
  )
}

export default StepUsername