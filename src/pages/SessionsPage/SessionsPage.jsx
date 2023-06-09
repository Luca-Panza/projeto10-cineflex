import styled from "styled-components";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function SessionsPage() {

    const [items, setItems] = useState([]);
    const { idMovie } = useParams();

	useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`;

        const promise = axios.get(url);

		promise.then(answer => {setItems(answer.data);})
        promise.catch(error => console.log(error));
        
	}, []);


	if(items.length === 0) {
		return (
            <PageContainer>    
                <LoadingContainer>
                    <img src="/src/assets/loading.gif" alt="Loading"/>
                </LoadingContainer>
            </PageContainer>
        );
	} 

    return (
        <PageContainer>
            Selecione o horário

            {items.days.map((day, i) =>
            <div data-test="movie-day" key={day.id}>
                <SessionContainer>
                    {day.weekday} - {day.date}
                    <ButtonsContainer>
                    {day.showtimes.map((showtime, i) => (
                        <Link data-test="showtime" to={`/seats/${showtime.id}`} key={showtime.id}>
                            <button>{showtime.name}</button>
                        </Link>
                    ))}
                    </ButtonsContainer>
                </SessionContainer>
            </div>
            )}

            <FooterContainer data-test="footer">
                <div>
                    <img src={items.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{items.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 15px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
    a:not(.button-link) {
        cursor: default;
    }
`
const LoadingContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`