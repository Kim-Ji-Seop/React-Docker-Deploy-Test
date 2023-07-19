import style from './ReviewItem.module.css'
import starRatingUp from '../../assets/images/star_rating_up.png'
import starRatingDown from '../../assets/images/star_rating_down.png'
import { useEffect, useState } from 'react'

const ReviewItem = (props) => {
    const [hasReply, setHasReply] = useState(false)
    const [isBtnVisible, setIsBtnVisible] = useState(true)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [reply, setReply] = useState('')

    const addReplyBtnHandler = () => {
        setIsBtnVisible(false)
        setIsFormVisible(true)
        setHasReply(false)
    }

    const submintBtnHandler = (event) => {
        event.preventDefault();
        if (reply != '') {
            setHasReply(true)
            setIsFormVisible(false)
        }
    }

    const replyInputHandler = (event) => {
        setReply(event.target.value)
    }

    const deleteReplyBtnHandler = () => {
        setIsBtnVisible(true)
        setIsFormVisible(false)
        setHasReply(false)
        setReply('')
    }

    useEffect(() => {
        if(props.comment) {
            setHasReply(true);
            setIsBtnVisible(false);
            setReply(props.comment);
        }
    }, []);

    return (
        <div className={style.reviewItem}>
            <div className={style.review}>
                <div className={style.reviewWrite}>
                    <div className={style.reviewUser}>{props.user.slice(0, -1) + "*"}</div>
                    <div className={style.ratingNBuy}>
                        <div className={style.starRating}>
                            <div className={style.starRatingDown}>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                            </div>
                            <div className={style.starRatingUp} style={{ width: `${props.score * 20}%` }}>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                            </div>
                        </div>
                        <div>{props.buy.map(item => {
                            return `${item.type} ${item.num}개`;
                        }).join(', ')} 구매</div>
                    </div>
                    <div className={style.userReview}>{props.review}</div>
                </div>
                <div className={style.reviewEtc}>
                    {props.imgUrl && <img src={props.imgUrl} />}
                    <div className={style.reportBtn}>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="report_problem_black_24dp 1" clip-path="url(#clip0_359_8042)">
                                <path id="Vector" d="M0.958374 20.1248H22.0417L11.5 1.9165L0.958374 20.1248ZM12.4584 17.2498H10.5417V15.3332H12.4584V17.2498ZM12.4584 13.4165H10.5417V9.58317H12.4584V13.4165Z" fill="#929292" fill-opacity="0.5" />
                            </g>
                            <defs>
                                <clipPath id="clip0_359_8042">
                                    <rect width="23" height="23" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div>신고하기</div>
                    </div>
                </div>
            </div>
            <hr className={style.reviewItemHr} />
            <div className={style.commentContainer}>
                {isBtnVisible && <button onClick={addReplyBtnHandler} className={style.replyBtn}>답글달기</button>}
                {isFormVisible && <form className={style.replyForm}>
                    <input type='text' className={style.replyInput} onChange={replyInputHandler} value={reply}></input>
                    <button onClick={submintBtnHandler} className={style.submintBtn}>확인</button>
                </form>}
                {hasReply && <div className={style.reply}>
                    <div className={style.replyText}>{reply}</div>
                    <div className={style.replyModifyBtn}>
                        <button onClick={addReplyBtnHandler}>수정</button>
                        <button onClick={deleteReplyBtnHandler}>삭제</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ReviewItem;