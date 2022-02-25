import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, filter, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [state, setState] = useState(false);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        const content =   arr.filter(({element}) => {
                            if (filter === 'все') {
                                return true;
                            } else {
                            return element === filter;
                            }
                        })
                        .map(({id, ...props}) =>  {
                          return <CSSTransition key={id} timeout={1000} classNames="fade">
                                <HeroesListItem state={state} setState={setState} key={id} id={id} {...props}/>
                            </CSSTransition>
                        });
                    
                            return <TransitionGroup component={null}>
                                        {content}
                                    </TransitionGroup>                      
    }
    const elements = renderHeroesList(heroes);
            return (
                <ul>
                    {elements}
                </ul>
            )
}

export default HeroesList;