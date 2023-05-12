import { Link, NavLink } from "react-router-dom";
import './Nav.scss'

const Nav = () => {
    return (
        <div className="topnav">
            <NavLink activeclassnamenav="active" to="/" exact={true}>Home</NavLink>
            <NavLink activeclassnamenav="active" to="/tictactoe">Tic-Tac-Toe</NavLink>
            <NavLink activeclassnamenav="active" to="/quanlysinhvien">Quản lý sinh viên</NavLink>
            <NavLink activeclassnamenav="active" to="/youtube">Youtube</NavLink>
        </div>
    )
}
export default Nav