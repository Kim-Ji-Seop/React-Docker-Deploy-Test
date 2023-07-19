import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button type='submit' className={classes['custom-btn']}>
            오늘의 떨이 등록하기
        </button>
    )
}

export default Button;