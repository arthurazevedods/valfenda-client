import './Card.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Card = (props) => {
    return (

        <div className="card bg-info">
            <div className="bottom-section  ">
                <span className="title">{props.nome}</span>
                <div className="row row1">
                    <div className="item">
                        <div className='bg-secondary px-4 py-2 m-1 rounded position-relative border-0'>
                            <span className="big-text text-white">30</span>
                            <span className="regular-text text-white">Livros</span>

                        </div>
                    </div>
                    <div className="item">
                        <div className='bg-secondary px-4 py-2 m-1 rounded position-relative border-0'>
                            <span className="big-text text-white">15</span>
                            <span className="regular-text text-white">Autores</span>
                        </div>

                    </div>
                    <div className="item">
                        <Link to='/shelf' className="btn btn-primary px-4 py-2 m-1 rounded position-relative border-0">
                            <span>
                                Veja mais
                            </span>
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
