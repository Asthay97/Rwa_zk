import "./navbar.css"
export default function Navbar(){

  return (
    <div>
     <div>
  <head>
    <title>PROMISSORY | Navbar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

  </head>

    <nav classNameName="navbar navbar-expand-md mx-4 my-3">
      <div classNameName="container-fluid">
        <button
          classNameName="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img src="/upi_logo.png" alt="..." />
        </a>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 w-100 justify-content-end">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#"> About Us </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Learn </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Blog </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> My Account </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

</div>

</div>
  )
}
