/* eslint-disable react/prop-types */
const Header = ({ darkMode, onDarkModeClick }) => {
    return (
        <header>
            <h1><span className='h1-goal'>Goal</span><span className='h1-trkr'>TRKR</span></h1>
            <button onClick={onDarkModeClick}>
                    {darkMode ? 'Light' : 'Dark'} Mode</button>
        </header>
    )
}

export default Header