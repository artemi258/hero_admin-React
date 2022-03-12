import { useEffect } from "react";
import { filtersFetching, filtersFetched, filterActiv, filtersFetchingError, fetchFilters} from './filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        dispatch(fetchFilters())
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
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

            return <button key={i} onClick={() => dispatch(filterActiv(item))} className={` ${elementClassName} ${item === activeFilter ? 'active' : ''}`}>{item}</button>
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