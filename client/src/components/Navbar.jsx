import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Blog For Developers</Navbar.Brand>
          <Nav className="me-auto">


            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">My Blogs</Nav.Link>
            <Nav.Link href="/post">Post</Nav.Link>

            <Nav.Link href="/login">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
