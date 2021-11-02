import React from 'react';

const Favourites = props => {
    return (
        <form onSubmit = {props.choice}>
            <input 
            type="text"
            value = {props.value}
            onChange = {props.change}
            placeholder = "Wpisz miasto"/>
            <button>Dodaj do ulubionych</button>
        </form>
    );
}
 
export default Favourites;