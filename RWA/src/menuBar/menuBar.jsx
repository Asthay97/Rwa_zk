import "./menuBar.css"

export default function Menubar() {
  return (



<div>
  <head>
    <title>PROMISSORY | Menubar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
      rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Ubuntu:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

    <link rel="stylesheet" href="./menuBar.css" />
  </head>
    
    <div
      className="menu-bar px-2 py-2 py-md-3 d-flex flex-column align-items-center menu-bar-desktop"
    >
      <i
        className="fa fa-bars text-white hamburger-icon fs-14"
        aria-hidden="true"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      ></i>

      <img src="/upi_logo.png" alt="..." className="mb-5 brand-logo" />

      <a
        href="#"
        id="mi-1"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-th text-white mb-0 fs-14 menu-bar-icon mbi-1"
          aria-hidden="true"
        ></i>
        my assets
      </a>

      <a
        href="#"
        id="mi-2"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-2"
          aria-hidden="true"
        ></i>
        market place
      </a>

      <a
        href="#"
        id="mi-3"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-3"
          aria-hidden="true"
        ></i>
        refer & earn
      </a>

      <a
        href="#"
        id="mi-4"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-4"
          aria-hidden="true"
        ></i>
        transactions
      </a>

      <a
        href="#"
        id="mi-5"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-5"
          aria-hidden="true"
        ></i>
        wallet
      </a>

      <a
        href="#"
        id="mi-6"
        className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-6"
          aria-hidden="true"
        ></i>
        taxes
      </a>

      <a
        href="#"
        id="mi-7"
        className="menu-item menu-item-setting text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
      >
        <i
          className="fa fa-cog pri-clr mb-0 fs-14 menu-bar-icon mbi-7"
          aria-hidden="true"
        ></i>
        settings
      </a>
    </div>
    

    <div
      className="offcanvas offcanvas-mobile offcanvas-start d-none"
      data-bs-scroll="false"
      tabindex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      
      <div className="offcanvas-body d-flex flex-column align-items-center h-100">
        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-1"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-th text-white mb-0 fs-14 menu-bar-icon mbi-1 active"
            aria-hidden="true"
          ></i>
          my assets
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-2"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-2"
            aria-hidden="true"
          ></i>
          market place
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-3"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-3"
            aria-hidden="true"
          ></i>
          refer & earn
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-4"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-4"
            aria-hidden="true"
          ></i>
          transactions
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-5"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-5"
            aria-hidden="true"
          ></i>
          wallet
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-6"
          className="menu-item text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog text-white mb-0 fs-14 menu-bar-icon mbi-6"
            aria-hidden="true"
          ></i>
          taxes
        </a>

        <a
          data-bs-dismiss="offcanvas"
          href="#"
          id="mi-7"
          className="menu-item menu-item-setting text-white text-center mb-3 d-flex flex-column align-items-center justify-content-center fs-11 text-capitalize"
        >
          <i
            className="fa fa-cog pri-clr mb-0 fs-14 menu-bar-icon mbi-7"
            aria-hidden="true"
          ></i>
          settings
        </a>
      </div>
    </div>
    
</div>
  )

}