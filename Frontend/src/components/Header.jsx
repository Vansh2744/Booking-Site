import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SquareMenu } from "lucide-react";
import axios from "axios";

function Header() {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get("/api/v1/user/getProfile")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex items-center bg-slate-200 sm:py-2 sm:px-4 w-full relative">
      <img
        src="logo.jpg"
        className="w-12 h-12 m-2 sm:w-14 sm:h-14 rounded-full"
      />
      <nav className="sm:flex gap-10 float-right hidden absolute right-5">
        <Link to="/home">Home</Link>
        <Link to="/home">Menu</Link>
        <Link to="/home">Shop</Link>
        <Link to="/home">Bucket</Link>
      </nav>
      <nav className="sm:hidden mr-10 w-full p-4" onClick={handleMenu}>
        <SquareMenu className="hover:text-orange-600 cursor-pointer float-right " />
      </nav>
      {open && (
        <nav className="flex flex-col sm:hidden p-1 mr-1 z-10 absolute w-full top-14">
          <Link
            to="/home"
            className="bg-orange-400 p-1 bg-opacity-80 hover:bg-orange-500"
            onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link
            to="/menu"
            className="bg-orange-400 p-1 bg-opacity-80 hover:bg-orange-500"
            onClick={() => setOpen(false)}>
            Menu
          </Link>
          <Link
            to="/shop"
            className="bg-orange-400 p-1 bg-opacity-80 hover:bg-orange-500"
            onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link
            to="/bucket"
            className="bg-orange-400 p-1 bg-opacity-80 hover:bg-orange-500"
            onClick={() => setOpen(false)}>
            Bucket
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Header;
