import './Card.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Card = (props) => {
    return (

        <div className="card bg-warning">
            <div className="bottom-section  ">
                <span className="title">{props.nome}</span>
                <div className="row row1">
                    <div className="item">
                        <span className="big-text text-white">30</span>
                        <span className="regular-text text-white">Nro de Livros</span>
                    </div>
                    <div className="item">
                        <span className="big-text text-white">15</span>
                        <span className="regular-text text-white">Nro de Autores</span>
                    </div>
                    <div className="item">

                        <Link to='/shelf' className="btn button-link">
                            Estante
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

Card.propTypes = {
    nome: PropTypes.string
};


export default Card;
