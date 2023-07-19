import classes from './Input.module.css'

const Input = (props) => {
    return (
        <input className={classes['custom-input']} type="text" placeholder={props.placeholder} />
    )
}

export default Input;