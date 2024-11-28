import React from "react";
import Link from "next/link";
import "../app/globals.css";


const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">Niñeros de Mascotas</h1>
        <ul className="nav-list">
          <li>
            <Link href="#ser-cuidador">
              <button className="btn-orange">Ser Cuidador</button>
            </Link>
          </li>
          <li>
            <Link href="#inicia-sesion">
              <button className="btn-light">Inicia Sesión</button>
            </Link>
          </li>
          <li>
            <Link href="#registrate">
              <button className="btn-light">Regístrate</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
