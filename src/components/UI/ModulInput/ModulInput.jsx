import React from 'react'
import styles from './ModulInput.module.css'


const ModulInput = ({setAllert, input, setInput}) => {
    const close = () => {
        setAllert(false)
    }
    
    return (
        <div className={styles.back_box}>
            <div className={styles.box}>
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} className ="name" placeholder="введите имя" /> 
                <button onClick={close}>сохранить</button>
            </div>
        </div>
    );
};
export default ModulInput