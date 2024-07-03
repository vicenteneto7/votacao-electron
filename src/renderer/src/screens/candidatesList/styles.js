import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;

  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3.5rem 0;
  `

export const Container2 = styled.div`
  width: 90%;
  height: 100%;

  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  border-radius: 1rem;
  padding: 0.5rem;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #efefef;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .rec.rec-arrow :hover {
    border: 2px solid #9758a6;
    background-color: #efefef;
    color: #9758a6;
  }

  .rec.rec-arrow:disabled {
    border: none;
    background-color: #bebebf;
    color: #efefef;
  }

`

export const ButtonContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
`


export const CategoryImage = styled.img``

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 1.3rem 1.3rem ;

	text-align: center;

  &:hover{
    transform: scale(1.02);
	transition: transform .3s;
	cursor: pointer;
  }
`

export const CardInner = styled.div`
  background: rgba(253, 253, 253, 0.808);
	border-radius: 10px;
	padding: 35px 20px;
	width: 100%;
	box-shadow: 5px 5px 10px 2px rgba(95, 95, 95, 0.24);
`
export const CardCandidate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
`

export const CandidateName = styled.p`
  color: #203150;
	font-weight: 600;
	font-size: 20px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export const Image = styled.img`
  width: 120px;
	height: 10rem;
	margin-bottom: 10px;
	border-radius: 50%;
	align-items: center;
	transition: transform .2s;
`

export const Party = styled.p`
  margin: 2px;
	padding: 2px 10px;
	background-color: #f0ebfa;
	border-radius: 3rem;
	font-size: 10px;
	font-weight: 600;
	color: #788697;
`


export const Button = styled.div`
  border-radius: 0.8rem;
  background: #9758a6;

  border: none;
  height: 2.3rem;
  width: 10rem;
  margin-top: 0.4rem;
  gap: 0.5rem;

  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`