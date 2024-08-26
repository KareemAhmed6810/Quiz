import { useEffect } from 'react';

export default function Timer({ dispatch, secondsRemaining }) {
  let min = Math.floor(secondsRemaining / 60);
  let sec = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className='timer'>
      {min < 10 && '0'}
      {min}: {sec < 10 && '0'}
      {sec}
    </div>
  );
}
