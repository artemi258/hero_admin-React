import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { heroesFetched, heroesFetchingError } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {request} = useHttp();
    const [filters, setFilters] = useState([]);
    const {heroes, filter} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        request('http://localhost:3001/filters')
                .then(onFiltersLoaded)
                .catch(() => dispatch(heroesFetchingError()))
    }

    const onFiltersLoaded = (option) => {
        setFilters(option); 
    }

    const onFilter = (filter) => {
        switch (filter) {
                case 'Огонь':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'Вода':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'Ветер':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'Земля':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                default:
                    dispatch(heroesFetched(heroes, filter));
        }
    }

    let elementClassName;

    const content = () => {
        return filters.map((item, i) => {
            
            switch (item) {
                case 'Все':
                    elementClassName = 'btn btn-outline-dark';
                    break;
                case 'Огонь':
                    elementClassName = 'btn btn-danger';
                    break;
                case 'Вода':
                    elementClassName = 'btn btn-primary';
                    break;
                case 'Ветер':
                    elementClassName = 'btn btn-success';
                    break;
                case 'Земля':
                    elementClassName = 'btn btn-secondary';
                    break;
                default:
                    elementClassName = 'bg-warning bg-gradient';
             }

            return <button key={i} onClick={() => onFilter(item)} className={` ${elementClassName} ${item === filter ? 'active' : ''}`}>{item}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {content()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;