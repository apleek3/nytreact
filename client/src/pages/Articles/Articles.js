import React, { Component } from "react";
import API from "../../utils/API";
import { Article } from '../../components/Article'
import Jumbotron from "../../components/Jumbotron";
import { H1, H3, H4 } from '../../components/Headings';
import { Container, Row, Col } from "../../components/Grid";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";
import API_KEY from '../../credentials' // dotenv and I are on a break...


export default class Articles extends Component {
  state = {
    topic: '',//search term
    sYear: '',//start year 
    eYear: '',//end year
    page: '0',//search results
    results: [],//array of results returned from api
    previousSearch: {},//previous search term
    noResults: false,//boolean used as flag for conditional rendering
  };


  
  saveArticle = (article) => {//this function saves the article
    let newArticle = { 
      date: article.pub_date,
      title: article.headline.main,
      url: article.web_url,
      summary: article.snippet
    }

    //API CALL 
    API
      .saveArticle(newArticle)
      .then(results => {
        //removing the saved article from the results in state
        let unsavedArticles = this.state.results.filter(article => article.headline.main !== newArticle.title)
        this.setState({results: unsavedArticles})
      })
      .catch(err => console.log(err));
  }

  // Captures input and changes
  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({[name] : value})
  };

  // Starts the searches based on the query params
  handleFormSubmit = event => {
    event.preventDefault();
    let { topic, sYear, eYear } = this.state;
    let query = { topic, sYear, eYear }
    this.getArticles(query)
  };

  //function that connectus us to the NYT API
  getArticles = query => {
    if (query.topic !== this.state.previousSearch.topic ||
        query.eYear !==this.state.previousSearch.eYear ||
        query.sYear !==this.state.previousSearch.sYear) {
      this.setState({results: []})//clears the results array if the user changes search terms
    }
    let { topic, sYear, eYear } = query

    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${this.state.page}`
    let key = `&api-key=` + API_KEY;

    //removing spaces and connects the search params
    if(topic.indexOf(' ')>=0){
      topic = topic.replace(/\s/g, '+');
    }
    if (topic){
      queryUrl+= `&fq=${topic}`
    }
    if(sYear){
      queryUrl+= `&begin_date=${sYear}`
    }
    if(eYear){
      queryUrl+= `&end_date=${eYear}`
    }
    queryUrl+=key;

    //calling the API
    API
      .queryNYT(queryUrl)
      .then(results => {
          // Concatenates results to the current state of results.  
          // If empty will just show results, but if search was done to get more, it shows all results.  
          // Also stores current search terms according to conditionals above, and alternates noResults for conditional rendering of components
          this.setState({
            results: [...this.state.results, ...results.data.response.docs],
            previousSearch: query,
            topic: '',
            sYear: '',
            eYear: ''
          }, function (){
            this.state.results.length === 0 ? this.setState({noResults: true}) : this.setState({noResults: false})
          });
      })
      .catch(err=> console.log(err))
  }

  // Adds more articles to the page!
  getMoreResults = () => {
    let { topic, eYear, sYear} = this.state.previousSearch;
    let query = { topic, eYear, sYear }
    let page = this.state.page; //increments page number for search and then runs query
    page++
    this.setState({page: page}, function (){
      this.getArticles(query)
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <H1 className='page-header text-center'>New York Times Article Searcher</H1>
              <H4 className='text-center'>Search for and save articles of interest</H4>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <H3>Search</H3>
              </PanelHeading>
              <PanelBody>
                <Form style={{marginBottom: '30px'}}>
                  <FormGroup>
                    <Label htmlFor="topic">Enter a topic to search for:</Label>
                    <Input
                      onChange={this.handleInputChange}
                      name='topic'
                      value={this.state.topic}
                      placeholder='Topic'
                    />
                  </FormGroup>
                  <FormGroup >
                    <Label htmlFor="sYear">Enter a beginning date to search htmlFor (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='date'
                      name='sYear'
                      value={this.state.sYear}
                      placeholder='Start Year'
                    />
                  </FormGroup>
                  <FormGroup >
                    <Label htmlFor="eYear">Enter an end date to search for (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='date'
                      name='eYear'
                      value={this.state.eYear}
                      placeholder='End Year'
                    />
                  </FormGroup>
                  <FormBtn
                    disabled={!(this.state.topic)}
                    onClick={this.handleFormSubmit}
                    type='info'
                    >Submit
                  </FormBtn>
                </Form>
              </PanelBody>
            </Panel>
            { this.state.noResults ?
              (<H1>No results Found.  Please try again</H1>) :
              this.state.results.length>0 ? (
                <Panel>
                  <PanelHeading>
                    <H3>Results</H3>
                  </PanelHeading>
                  <PanelBody>
                    {
                      this.state.results.map((article, i) => (
                          <Article
                            key={i}
                            title={article.headline.main}
                            url={article.web_url}
                            summary={article.snippet}
                            date={article.pub_date}
                            type='Save'
                            onClick={() => this.saveArticle(article)}
                          />
                        )
                      )
                    }
                      <FormBtn type='warning' additional='btn-block' onClick={this.getMoreResults}>Get more results</FormBtn>
                  </PanelBody>
                </Panel>
              ) : ''
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
