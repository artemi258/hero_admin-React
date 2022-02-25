import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from 'react-redux';


import { heroesFetched, heroesFetchingError } from '../../actions';
import '../app/app.scss';

const HeroesListItem = ({id, name, description, element}) => {

    const {request} = useHttp();
    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();

    let elementClassName;

    switch (element) {
        case 'огонь':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'вода':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'ветер':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'земля':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const onDeleteHeroes = () => {
            request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => heroes.filter(item => item.id !== id))
        .then((res) => dispatch(heroesFetched(res)))
        .catch(() => dispatch(heroesFetchingError()));
    }

    return (
                <li 
                className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
                <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                    className="img-fluid w-25 d-inline" 
                    alt="unknown hero" 
                    style={{'objectFit': 'cover'}}/>
                <div className="card-body">
                    
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <span onClick={() => {onDeleteHeroes();}} className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                    <button type="button" className="btn-close btn-close" aria-label="Close"></button>
                </span>
            </li>
    )
}

export default HeroesListItem;