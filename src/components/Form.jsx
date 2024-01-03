import { useState } from "react";


const Form = ({ setValueEmoji }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleSearch = e => {
        e.preventDefault();
        if(value === ''){
            setError(true);
            setTimeout(()=>setError(false), 2000);
            return;
        }
        setValueEmoji(value);
        console.log(value);
    }
    const allEmojis = () => {
        setValueEmoji('');
    }

    return (
        <section>
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text" 
                    placeholder="Buscar por raza..." 
                    onChange={e => setValue(e.target.value)}    
                />
                <button className="btn btn-primary btn-sm" type="button" onClick={handleSearch}>Buscar</button>
            </form>
            <br/>
            
            { error && <p className="error">El input está vacío</p> }
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={allEmojis}>Ver todos</button>
        </section>
    );
}
 
export default Form;