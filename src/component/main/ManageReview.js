import { useState, useEffect } from 'react'
import { getCookieToken } from "../../store/common/Cookie";
import style from './ManageReview.module.css'
import starRatingUp from '../../assets/images/star_rating_up.png'
import starRatingDown from '../../assets/images/star_rating_down.png'
import ReviewContainer from './ReviewContainer'
import Header from '../header/Header'
import SideBar from '../sidebar/SideBar'

const ManageReview = () => {
    const [reviewItems, setReviewItems] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [starInfo, setStarInfo] = useState(null);

    const [starTotal, setStarTotal] = useState(null);
    const [starAverage, setStarAverage] = useState(null);
    const [starPoints, setStarPoints] = useState([
        {
            starPoint: "별 5개",
            starCount: 0,
            starRatio: 0
        },
        {
            starPoint: "별 4개",
            starCount: 0,
            starRatio: 0
        },
        {
            starPoint: "별 3개",
            starCount: 0,
            starRatio: 0
        },
        {
            starPoint: "별 2개",
            starCount: 0,
            starRatio: 0
        },
        {
            starPoint: "별 1개",
            starCount: 0,
            starRatio: 0
        }
    ]);

    const token = getCookieToken();


    async function getReviews() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': token,
            },
        };
        try {
            const response = await fetch("https://www.insung.shop/jat/review", requestOptions);
            const data = await response.json();

            if (!data.isSuccess) {
                console.log(data.message);
                return;
            }

            return data.result.reviewItems;
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

    async function getStarInfo() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-TOKEN': token,
            },
        };
        try {
            const response = await fetch("https://www.insung.shop/jat/review/average", requestOptions);
            const data = await response.json();

            if (!data.isSuccess) {
                console.log(data.message);
                return;
            }

            return data.result;
        } catch (error) {
            console.log('서버가 아직 안켜져있습니다.')
            console.log(error)
        }
    }

    useEffect(() => {
        getReviews()
            .then(reviewItems => {
                console.log(reviewItems)
                setReviewItems(reviewItems);
            })
        getStarInfo()
            .then(result => {
                console.log(result);
                setStarInfo(result);
            })
    }, []);

    useEffect(() => {
        if (reviewItems) {
            setReviews(reviewItems.map((item) => ({
                user: item.customerName,
                score: item.star,
                buy: item.orderTodayMenu.map((menu) => ({
                  type: menu.meun_name,
                  num: menu.menuCount.toString()
                })),
                review: item.contents,
                imgUrl: item.review_url,
                comment: item.comment,
              })));
            console.log(reviews);
        }
    }, [reviewItems]);

    useEffect(() => {
        if (starInfo) {
            setStarTotal(starInfo.reviews_total);
            setStarAverage(starInfo.star_average);
            setStarPoints(starInfo.starPoints);
        }
    }, [starInfo]);
    
    return (
        <div>
            <Header />
            <SideBar />
            <div className={style.mainContainer}>
                <div className={style.reviewScope}>
                    <div className={style.reviewStar}>
                        <div className={style.numRating}>{starAverage}</div>
                        <div className={style.starRating}>
                            <div className={style.starRatingDown}>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                                <img src={starRatingDown}></img>
                            </div>
                            <div className={style.starRatingUp} style={{ width: `${starAverage * 20}%` }}>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                                <img src={starRatingUp}></img>
                            </div>
                        </div>
                        <div>
                            총 {starTotal}명이 리뷰를 달았습니다.
                        </div>
                    </div>
                    <hr className={style.reviewStarHr} />
                    <div className={style.reviewBar}>
                        <div className={style.barRating}>
                            <div className={style.barRatingStar}>별 5개</div>
                            <div className={style.barRatingContainer}>
                                <div className={style.barRatingDown}></div>
                                <div className={style.barRatingUp} style={{ width: `${starPoints[0].starRatio}%` }}></div>
                            </div>
                            <div className={style.barRatingPercent}>{starPoints[0].starRatio}%</div>
                        </div>
                        <div className={style.barRating}>
                            <div className={style.barRatingStar}>별 4개</div>
                            <div className={style.barRatingContainer}>
                                <div className={style.barRatingDown}></div>
                                <div className={style.barRatingUp} style={{ width: `${starPoints[1].starRatio}%` }}></div>
                            </div>
                            <div className={style.barRatingPercent}>{starPoints[1].starRatio}%</div>
                        </div>
                        <div className={style.barRating}>
                            <div className={style.barRatingStar}>별 3개</div>
                            <div className={style.barRatingContainer}>
                                <div className={style.barRatingDown}></div>
                                <div className={style.barRatingUp} style={{ width: `${starPoints[2].starRatio}%` }}></div>
                            </div>
                            <div className={style.barRatingPercent}>{starPoints[2].starRatio}%</div>
                        </div>
                        <div className={style.barRating}>
                            <div className={style.barRatingStar}>별 2개</div>
                            <div className={style.barRatingContainer}>
                                <div className={style.barRatingDown}></div>
                                <div className={style.barRatingUp} style={{ width: `${starPoints[3].starRatio}%` }}></div>
                            </div>
                            <div className={style.barRatingPercent}>{starPoints[3].starRatio}%</div>
                        </div>
                        <div className={style.barRating}>
                            <div className={style.barRatingStar}>별 1개</div>
                            <div className={style.barRatingContainer}>
                                <div className={style.barRatingDown}></div>
                                <div className={style.barRatingUp} style={{ width: `${starPoints[4].starRatio}%` }}></div>
                            </div>
                            <div className={style.barRatingPercent}>{starPoints[4].starRatio}%</div>
                        </div>
                    </div>
                </div>
                <hr className={style.reviewScopeHr} />
                <ReviewContainer reviews={reviews} />
            </div>
        </div>

    )
}

export default ManageReview;