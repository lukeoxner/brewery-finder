import React, { useEffect, useState } from 'react';
import { Grid, Container, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Details from '../components/Details';
import API from '../utils/BreweryAPI';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	background: {
		backgroundColor: '#606060',
		minHeight: '100vh',
	},
}));

function Search() {
	const classes = useStyles();

	// create state - useState
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);

	// make a call to API to get some data - useEffect
	useEffect(() => {
		console.log('useEffect called');
		console.log(searchTerm);
		fetch(
			`https://api.openbrewerydb.org/breweries/search?query=${searchTerm}&per_page=25`
		)
			.then((res) => res.json())
			.then(function (data) {
				setResults(data);
				console.log(data);
			});
	}, [searchTerm]);

	const onChange = (e) => {
		console.log(`e.target.value: ${e.target.value}`);
		let searchInput = e.target.value;
		let formattedSearchInput = searchInput.replace(' ', '_');
		setSearchTerm(formattedSearchInput);
	};

	if (!results) {
		return (
			<>
				<div className={classes.background}>
					<h1>Search Page</h1>
					<Container>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<Grid item sm={11} lg={8}>
								<div className={classes.root}>
									<TextField
										id='search'
										style={{ margin: 8 }}
										placeholder='Search'
										fullWidth
										margin='normal'
										InputLabelProps={{
											shrink: true,
										}}
										onChange={onChange}
									/>
								</div>
							</Grid>
						</Grid>
					</Container>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className={classes.background}>
					<h1>Search Page</h1>
					<Container>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<Grid item sm={11} lg={8}>
								<div className={classes.root}>
									<TextField
										id='search'
										style={{ margin: 8 }}
										placeholder='Search'
										fullWidth
										margin='normal'
										InputLabelProps={{
											shrink: true,
										}}
										onChange={onChange}
									/>
								</div>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							{results
								? results.map((result) => (
										<Grid item key={result.id}>
											<Details
												id={result.id}
												key={result.id}
												name={result.name}
												street={result.street}
												city={result.city}
												state={result.state}
												website={result.website_url}
												type={result.brewery_type}
											/>
										</Grid>
								  ))
								: console.log('yo')}
						</Grid>
					</Container>
				</div>
			</>
		);
	}
}

export default Search;
