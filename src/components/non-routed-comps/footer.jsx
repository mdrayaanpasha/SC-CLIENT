import "../../assets/css/footer.css";

export default function Footer(){
    return(
    <>
            <footer className="footer">
                <div className="footer__container container grid">
                    <div className="footer__content grid">
                        <a href="index.html" className="footer__logo">SolaceCraft</a>
                        <ul className="footer__links">
                            <li>
                                <a href="./sofas" className="footer__link">Sofas</a>
                            </li>
                            <li>
                                <a href="./shoeracks" className="footer__link">Shoe racks</a>
                            </li>
                            <li>
                                <a href="./login" className="footer__link">Login</a>
                            </li>
                        </ul>
                        <div className="footer__social">
                            <a href="https://www.facebook.com/profile.php?id=61556319187569" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-facebook-circle-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/solacecraft01/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-instagram-fill"></i>
                            </a>
                           
                           
                        </div>
                    </div>
                    <span className="footer__copy">
                        &#169; Solace Craft 2024. All rights reserved
                    </span>
                </div>
            </footer>
            </>
    )
}