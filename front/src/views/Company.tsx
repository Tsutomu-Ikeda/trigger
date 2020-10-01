import React, { useEffect, useRef, useState, FormEvent } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';

import AuthRequired from "components/AuthRequired";
import { useQuery, useHistory } from "libs/Url";
import { searchCompany, searchMoreCompany } from "libs/ServerClient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export default function Company() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState({ numCompanies: null, companies: [] } as { numCompanies: number | null, companies: { name: string; id: string }[] })
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  const onSearchButtonClicked = async (e: FormEvent) => {
    e.preventDefault();
    history.pushState({}, "", `?q=${searchQuery}`);
    setSearchResult(await searchCompany(searchQuery));
  };

  const onSearchMoreClick = () => {
    setSearchResult({
      ...searchResult,
      companies: [...searchResult.companies, ...searchMoreCompany(searchQuery, searchResult.companies.length)]
    });
  }

  const isFirstRender = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
  }, [])

  useEffect(() => {
    (async () => {
      if (isFirstRender.current) {
        const queryFromUrl = query.get("q");
        if (queryFromUrl) {
          setSearchQuery(queryFromUrl);
          setSearchResult(await searchCompany(queryFromUrl));
        }
        isFirstRender.current = false
      }
    })();
  }, [query, searchQuery]);

  return (
    <AuthRequired>
      <>
        企業検索ページ
        <Paper component="form" className={classes.root} onSubmit={onSearchButtonClicked}>
          <InputBase
            onChange={event => {
              setSearchQuery(event.target.value)
            }}
            value={searchQuery}
            className={classes.input}
            placeholder="企業名で検索する"
            inputProps={{ 'aria-label': 'search companies' }}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={onSearchButtonClicked}>
            <SearchIcon />
          </IconButton>
        </Paper>
        {searchResult.numCompanies !== null ?
          <>
            <Divider style={{ margin: "20px 0px" }} />
        検索結果 {searchResult.numCompanies} 件

            <List component="nav" aria-label="main mailbox folders">
              {searchResult.companies.map((company, index) =>
                <ListItemLink key={index} href={`/company/${company.id}`}>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={company.name}
                  />
                </ListItemLink>)}
            </List>
            { searchResult.numCompanies > searchResult.companies.length ?
              <button
                onClick={onSearchMoreClick}
                style={{ margin: "10px 0", float: "right" }}
              >
                もっと見る
              </button>
              : null}
          </>
          : null}
      </>
    </AuthRequired>
  );
};
