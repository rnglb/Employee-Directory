import "./Header.css";
import Cookie from 'js-cookie';


const Header = (props) => {
    console.log(props.user);
    function clearStorage(){
  //    Cookie.remove("userInfo");
  localStorage.removeItem('userInfo');
    };
  return (
    <header className="bar bar-nav">
        <h2>Welcome {props.user} in Employee Directory</h2>
   <button id="outButton"  onClick={clearStorage}> <a href="http://localhost:3000/login/" >Logout</a></button>
</header>
  );
};

export default Header;