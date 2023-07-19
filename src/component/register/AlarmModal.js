import styled from "styled-components";

const Alarm = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  width: 300px;
  height: 200px;
  top: 72px;
  right: ${({ isActive }) => (isActive ? 0 : -300)}px;
  background: #F2F4F8;
  z-index: 100;
  transition: right 0.5s;
`

const AlarmBar = styled.div`
  width: ${({ isActive }) => (isActive ? 0 : 300)}px;
  height: 10px;
  background: #604EF8;
  transition: ${({ isActive }) => isActive ? 'width 4.5s linear' : 'none'};
`

const AlarmTitle = styled.div`
  width: 100%;
  height: 50px;
  font-family: Pretendard-Regular;
  font-size: 20px;
  font-weight: 700;
  line-height: 50px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
`


const AlarmText = styled.div`
  width: 100%;
  height: 100%;
  font-family: Pretendard-Regular;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
`

export default function AlarmModal({showAlarm, showAlarmBar, title, text}) {
    return (
        <Alarm isActive={showAlarm}>
            <AlarmTitle>
                {title}
            </AlarmTitle>
            <AlarmText>
                {text}
            </AlarmText>
            <AlarmBar isActive={showAlarmBar}/>
        </Alarm>
    )
}