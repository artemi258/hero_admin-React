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
    const [option, setOption] = useState([]);
    const {heroes, filter} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        request('http://localhost:3001/filters')
                .then(onOptionLoaded)
                .catch(() => dispatch(heroesFetchingError()))
    }

    const onOptionLoaded = (option) => {
        setOption(option); 
    }

    const onFilter = (filter) => {
        switch (filter) {
                case 'огонь':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'вода':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'ветер':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                case 'земля':
                    dispatch(heroesFetched(heroes, filter));
                    break;
                default:
                    dispatch(heroesFetched(heroes, filter));
        }
    }

    let elementClassName;

    const content = () => {
        return option.map((item, i) => {

            
            switch (item) {
                case 'все':
                    elementClassName = 'btn btn-outline-dark';
                    break;
                case 'огонь':
                    elementClassName = 'btn btn-danger';
                    break;
                case 'вода':
                    elementClassName = 'btn btn-primary';
                    break;
                case 'ветер':
                    elementClassName = 'btn btn-success';
                    break;
                case 'земля':
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