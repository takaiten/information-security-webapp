import styled from 'styled-components';
import { Card as ACard } from 'antd';

export const Container = styled.div`
    background-color: rgb(56, 56, 61);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styled(ACard)`
    width: 500px;
`;
