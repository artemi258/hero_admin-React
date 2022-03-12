import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, filterHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filterHeroes = useSelector(filterHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <CSSTransition key={'error'} timeout={1000} classNames="fade">
                    <h5 className="text-center mt-5">Ошибка загрузки</h5>
                </CSSTransition>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition key={'empty'} timeout={1000} classNames="fade">
                        <h5 className="text-center mt-5">Героев пока нет</h5>
                    </CSSTransition>
        }
        const content = arr.map(({id, ...props}) =>  {
                          return <CSSTransition key={id} timeout={1000} classNames="fade">
                                    <HeroesListItem key={id} id={id} {...props}/>
                                 </CSSTransition>
                        });
                    
                            return content
    }
    const elements = renderHeroesList(filterHeroes);
            return (
                <TransitionGroup component={'ul'}>
                    {elements}
                </TransitionGroup>                      
            )
}

export default HeroesList;