import './Card.css'
import PropTypes from 'prop-types';
const Card = (props) => {
    return (

        <div className="card">
            <div className="top-section">
                <div className="border" />
                <div className="icons">


                </div>
            </div>
            <div className="bottom-section">
                <span className="title">{props.nome}</span>
                <div className="row row1">
                    <div className="item">
                        <span className="big-text">30</span>
                        <span className="regular-text">Nro de Livros</span>
                    </div>
                    <div className="item">
                        <span className="big-text">15</span>
                        <span className="regular-text">Nro de Autores</span>
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
