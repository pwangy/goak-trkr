const Header = ({ darkMode, onDarkModeClick }) => {
    return (
        <header>
            <h1>Goal TRKR</h1>
            <button onClick={onDarkModeClick}>
                    {darkMode ? 'Light' : 'Dark'} Mode</button>
        </header>
    )
}

export default Header