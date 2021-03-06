import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {  createdHero, heroesFetchingError } from '../heroesList/heroesSlice';
import { v4 as uuidv4 } from 'uuid';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [data, setData] = useState({name: '', description: '', element: ''});
    const [option, setOption] = useState([]);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onChangeName = (e) => {
        setData({...data, name: e.target.value});
    }
    const onChangeDescription = (e) => {
        setData({...data, description: e.target.value});
    }
    const onChangeElement = (e) => {
        setData({...data, element: e.target.value});
    }

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        request('http://localhost:3001/filters')
                .then(res => res.splice(1))
                .then(onOptionLoaded)
                .catch(() => dispatch(heroesFetchingError()))
    }

    const onOptionLoaded = (option) => {
        setOption(option); 
    }

    const content = () => {
       return option.map(item => {
            return <option key={item.id} value={item.filter}>{item.filter}</option>
        })
    }

    const form = <form className="border p-4 shadow-lg rounded" onSubmit={(e) => bindPostData(e)}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input 
            required
            type="text" 
            name="name" 
            className="form-control" 
            id="name"
            value={data.name}
            onChange={ onChangeName }
            placeholder="Как меня зовут?"/>
    </div>

    <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
            required
            name="text" 
            className="form-control" 
            id="text"
            value={data.description}
            onChange={onChangeDescription}
            placeholder="Что я умею?"
            style={{"height": '130px'}}/>
    </div>

    <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select 
            required
            className="form-select" 
            id="element"
            value={data.element}
            onChange={onChangeElement}
            name="element">
            <option>Я владею элементом...</option>
            {content()}
        </select>
    </div>

    <button type="submit" className="btn btn-primary">Создать</button>
</form>;

    const clearForm = () => {
        setData({
            name: '',
            description: '',
            element: ''
        })
    }
    
    const bindPostData = (e) => {
        e.preventDefault();
        const finalData = Object.assign({id: uuidv4()}, data)
            const postData = JSON.stringify(finalData)
            request('http://localhost:3001/heroes', 'POST', postData)
            .then(data => dispatch(createdHero(data)))
            .catch(() => dispatch(heroesFetchingError()))
            .finally(() => clearForm())
    }
    return (
        <>
            {form}
        </>
        
    )
}

export default HeroesAddForm;