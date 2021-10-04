import styled from "styled-components"

const About = () => {
    return (
        <main className='About'>
            <h1>About</h1>
            <p style={{marginTop: '1rem'}}>
                This blog app is a project in the Learn react Tutorial series
            </p>
            <UsrImg src='https://source.unsplash.com/random' />
        </main>
    )
}

export default About

const UsrImg = styled.img`
    
    width: 40%;
    border-radius: 25% 50% 23%;
    position:absolute;
    transform: translateX(50%)
`