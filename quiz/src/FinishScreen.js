export default function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  return (
    <>
      <div className='result'>
        <p>
          You scored <strong>{points}</strong> out of {maxPossiblePoints}
        </p>
        <p>
          Your percentage is: <strong>{percentage}</strong>%
        </p>
      </div>
      <button
        className='btn btn-uni'
        onClick={() => dispatch({ type: 'restart' })}
      >
        New Attempt
      </button>
    </>
  );
}
