import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  margin: auto;
  width: 65%;
  margin-top: 50px;
  padding: 25px;
`;

export const ArticleContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const ArticleContentContainer = styled.div`
  width: 65%;
  padding: 10px;
`;

export const ArticleImageContainer = styled.div`
  width: 35%;
`;

export const AuthorContainer = styled.div`
  height: 50%;
  margin: auto;
  width: auto;
  display: flex;
  justify-content: flex-start;
`;

export const AuthorImageContainer = styled.div`
  width: 8%;
  padding: 5px;
`;

export const AuthorNameContainer = styled.div`
  width: 92%;
`;

export const ImageContainer = styled.img`
  width: 100%;
  border-radius: 2px;
`;

export const Title = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #000;

  &:hover {
    text-decoration: none;
    color: #bf0016;
  }
`;

export const Text = styled.p`
  margin: 0 0 0px 0;
  font-size: 11px;
`;
