import { useState } from 'react'

const App = () => {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<h1>Hi! I&apos;m a Goal Tracking App</h1>

				<div className='card'>
					<button onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</button>
					<p>
						Edit <code>src/App.jsx</code> and save
					</p>
				</div>
			</div>
		</>
	)
}

export default App
