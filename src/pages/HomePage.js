/*
This is the homepage Page which has the layout of components
on the homepage.
*/

import SearchBar from "../components/SearchBar/index";
import styled from 'styled-components';
import { Container } from "@material-ui/core";
import { useState } from "react";
import { Pagination } from '@material-ui/lab';
import TableData from "../components/Table";

const SearchBarWrapper = styled.div`
    margin-bottom: 30px;

`;

const PaginationWrapper = styled.div`
    margin-top: 10px
`;

const HomePage = () => {
    const [ noOfPages, setNoOfPages ] = useState(0);
    const [ searchString, setSearchString ] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (
        event,
        pageNo,
      ) => {
        setCurrentPage(pageNo);
      };

    return (
        <Container maxWidth="lg">
        <SearchBarWrapper>
            <SearchBar setSearchString={setSearchString} searchString={searchString} />
        </SearchBarWrapper>
        <TableData setNoOfPages={setNoOfPages} searchString={searchString} currentPage={currentPage} />
        <PaginationWrapper>
            <Pagination count={noOfPages} onChange={handlePageChange} page={currentPage} />
        </PaginationWrapper>
        </Container>
    );
}

export default HomePage;
