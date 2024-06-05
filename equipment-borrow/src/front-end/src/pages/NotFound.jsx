import { Link } from 'react-router-dom';

/**
 * Renders the NotFound page component.
 */
function NotFound() {
  return (
    <>
      <main className="container-fluid">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">404</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Her var det visst ikke noe å finne...
            </p>
            <Link to="/">Rykk tilbake til start</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;
